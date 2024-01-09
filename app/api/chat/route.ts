import { OpenAIStream, StreamingTextResponse } from 'ai'
import { ChatCompletionMessageParam } from 'ai/prompts'
import { NextResponse } from 'next/server'

import db from '@/lib/db'
import openai, { getEmbedding } from '@/lib/openai'

const sentHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, ApiKey',
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const apiKey = searchParams.get('apiKey')
    const body = await req.json()
    const messages: ChatCompletionMessageParam[] = body.messages

    const messagesTruncated = messages.slice(-6)

    try {
      const profile = await db.profile.findUnique({
        where: {
          key: apiKey ?? '',
        },
      })

      const embedding = await getEmbedding(
        messagesTruncated.map((message) => message.content).join('\n')
      )

      const items =
        await db.$queryRaw`SELECT id, "userId", embedding::text FROM "Listing" WHERE "userId" = ${profile?.userId} ORDER BY embedding <-> ${embedding}::vector LIMIT 5`

      const relevantListings = await db.listing.findMany({
        where: {
          id: {
            in: (items as any).id,
          },
          userId: profile?.userId ?? '',
        },
      })

      let systemMessage: any | null = null

      if (!relevantListings.length) {
        systemMessage = {
          role: 'system',
          content: `La orice intrebare trebuie sa spui ca momentan nu avem niciun anunt disponibil.`,
        }
      } else {
        systemMessage = {
          role: 'system',
          content:
            'Esti un agent imobiliar genial. Raspunzi precis si dai detalii doar din informatiile pe care le ai in anunturile disponisible.' +
            'Aici sunt toate anunturile noastre disponibile:' +
            relevantListings
              .map(
                (listing) =>
                  `Titlu: ${listing.title}\nContinut: ${listing.content}`
              )
              .join('\n') +
            'Trebuie sa respecti cu strictete aceste reguli:' +
            '- Daca intrebarea clientului nu are legatura cu anunturile disponibile, dai un mesaj standard de exemplu: "Momentan nu avem informatii despre acest subiecte."' +
            '- Atunci cand nu ai un anunt in zona unde a intrebat clientul spui un mesaj standard de exemplu: "Momenan nu avem o oferta in zona pe care o cauti"' +
            '- Nu trebuie sa inventezi anunturi. Limiteaza-te doar la informatiile din anunt.',
        }
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: 0,
        messages: [systemMessage, ...messagesTruncated],
      })

      const stream = OpenAIStream(response)

      return new StreamingTextResponse(stream, { headers: sentHeaders })
    } catch (error) {
      return Response.json(
        { error: 'Internal error.' },
        { status: 500, headers: sentHeaders }
      )
    }
  } catch (error) {
    console.log(error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500, headers: sentHeaders }
    )
  }
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get('origin')
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400',
    },
  })

  return response
}

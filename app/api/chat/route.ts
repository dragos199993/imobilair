import openai, { getEmbedding } from '@/lib/openai'
import { listingsIndex } from '@/lib/pinecone'
import db from '@/lib/db'
import { ChatCompletionMessageParam } from 'ai/prompts'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'

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

      const vectorQueryResponse = await listingsIndex.query({
        vector: embedding,
        topK: 2,
        filter: { userId: profile?.userId },
      })

      const relevantListings = await db.listing.findMany({
        where: {
          id: {
            in: vectorQueryResponse.matches.map((match) => match.id),
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
            'Esti un agent imobiliar genial. Raspunzi clientului cu ce crezi ca l-ar interesa din anunturile noastre.' +
            'Aici sunt toate anunturile noastre disponibile:' +
            relevantListings
              .map(
                (listing) =>
                  `Titlu: ${listing.title}\nContinut: ${listing.content}`
              )
              .join('\n') +
            'Iata cateva reguli care trebuie respectate:' +
            '- Evita sa spui pretul' +
            '- Trebuie sa spui ca ai un anunt doar daca il gasesti in lista de anunturi disponibile. Altfel nu.' +
            '- Nu inventa anunturi sub nicio forma. Limiteaza-te doar la lista de anunturi disponibile. ATAT.' +
            '- Spune doar anunturile noastre, nu ale altor agentii.',
        }
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: 0.3,
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
      'Access-Control-Allow-Origin': allowedOrigin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400',
    },
  })

  return response
}

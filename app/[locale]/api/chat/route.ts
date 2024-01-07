import { OpenAIStream, StreamingTextResponse } from 'ai'
import { ChatCompletionMessageParam } from 'ai/prompts'

import { auth } from '@/lib/auth'
import db from '@/lib/db'
import openai, { getEmbedding } from '@/lib/openai'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages: ChatCompletionMessageParam[] = body.messages
    const messagesTruncated = messages.slice(-6)
    const embedding = await getEmbedding(
      messagesTruncated.map((message) => message.content).join('\n')
    )

    const session = await auth()

    const items =
      await db.$queryRaw`SELECT id, "userId", embedding::text FROM "Listing" WHERE "userId" = ${session?.user?.id} ORDER BY embedding <-> ${embedding}::vector LIMIT 5`

    const relevantListings = await db.listing.findMany({
      where: {
        id: {
          in: (items as any).id,
        },
        userId: session?.user?.id ?? '',
      },
    })

    let systemMessage: any

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
      temperature: 0.3, // Lower temperature for less creativity
      messages: [systemMessage, ...messagesTruncated],
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

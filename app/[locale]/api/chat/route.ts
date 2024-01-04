import openai, { getEmbedding } from '@/lib/openai'
import { auth } from '@clerk/nextjs'
import { listingsIndex } from '@/lib/pinecone'
import db from '@/lib/db'
import { ChatCompletionMessageParam } from 'ai/prompts'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export async function POST(req: Request) {
  try {
    console.log('here')
    const body = await req.json()
    const messages: ChatCompletionMessageParam[] = body.messages

    const messagesTruncated = messages.slice(-6)
    const embedding = await getEmbedding(
      messagesTruncated.map((message) => message.content).join('\n')
    )

    const { userId } = auth()

    const vectorQueryResponse = await listingsIndex.query({
      vector: embedding,
      topK: 2,
      filter: { userId },
    })

    const relevantListings = await db.listing.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
        userId: userId ?? '',
      },
    })

    const systemMessage: any = {
      role: 'system',
      content:
        'Esti un agent imobiliar genial. Raspunzi clientului cu ce crezi ca l-ar interesa din anunturile noastre.' +
        'Iata cateva reguli care trebuie respectate:' +
        '- Evita sa spui pretul' +
        '- Nu inventa anunturi daca nu ai disponbile. Te rog sa folosesti doar anunturile disponibile. NIMIC ALTCEVA.' +
        '- Spune doar anunturile noastre, nu ale altor agentii.' +
        'Aici sunt toate anunturile noastre disponibile:' +
        relevantListings
          .map(
            (listing) => `Titlu: ${listing.title}\nContinut: ${listing.content}`
          )
          .join('\n'),
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

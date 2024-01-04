'use server'

import db from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-listing'
import { CreateListing } from '@/actions/create-listing/schema'
import { InputType, ReturnType } from './types'
import { getSelf } from '@/services/auth-services'
import { getEmbedding } from '@/lib/openai'
import { listingsIndex } from '@/lib/pinecone'

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getSelf()

  const { title, content } = data

  const embedding = await getEmbedding(
    title + '\n\n' + content + '\n\n' + 'Owner:' + user.id
  )

  try {
    const listing = await db.$transaction(async (tx) => {
      const result = await tx.listing.create({
        data: {
          title,
          content,
          userId: user.id,
        },
      })

      await listingsIndex.upsert([
        { id: result.id, values: embedding, metadata: { userId: user.id } },
      ])

      return result
    })

    return { data: listing }
  } catch (error) {
    return { error: 'Failed to create' }
  }
}

export const createListing = createSafeAction(CreateListing, handler)

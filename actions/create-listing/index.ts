'use server'

import { CreateListing } from '@/actions/create-listing/schema'
import { createSafeAction } from '@/lib/create-safe-listing'
import db from '@/lib/db'
import { getEmbedding } from '@/lib/openai'
import { getSelf } from '@/services/auth-services'

import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getSelf()

  const { title, content, price } = data

  const embedding = await getEmbedding(
    title + '\n\n' + content + '\n\n' + price + '\n\n' + 'Owner:' + user.id
  )

  try {
    const listing = await db.$transaction(async (tx) => {
      const result = await tx.listing.create({
        data: {
          title,
          content,
          price,
          userId: user.id,
        },
      })

      // Add the embedding on unsupported Prisma field
      await tx.$executeRaw`UPDATE "Listing" SET embedding = ${embedding}::vector WHERE id = ${result.id}`
      return result
    })

    return { data: listing }
  } catch (error) {
    console.log(error)
    return { error: 'Failed to create' }
  }
}

export const createListing = createSafeAction(CreateListing, handler)

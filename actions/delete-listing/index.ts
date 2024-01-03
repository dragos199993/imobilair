'use server'

import db from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-listing'
import { CreateListing } from '@/actions/create-listing/schema'
import { InputType, ReturnType } from './types'
import { getSelf } from '@/services/auth-services'
import { DeleteListing } from '@/actions/delete-listing/schema'
import { listingsIndex } from '@/lib/pinecone'

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getSelf()
  const { id } = data

  try {
    const result = await db.$transaction(async (tx) => {
      const deletedItem = await tx.listing.delete({ where: { id } })
      await listingsIndex.deleteOne(id)

      return deletedItem
    })

    return { data: result }
  } catch (error) {
    return { error: 'Failed to delete' }
  }
}

export const deleteListing = createSafeAction(DeleteListing, handler)

'use server'

import db from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-listing'
import { CreateListing } from '@/actions/create-listing/schema'
import { InputType, ReturnType } from './types'
import { getSelf } from '@/services/auth-services'
import { DeleteListing } from '@/actions/delete-listing/schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getSelf()
  const { id } = data

  try {
    const result = await db.listing.delete({ where: { id } })

    return { data: result }
  } catch (error) {
    return { error: 'Failed to delete' }
  }
}

export const deleteListing = createSafeAction(DeleteListing, handler)

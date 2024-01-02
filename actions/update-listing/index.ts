'use server'
import db from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-listing'
import { UpdateListing } from '@/actions/update-listing/schema'
import { InputType, ReturnType } from './types'
import { getSelf } from '@/services/auth-services'

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getSelf()

  const { title, content, id } = data

  try {
    const result = await db.listing.update({
      where: { id, userId: user.id },
      data: {
        title,
        content,
      },
    })

    return { data: result }
  } catch (error) {
    return { error: 'Failed to create' }
  }
}

export const updateListing = createSafeAction(UpdateListing, handler)

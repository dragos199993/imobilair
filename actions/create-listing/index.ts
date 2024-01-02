'use server'

import db from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-listing'
import { CreateListing } from '@/actions/create-listing/schema'
import { InputType, ReturnType } from './types'
import { getSelf } from '@/services/auth-services'

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await getSelf()

  const { title, content } = data

  try {
    const result = await db.listing.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    })

    return { data: result }
  } catch (error) {
    return { error: 'Failed to create' }
  }
}

export const createListing = createSafeAction(CreateListing, handler)

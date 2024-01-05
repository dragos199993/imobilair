import { getSelf } from '@/services/auth-services'
import db from '@/lib/db'

export const getListingById = async (id: string) => {
  const user = await getSelf()

  try {
    const listing = await db.listing.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    return listing
  } catch (error) {
    throw new Error('Internal server error')
  }
}

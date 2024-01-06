'use server'
import db from '@/lib/db'
import { getSelf } from '@/services/auth-services'

export const deleteAccountAction = async () => {
  const user = await getSelf()

  try {
    await db.$transaction(async (tx) => {
      await tx.profile.delete({
        where: {
          userId: user.id,
        },
      })

      // Deleting a user deletes also the account and the current active session!
      await tx.user.delete({
        where: {
          id: user.id,
        },
      })
    })
  } catch (error) {
    return { error: 'Failed to delete' }
  }
}

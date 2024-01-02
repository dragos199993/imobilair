import { currentUser } from '@clerk/nextjs'

export const getSelf = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

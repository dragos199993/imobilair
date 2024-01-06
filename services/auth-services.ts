import { auth } from '@/lib/auth'

export const getSelf = async () => {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  return session.user
}

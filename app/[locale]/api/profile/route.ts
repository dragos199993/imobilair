import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

export async function GET(req: Request) {
  const { userId } = auth()

  try {
    if (userId) {
      const response = await db.profile.findUnique({
        where: {
          clerkUserId: userId,
        },
      })

      return Response.json(response)
    }
  } catch (error) {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}

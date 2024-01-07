import { auth } from '@/lib/auth'
import db from '@/lib/db'

export async function GET(req: Request) {
  const session = await auth()

  try {
    if (session) {
      const response = await db.profile.findUnique({
        where: {
          userId: session.user?.id,
        },
      })

      return Response.json(response)
    }
  } catch (error) {
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}

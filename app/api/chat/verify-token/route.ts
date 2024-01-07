import db from '@/lib/db'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function POST(req: Request) {
  const body = await req.json()

  console.log(body.apiKey)
  try {
    const profile = await db.profile.findUnique({
      where: {
        key: body.apiKey,
      },
    })

    console.log(profile)
    return Response.json(
      { success: !!profile },
      {
        status: 200,
        headers,
      }
    )
  } catch (error) {
    return Response.json({ error: 'Internal error.' }, { status: 500, headers })
  }
}

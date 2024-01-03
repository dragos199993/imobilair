'use server'

import db from '@/lib/db'

export const createEarlyAccessSubmission = async (data: any) => {
  const response = await db.earlyAccessSubmission.create({
    data,
  })
}

import { z } from 'zod'

export const DeleteListing = z.object({
  id: z.string(),
})

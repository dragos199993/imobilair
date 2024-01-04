import { z } from 'zod'

export const CreateListing = z.object({
  title: z
    .string({
      required_error: 'listing_title_required',
      invalid_type_error: 'listing_title_required',
    })
    .min(3, {
      message: 'listing_title_short',
    }),
  price: z.string(),
  content: z.string(),
})

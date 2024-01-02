import { z } from 'zod'
import { Listing } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-listing'
import { DeleteListing } from '@/actions/delete-listing/schema'

export type InputType = z.infer<typeof DeleteListing>
export type ReturnType = ActionState<InputType, Listing>

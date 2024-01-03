import { z } from 'zod'
import { Listing } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-listing'
import { UpdateListing } from '@/actions/update-listing/schema'

export type InputType = z.infer<typeof UpdateListing>
export type ReturnType = ActionState<InputType, Listing>

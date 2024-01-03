import { z } from 'zod'
import { Listing } from '@prisma/client'

import { ActionState } from '@/lib/create-safe-listing'
import { CreateListing } from '@/actions/create-listing/schema'

export type InputType = z.infer<typeof CreateListing>
export type ReturnType = ActionState<InputType, Listing>

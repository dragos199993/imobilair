'use client'
import { ReactNode } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  children: ReactNode
}

export default function Loading({ children }: Props) {
  return (
    <>
      <Skeleton className="h-[380px] w-full rounded-lg" />
      <div className="pl-0 pt-24 md:pl-24">{children}</div>
    </>
  )
}

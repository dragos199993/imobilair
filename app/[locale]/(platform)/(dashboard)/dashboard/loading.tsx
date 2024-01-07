'use client'
import Link from 'next/link'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants/routes'

export default function Loading() {
  return (
    <DashboardLayout
      title="your_listings"
      actions={
        <Button asChild>
          <Link href={routes.NEW_EVENT}>Adauga un eveniment</Link>
        </Button>
      }
    >
      <div className="mt-12 grid grid-cols-1 gap-8 pb-16 md:grid-cols-2">
        <Skeleton className="h-[380px] w-full rounded-lg" />
        <Skeleton className="h-[380px] w-full rounded-lg" />
      </div>
    </DashboardLayout>
  )
}

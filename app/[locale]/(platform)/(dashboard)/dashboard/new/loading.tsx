'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants/routes'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function Loading() {
  return (
    <DashboardLayout title="create_listing">
      <div className="mt-12 grid grid-cols-1 gap-8 pb-16 md:grid-cols-2">
        <Skeleton className="h-[380px] w-full rounded-lg" />
      </div>
    </DashboardLayout>
  )
}

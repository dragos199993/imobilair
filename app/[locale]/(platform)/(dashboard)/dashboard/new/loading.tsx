'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants/routes'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Import } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Loading() {
  const t = useTranslations('Dashboard')

  return (
    <DashboardLayout
      title="create_listing"
      actions={
        <Button>
          <Import className="mr-2 h-4 w-4" />{' '}
          <span className="">{t('import_data_title')}</span>
        </Button>
      }
    >
      <div className="mt-12 grid grid-cols-1 gap-8 pb-16 md:grid-cols-2">
        <Skeleton className="h-[380px] w-full rounded-lg" />
      </div>
    </DashboardLayout>
  )
}

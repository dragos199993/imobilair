import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'

export const NoEventCard = () => {
  const t = useTranslations('Dashboard')

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-2xl font-bold">{t('no_listings_title')}</p>
      <Button className="mt-2">
        <Link href={routes.NEW_EVENT}>{t('add_listing')}</Link>
      </Button>
    </div>
  )
}

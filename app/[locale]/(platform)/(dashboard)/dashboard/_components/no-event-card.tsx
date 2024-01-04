import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'
import { useTranslations } from 'next-intl'

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

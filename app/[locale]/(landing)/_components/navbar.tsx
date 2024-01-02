import { Logo } from '@/components/ui/logo'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'
import { EarlyAccessDrawer } from '@/app/[locale]/(landing)/_components/EarlyAccessDrawer'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import pick from 'lodash/pick'
import { MobileNav } from '@/app/[locale]/(landing)/_components/MobileNav'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'
import { Link } from '@/lib/i18n'

export const Navbar = () => {
  const messages = useMessages()
  const t = useTranslations('Landing')

  return (
    <NextIntlClientProvider messages={pick(messages, 'Landing')}>
      <nav className="container flex flex-row flex-wrap items-center justify-between gap-5 px-4 py-8 sm:p-8">
        <Logo />
        <div className="hidden flex-row gap-4 sm:flex">
          {process.env.NEXT_PUBLIC_IS_RELEASED === 'true' ? (
            <Button asChild>
              <Link href={routes.DASHBOARD}>{t('start_for_free')}</Link>
            </Button>
          ) : (
            <EarlyAccessDrawer />
          )}
          <LanguageSwitcher />
          <ModeToggle />
        </div>
        <div className="flex gap-4 sm:hidden">
          <MobileNav />
          <ModeToggle />
        </div>
      </nav>
    </NextIntlClientProvider>
  )
}

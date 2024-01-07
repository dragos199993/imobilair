import pick from 'lodash/pick'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'

import { EarlyAccessDrawer } from '@/app/[locale]/(landing)/_components/EarlyAccessDrawer'
import { LoginWithGoogle } from '@/app/[locale]/(landing)/_components/LoginWithGoogle'
import { MobileNav } from '@/app/[locale]/(landing)/_components/MobileNav'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import { Logo } from '@/components/ui/logo'
import { ModeToggle } from '@/components/ui/mode-toggle'

export const Navbar = () => {
  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={pick(messages, 'Landing')}>
      <nav className="container flex flex-row flex-wrap items-center justify-between gap-5 px-4 py-8 sm:p-8">
        <Logo />
        <div className="hidden flex-row gap-4 sm:flex">
          {process.env.NEXT_PUBLIC_IS_RELEASED === 'true' ? (
            <LoginWithGoogle />
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

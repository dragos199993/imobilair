import { Logo } from '@/components/ui/logo'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { EarlyAccessDrawer } from '@/app/(landing)/[locale]/_components/EarlyAccessDrawer'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import pick from 'lodash/pick'
import { MobileNav } from '@/app/(landing)/[locale]/_components/MobileNav'

export const Navbar = () => {
  const messages = useMessages()

  return (
    <nav className="container flex flex-row flex-wrap items-center justify-between gap-5 px-4 py-8 sm:p-8">
      <Logo />
      <div className="hidden flex-row gap-4 sm:flex">
        <NextIntlClientProvider messages={pick(messages, 'Landing')}>
          <EarlyAccessDrawer />
        </NextIntlClientProvider>
        <LanguageSwitcher />
        <ModeToggle />
      </div>
      <div className="flex gap-4 sm:hidden">
        <MobileNav />
        <ModeToggle />
      </div>
    </nav>
  )
}

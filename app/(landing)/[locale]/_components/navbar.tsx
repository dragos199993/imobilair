import { Logo } from '@/components/ui/logo'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { EarlyAccessDrawer } from '@/app/(landing)/[locale]/_components/EarlyAccessDrawer'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import pick from 'lodash/pick'

export const Navbar = () => {
  const messages = useMessages()

  return (
    <nav className="container flex flex-col items-center justify-between gap-5 p-8 md:flex-row">
      <Logo />
      <div className="flex gap-4">
        <NextIntlClientProvider messages={pick(messages, 'Landing')}>
          <EarlyAccessDrawer />
        </NextIntlClientProvider>
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </nav>
  )
}

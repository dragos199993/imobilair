import { Logo } from '@/components/ui/logo'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { routes } from '@/constants/routes'
import { Badge } from '@/components/ui/badge'
import pick from 'lodash/pick'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'

export const Navbar = () => {
  const messages = useMessages()

  return (
    <nav className="fixed z-40 flex h-16 w-full items-center justify-center gap-5 bg-secondary px-4 md:justify-between">
      <Logo />
      <div className="hidden items-center gap-4 md:flex">
        <UserButton afterSignOutUrl={routes.HOME} />
        <LanguageSwitcher />

        <NextIntlClientProvider messages={pick(messages, 'Landing')}>
          <ModeToggle />
        </NextIntlClientProvider>
      </div>
    </nav>
  )
}

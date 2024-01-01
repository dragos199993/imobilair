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
    <nav className="flex justify-between gap-5 p-8 px-4 md:container">
      <Logo />
      <div className="flex items-center gap-4">
        <Badge>Beta</Badge>
        <UserButton afterSignOutUrl={routes.HOME} />
        <LanguageSwitcher />

        <NextIntlClientProvider messages={pick(messages, 'Landing')}>
          <ModeToggle />
        </NextIntlClientProvider>
      </div>
    </nav>
  )
}

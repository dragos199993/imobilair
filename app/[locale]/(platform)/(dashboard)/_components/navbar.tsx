'use client'
import { Logo } from '@/components/ui/logo'
import { useClerk, UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { routes } from '@/constants/routes'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import { Skeleton } from '@/components/ui/skeleton'
import { ChatButton } from '@/components/ui/ai/ChatButton'

export const Navbar = () => {
  const { loaded } = useClerk()

  return (
    <nav className="fixed z-40 flex h-16 w-full items-center justify-center gap-5 bg-secondary px-4 md:justify-between">
      <Logo />
      <div className="hidden items-center gap-4 md:flex">
        {!loaded ? (
          <Skeleton className="h-8 w-8 rounded-full bg-background" />
        ) : (
          <UserButton afterSignOutUrl={routes.HOME} />
        )}
        <LanguageSwitcher />
        <ModeToggle />
        <ChatButton />
      </div>
    </nav>
  )
}

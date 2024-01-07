'use client'
import { UserButton } from '@/app/[locale]/(platform)/(dashboard)/_components/user-button'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import { ChatButton } from '@/components/ui/ai/ChatButton'
import { Logo } from '@/components/ui/logo'
import { ModeToggle } from '@/components/ui/mode-toggle'

export const Navbar = () => {
  return (
    <nav className="fixed z-40 flex h-16 w-full items-center justify-center gap-5 bg-secondary px-4 md:justify-between">
      <Logo />
      <div className="absolute right-4 top-3 block md:hidden">
        <ChatButton hideLabel={true} />
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <UserButton />
        <LanguageSwitcher />
        <ModeToggle />
        <ChatButton />
      </div>
    </nav>
  )
}

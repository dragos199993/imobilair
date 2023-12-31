'use client'

import { LayoutDashboard, LogOut, Menu, Plus, Settings } from 'lucide-react'
import { router } from 'next/client'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Logout } from '@/app/[locale]/(platform)/(dashboard)/_components/logout'
import { UserButton } from '@/app/[locale]/(platform)/(dashboard)/_components/user-button'
import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { routes } from '@/constants/routes'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useRouter } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const sidebarRoutes = [
  {
    icon: LayoutDashboard,
    href: '/dashboard',
    label: 'sidebar_home',
    pro: false,
  },
  {
    icon: Plus,
    href: '/dashboard/new',
    label: 'sidebar_create',
    pro: false,
  },
  {
    icon: Settings,
    href: '/dashboard/settings',
    label: 'sidebar_settings',
    pro: false,
  },
] as const

type Props = {
  setSidebarOpen: (value: boolean) => void
  isDesktop?: boolean
}

const SidebarRoot = ({ isDesktop = false, setSidebarOpen }: Props) => {
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('Dashboard')

  const onNavigate = (
    url: '/dashboard' | '/dashboard/new' | '/dashboard/settings',
    pro: boolean
  ) => {
    // TODO: check if pro

    router.push(url)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-full flex-col space-y-2 bg-background">
      <div className="flex flex-1 justify-center px-0 py-3 md:p-3">
        <div className={cn('space-y-2', !isDesktop && 'w-full')}>
          {sidebarRoutes.map((route) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                'group flex cursor-pointer  justify-start rounded-lg p-3 text-xs font-medium ',
                'text-muted-foreground transition hover:bg-primary/10 hover:text-primary',
                pathname === `/${locale}${route.href}` &&
                  'bg-primary/10 text-primary'
              )}
            >
              <div
                className={cn(
                  'flex flex-1 items-center gap-y-2',
                  isDesktop ? 'flex-col' : 'w-full flex-row gap-4'
                )}
              >
                <route.icon className="h-5 w-5" />
                {t(route.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const t = useTranslations('Dashboard')
  const router = useRouter()

  if (isDesktop) {
    return (
      <aside className="fixed inset-y-0 z-50 mt-16 hidden w-20 md:flex">
        <SidebarRoot isDesktop={true} setSidebarOpen={setSidebarOpen} />
      </aside>
    )
  }

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger className="absolute left-4 top-5 z-50 block md:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-[300px]">
        <SheetHeader>
          <SheetTitle>
            <UserButton />
          </SheetTitle>
          <div className="flex h-full flex-col justify-between">
            <SidebarRoot setSidebarOpen={setSidebarOpen} />
            <Logout />
            <div className="mt-4 flex gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

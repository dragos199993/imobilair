import React from 'react'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useTranslations } from 'next-intl'
import { logout } from '@/actions/auth/logout'

export const Logout = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const t = useTranslations('Dashboard')

  return (
    <Button className="mt-4" variant="destructive" onClick={() => logout()}>
      <div
        className={cn(
          'flex flex-1 items-center gap-y-2',
          isDesktop ? 'flex-col' : 'w-full flex-row gap-4'
        )}
      >
        <LogOut className="h-5 w-5" />
        {t('sign_out')}
      </div>
    </Button>
  )
}

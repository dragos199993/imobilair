import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { Info, Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'

export const DashboardActions = () => {
  const t = useTranslations('Dashboard')
  const isPro = true
  const limitExceeded = true

  return (
    <>
      <Button asChild>
        <Link
          href={routes.NEW_EVENT}
          className={cn(
            buttonVariants({ variant: isPro ? 'default' : 'outline' }),
            !isPro && limitExceeded && 'pointer-events-none opacity-50',
            'gap-1'
          )}
        >
          <Plus />
          {t('add_listing')}
        </Link>
      </Button>
      {!isPro && (
        <Tooltip>
          <TooltipContent>
            <p>
              Pentru a adauga un nou eveniment, trebuie sa achizionezi planul
              PRO+
            </p>
          </TooltipContent>
          <TooltipTrigger asChild>
            <Link
              href={`${routes.HOME}#pricing`}
              className="font-bold"
              target="_blank"
            >
              <Info className="cursor-pointer" />
            </Link>
          </TooltipTrigger>
        </Tooltip>
      )}
    </>
  )
}

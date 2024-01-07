'use client'
import { ReactNode, useTransition } from 'react'

import { Select } from '@/components/ui/select'
import { usePathname, useRouter } from '@/lib/i18n'

type Props = {
  children: ReactNode
  defaultValue: string
}

export const LanguageSwitcherSelect = ({ children, defaultValue }: Props) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  return (
    <Select
      defaultValue={defaultValue}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      {children}
    </Select>
  )
}

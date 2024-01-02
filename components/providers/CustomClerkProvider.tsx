'use client'
import { ReactNode } from 'react'
import { dark } from '@clerk/themes'
import { ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { roRO } from '@/constants/clerkTranslations/ro'
import { enUS } from '@/constants/clerkTranslations/en'

type Props = {
  children: ReactNode
  locale: string
}

const currentTranslation: Record<string, any> = {
  ro: roRO,
  en: enUS,
}

export const CustomClerkProvider = ({ children, locale }: Props) => {
  const { resolvedTheme } = useTheme()

  let baseTheme = undefined

  if (resolvedTheme === 'dark') {
    baseTheme = dark
  }

  return (
    <ClerkProvider
      localization={currentTranslation[locale]}
      appearance={{ baseTheme }}
    >
      {children}
    </ClerkProvider>
  )
}

import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation'

export const locales = ['ro', 'hu'] as const
export const localePrefix = undefined

export const pathnames = {
  '/': '/',
  '/pathnames': {
    ro: '/nume-de-cale',
    hu: '/utvonalak',
  },
} satisfies Pathnames<typeof locales>

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  })

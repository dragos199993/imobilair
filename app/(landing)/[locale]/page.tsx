import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { BrainIcon, HeartIcon, LayoutTemplate } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'
import { HeroVideo } from '@/app/(landing)/[locale]/_components/HeroVideo'
import pick from 'lodash/pick'
import { EarlyAccessDrawer } from '@/app/(landing)/[locale]/_components/EarlyAccessDrawer'

export default function Home() {
  const t = useTranslations('Landing')
  const messages = useMessages()

  return (
    <TooltipProvider>
      <section className="text-center">
        <h1 className=" mb-6 mt-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t('hero_title')}
        </h1>
        <p className="mx-auto mb-8 max-w-[800px] text-gray-500 dark:text-gray-400 md:text-xl">
          {t('hero_description')}
        </p>
        <HeroVideo />

        <NextIntlClientProvider messages={pick(messages, 'Landing')}>
          <div className="mb-16 mt-8">
            <EarlyAccessDrawer />
          </div>
        </NextIntlClientProvider>
      </section>
    </TooltipProvider>
  )
}

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
      <section className="px-12 text-center sm:p-0 sm:px-6">
        <h1 className="mb-6 mt-4 scroll-m-20 text-4xl font-extrabold tracking-tight sm:mt-20 lg:text-5xl">
          {t('hero_title')}
        </h1>
        <p className="mx-auto mb-4 max-w-[800px] text-gray-500 dark:text-gray-400 md:text-xl">
          {t('hero_description')}
        </p>
        <NextIntlClientProvider messages={pick(messages, 'Landing')}>
          <div className="mb-16 w-full pt-2">
            <EarlyAccessDrawer />
          </div>
        </NextIntlClientProvider>
      </section>
      <HeroVideo />
    </TooltipProvider>
  )
}

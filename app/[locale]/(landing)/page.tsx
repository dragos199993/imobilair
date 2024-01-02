import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'
import { HeroVideo } from '@/app/[locale]/(landing)/_components/HeroVideo'
import pick from 'lodash/pick'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { Link } from '@/lib/i18n'
import { routes } from '@/constants/routes'
import { Button } from '@/components/ui/button'
import { EarlyAccessDrawer } from '@/app/[locale]/(landing)/_components/EarlyAccessDrawer'

export default function Home() {
  const t = useTranslations('Landing')
  const messages = useMessages()
  const ga_id = process.env.NEXT_PUBLIC_GA_ID
  return (
    <>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}

      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
      id=${ga_id}`}
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ga_id}');
        `,
        }}
      ></Script>
      <section className="px-12 text-center sm:p-0 sm:px-6">
        <h1
          className="animate-fade-up mb-4 mt-4 scroll-m-20 text-4xl font-extrabold tracking-tight opacity-0 sm:mt-20 lg:text-5xl"
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          {t('hero_title')}
        </h1>
        <p
          className="animate-fade-up mx-auto mb-4 block max-w-[800px] text-gray-500 opacity-0 dark:text-gray-400 md:text-xl"
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
        >
          {t('hero_description')}
        </p>
        <NextIntlClientProvider messages={pick(messages, 'Landing')}>
          <div className="mb-16 w-full pt-2">
            {process.env.NEXT_PUBLIC_IS_RELEASED === 'true' ? (
              <Button asChild>
                <Link href={routes.DASHBOARD}>{t('start_for_free')}</Link>
              </Button>
            ) : (
              <EarlyAccessDrawer />
            )}
          </div>
        </NextIntlClientProvider>
      </section>
      <HeroVideo />
    </>
  )
}

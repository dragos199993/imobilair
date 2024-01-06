import React from 'react'
import { LoginWithGoogle } from '@/app/[locale]/(landing)/_components/LoginWithGoogle'
import { EarlyAccessDrawer } from '@/app/[locale]/(landing)/_components/EarlyAccessDrawer'
import pick from 'lodash/pick'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'

export const HeroSection = () => {
  const messages = useMessages()
  const t = useTranslations('Landing')

  return (
    <NextIntlClientProvider messages={pick(messages, 'Landing')}>
      <section className="px-12 text-center sm:p-0 sm:px-6">
        <h1
          className="mb-4 mt-4 animate-fade-up scroll-m-20 text-4xl font-extrabold tracking-tight opacity-0 sm:mt-20 lg:text-6xl"
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
        >
          {t.rich('hero_title', {
            p: (chunks) => <p className="font-bold">{chunks}</p>,
            span: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h1>
        <p
          className="mx-auto mb-4 block max-w-[800px] animate-fade-up text-gray-500 opacity-0 dark:text-gray-400 md:text-xl"
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
        >
          {t('hero_description')}
        </p>
        <div className="mb-16 flex w-full justify-center gap-4 pt-2">
          {process.env.NEXT_PUBLIC_IS_RELEASED === 'true' ? (
            <LoginWithGoogle />
          ) : (
            <EarlyAccessDrawer />
          )}
        </div>
      </section>
    </NextIntlClientProvider>
  )
}

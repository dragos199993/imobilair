import type { Metadata } from 'next'
import '../../globals.css'
import { Navbar } from '@/app/[locale]/(landing)/_components/navbar'
import { Footer } from '@/app/[locale]/(landing)/_components/footer'
import { getTranslations } from 'next-intl/server'

type MetaProps = {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: MetaProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: t('landing_description'),
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

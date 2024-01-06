import Script from 'next/script'

import HeroVideo from '@/app/[locale]/(landing)/_components/HeroVideo'
import { GoogleTagManager } from '@next/third-parties/google'
import { HeroSection } from '@/app/[locale]/(landing)/_components/HeroSection'
import { auth } from '@/lib/auth'
import { redirect } from '@/lib/i18n'

export default async function Home() {
  const session = await auth()
  const ga_id = process.env.NEXT_PUBLIC_GA_ID

  // TODO: TBD if we need to block landing page
  if (session) {
    redirect('/dashboard')
  }

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
      <HeroSection />
      <HeroVideo />
    </>
  )
}

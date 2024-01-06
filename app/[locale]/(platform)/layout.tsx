import '../../globals.css'
import { getTranslations } from 'next-intl/server'

type MetaProps = {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: MetaProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${t('dashboard_title')}`,
    description: t('dashboard_title'),
  }
}

export default function PlatformLayour({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

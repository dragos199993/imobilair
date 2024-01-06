import { Navbar } from '@/app/[locale]/(platform)/(dashboard)/_components/navbar'
import { Sidebar } from '@/app/[locale]/(platform)/(dashboard)/_components/sidebar'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const messages = useMessages()

  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages}>
        <Sidebar />
        <Navbar />
        <div className="pl-0 pt-24 md:pl-24">{children}</div>
      </NextIntlClientProvider>
    </SessionProvider>
  )
}

export default DashboardLayout

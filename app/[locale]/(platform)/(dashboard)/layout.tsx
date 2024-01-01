import { Navbar } from '@/app/[locale]/(platform)/(dashboard)/_components/navbar'
import { Sidebar } from '@/app/[locale]/(platform)/(dashboard)/_components/sidebar'
import pick from 'lodash/pick'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <Sidebar />
      <div className="pl-0 md:pl-24">{children}</div>
    </NextIntlClientProvider>
  )
}

export default DashboardLayout

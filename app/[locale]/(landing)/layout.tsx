import type { Metadata } from 'next'
import '../../globals.css'
import { Navbar } from '@/app/[locale]/(landing)/_components/navbar'
import { Footer } from '@/app/[locale]/(landing)/_components/footer'

export const metadata: Metadata = {
  title: 'Imobilair',
  description: 'Imobilair application',
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

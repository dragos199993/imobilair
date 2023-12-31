import type { Metadata } from 'next'
import '../../globals.css'

export const metadata: Metadata = {
  title: 'Nunta Noastra',
  description: 'Genereaza invitatii pentru nunta ta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

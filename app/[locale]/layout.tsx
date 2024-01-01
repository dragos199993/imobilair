import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import Head from 'next/head'
import { CustomClerkProvider } from '@/components/providers/CustomClerkProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imobilair',
  description: 'Imobilair app',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <Head>
        <meta name="robots" content="NOINDEX, NOFOLLOW" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomClerkProvider locale={locale}>{children}</CustomClerkProvider>
        </ThemeProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}

'use client'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  actions?: ReactNode
}

export const DashboardLayout = ({ title, children, actions }: Props) => {
  const t = useTranslations('Dashboard')

  return (
    <section className="flex h-[600px]  flex-col px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-3xl">
          {t(title)}
        </h1>
        <div className="flex items-center gap-3">{actions}</div>
      </div>
      {children}
    </section>
  )
}

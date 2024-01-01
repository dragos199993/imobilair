import { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  actions?: ReactNode
}

export const DashboardLayout = ({ title, children, actions }: Props) => {
  return (
    <section className="flex h-[600px]  flex-col px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-3xl">
          {title}
        </h1>
        <div className="flex items-center gap-3">{actions}</div>
      </div>
      {children}
    </section>
  )
}

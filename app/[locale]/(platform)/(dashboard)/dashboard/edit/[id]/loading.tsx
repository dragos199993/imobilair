import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants/routes'
import Link from 'next/link'

export default function Loading() {
  return (
    <section className="container flex  h-[600px] flex-col">
      <div className="mt-6 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
          Modifica evenimentul
        </h1>
      </div>
      <div className="mt-8 flex w-full gap-6">
        <Skeleton className="h-[380px] w-[240px] min-w-[240px] rounded-lg" />
        <Skeleton className="h-[380px] w-full rounded-lg" />
      </div>
    </section>
  )
}

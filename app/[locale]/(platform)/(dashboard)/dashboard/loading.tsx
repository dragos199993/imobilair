import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants/routes'
import Link from 'next/link'

export default function Loading() {
  return (
    <section className="flex h-[600px]  flex-col px-4">
      <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Evenimentele mele
        </h1>
        <Button asChild>
          <Link href={routes.NEW_EVENT}>Adauga un eveniment</Link>
        </Button>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 pb-16 md:grid-cols-2">
        <Skeleton className="h-[380px] w-full rounded-lg" />
        <Skeleton className="h-[380px] w-full rounded-lg" />
      </div>
    </section>
  )
}

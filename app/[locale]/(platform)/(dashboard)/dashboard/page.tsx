import { auth, currentUser } from '@clerk/nextjs'
import EventCard from './_components/event-card'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { MAX_FREE_EVENTS_LIMIT } from '@/constants/general'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { getEvents, getEventsLimit } from '@/supabase/queries'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { checkSubscription } from '@/lib/subscription'

export default async function Home() {
  const { getToken } = auth()
  const user = await currentUser()
  // const token = await getToken({ template: 'nunta-noastra' })
  //
  // const { data: eventsLimit } = await getEventsLimit(token, user?.id)
  // const { data: events } = await getEvents(token, user?.id)
  // const limitExceeded = eventsLimit?.events_count >= MAX_FREE_EVENTS_LIMIT
  // const isPro = await checkSubscription(token)

  const isPro = true
  const limitExceeded = true
  const events: any = []

  return (
    <TooltipProvider>
      <section className="flex h-[600px]  flex-col px-4 md:container">
        <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Evenimentele mele
          </h1>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link
                href={routes.NEW_EVENT}
                className={cn(
                  buttonVariants({ variant: isPro ? 'default' : 'outline' }),
                  !isPro && limitExceeded && 'pointer-events-none opacity-50'
                )}
              >
                Adauga un eveniment
              </Link>
            </Button>
            {!isPro && (
              <Tooltip>
                <TooltipContent>
                  <p>
                    Pentru a adauga un nou eveniment, trebuie sa achizionezi
                    planul PRO+
                  </p>
                </TooltipContent>
                <TooltipTrigger asChild>
                  <Link
                    href={`${routes.HOME}#pricing`}
                    className="font-bold"
                    target="_blank"
                  >
                    <Info className="cursor-pointer" />
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            )}
          </div>
        </div>
        {events?.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-2xl font-bold">Nu ai creat niciun eveniment.</p>
            <Button className="mt-2">
              <Link href={routes.NEW_EVENT}>Adauga un eveniment</Link>
            </Button>
          </div>
        )}
        <div className="mt-12 grid grid-cols-1 gap-8 pb-16 md:grid-cols-2">
          {events?.map((event: any) => (
            <EventCard event={event} key={event.id} />
          ))}
          {!isPro && limitExceeded && (
            <Card className="flex flex-col items-center justify-center">
              <CardHeader className="relative">
                <CardTitle className="cursor-pointer">
                  Ai atins limita de evenimente gratuite.
                </CardTitle>
              </CardHeader>
              <CardDescription>
                <Button className="mt-2">
                  <Link href={`${routes.HOME}#pricing`}>
                    Achizitioneaza planul PRO+
                  </Link>
                </Button>
              </CardDescription>
            </Card>
          )}
        </div>
      </section>
    </TooltipProvider>
  )
}

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DashboardActions } from '@/app/[locale]/(platform)/(dashboard)/_components/dashboardActions'
import prismadb from '@/lib/db'
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = auth()
  // const user = await currentUser()
  // const token = await getToken({ template: 'nunta-noastra' })
  //
  // const { data: eventsLimit } = await getEventsLimit(token, user?.id)
  // const { data: events } = await getEvents(token, user?.id)
  // const limitExceeded = eventsLimit?.events_count >= MAX_FREE_EVENTS_LIMIT
  // const isPro = await checkSubscription(token)

  const isPro = true
  const limitExceeded = true
  const listings = await prismadb.listing.findMany({
    where: { userId: userId ?? '' },
  })

  return (
    <DashboardLayout title="your_listings" actions={<DashboardActions />}>
      <section className="flex h-[600px]  flex-col">
        {listings?.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-2xl font-bold">Nu ai creat niciun eveniment.</p>
            <Button className="mt-2">
              <Link href={routes.NEW_EVENT}>Adauga un eveniment</Link>
            </Button>
          </div>
        )}
        <div className="mt-12 grid grid-cols-1 gap-8 pb-16 md:grid-cols-3">
          {listings?.map((listing) => (
            <Card
              className="flex flex-col items-center shadow-lg"
              key={listing.id}
            >
              <CardHeader className="relative">
                <CardTitle className="cursor-pointer">
                  {listing.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{listing.content}</CardContent>
            </Card>
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
    </DashboardLayout>
  )
}

import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import { DashboardActions } from '@/app/[locale]/(platform)/(dashboard)/_components/dashboardActions'
import ListingCard from '@/app/[locale]/(platform)/(dashboard)/dashboard/_components/listing-card'
import { NoEventCard } from '@/app/[locale]/(platform)/(dashboard)/dashboard/_components/no-event-card'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { routes } from '@/constants/routes'
import { auth } from '@/lib/auth'
import prismadb from '@/lib/db'

export default async function Home() {
  const session = await auth()
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
    where: { userId: session?.user?.id },
  })

  if (!session) {
    redirect('/')
  }

  return (
    <DashboardLayout title="your_listings" actions={<DashboardActions />}>
      <section className="flex h-[600px]  flex-col">
        {listings?.length === 0 && <NoEventCard />}
        <div className="mt-12 grid grid-cols-1 gap-6 pb-16 md:grid-cols-2">
          {listings?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
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

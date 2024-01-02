import NewEventForm from './_components/new-event-form'
import { auth } from '@clerk/nextjs'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default async function Home() {
  const { getToken } = auth()

  return (
    <DashboardLayout title="Create a listing">
      <NewEventForm isPro={false} />
    </DashboardLayout>
  )
}

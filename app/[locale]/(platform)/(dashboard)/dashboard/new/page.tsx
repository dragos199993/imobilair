import NewEventForm from './_components/new-event-form'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default async function Home() {
  return (
    <DashboardLayout title="create_listing">
      <NewEventForm isPro={false} />
    </DashboardLayout>
  )
}

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import NewListingForm from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-listing-form'

export default function Home() {
  return (
    <DashboardLayout title="create_listing">
      <NewListingForm />
    </DashboardLayout>
  )
}

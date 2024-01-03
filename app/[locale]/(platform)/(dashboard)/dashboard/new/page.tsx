import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import NewListingForm from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-listing-form'

export default async function Home() {
  return (
    <DashboardLayout title="create_listing">
      <NewListingForm isPro={false} />
    </DashboardLayout>
  )
}

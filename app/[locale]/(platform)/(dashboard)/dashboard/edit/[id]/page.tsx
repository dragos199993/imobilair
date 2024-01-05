import { getListingById } from '@/services/listing-service'
import EditListingForm from '@/app/[locale]/(platform)/(dashboard)/dashboard/edit/[id]/_components/edit-listing.form'

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const listing = await getListingById(params.id)

  if (!listing) {
    return null
  }

  return (
    <section className="container flex  h-[600px] flex-col">
      <EditListingForm {...listing} />
    </section>
  )
}

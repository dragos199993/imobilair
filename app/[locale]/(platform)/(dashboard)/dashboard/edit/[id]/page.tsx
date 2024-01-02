import EditEventForm from './_components/edit-event.form'
import { getListingById } from '@/services/listing-service'

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
      <div className="mt-6 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
          Modifica anuntul
        </h1>
      </div>
      <EditEventForm {...listing} />
    </section>
  )
}

import { auth } from '@clerk/nextjs'
import EditEventForm from './_components/edit-event.form'
import supabaseClient from '@/lib/supabaseClient'

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const { getToken } = auth()
  const token = await getToken({ template: 'nunta-noastra' })

  const { data: event } = await supabaseClient(token)
    .from('events')
    .select()
    .eq('id', params.id)
    .single()

  return (
    <section className="container flex  h-[600px] flex-col">
      <div className="mt-6 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
          Modifica evenimentul
        </h1>
      </div>
      <EditEventForm {...event} />
    </section>
  )
}

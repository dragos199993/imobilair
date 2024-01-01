import NewEventForm from './_components/new-event-form'
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { getToken } = auth()

  return (
    <section className="container flex  h-[600px] flex-col">
      <div className="mt-6 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
          Despre evenimentul tau:
        </h1>
      </div>
      <NewEventForm isPro={false} />
    </section>
  )
}

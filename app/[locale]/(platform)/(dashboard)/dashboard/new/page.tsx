import { redirect } from 'next/navigation'

import NewListingForm from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-listing-form'
import { auth } from '@/lib/auth'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return <NewListingForm />
}

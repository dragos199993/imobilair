import { redirect } from 'next/navigation'

import { ApiKeyField } from '@/app/[locale]/(platform)/(dashboard)/dashboard/settings/_components/ApiKeyField'
import { DeleteAccount } from '@/app/[locale]/(platform)/(dashboard)/dashboard/settings/_components/delete-account'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

export default async function SettingsPage() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <DashboardLayout title="profile_settings">
      <DeleteAccount />
      <ApiKeyField />
    </DashboardLayout>
  )
}

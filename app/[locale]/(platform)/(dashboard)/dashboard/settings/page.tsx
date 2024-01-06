import { ApiKeyField } from '@/app/[locale]/(platform)/(dashboard)/dashboard/settings/_components/ApiKeyField'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { DeleteAccount } from '@/app/[locale]/(platform)/(dashboard)/dashboard/settings/_components/delete-account'

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

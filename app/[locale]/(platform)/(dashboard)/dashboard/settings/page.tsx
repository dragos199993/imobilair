'use client'
import { useClerk, UserProfile } from '@clerk/nextjs'
import { ApiKeyField } from '@/app/[locale]/(platform)/(dashboard)/dashboard/settings/_components/ApiKeyField'

export default function SettingsPage() {
  const clerk = useClerk()

  if (!clerk.loaded) {
    return null
  }

  return (
    <div className="flex flex-col">
      <div className="max-w-1/2">
        <UserProfile
          appearance={{
            elements: {
              rootBox: 'shadow-none sm:-ml-8 -ml-2',
              card: 'shadow-none border-0',
              navbar: 'hidden',
              pageScrollBox: 'pt-0 bg-background border-0',
              navbarMobileMenuRow: 'hidden',
            },
          }}
        />
      </div>
      <div className="p-6">
        <ApiKeyField />
      </div>
    </div>
  )
}

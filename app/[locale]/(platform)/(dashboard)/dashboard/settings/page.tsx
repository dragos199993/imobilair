'use client'
import { useClerk, UserProfile } from '@clerk/nextjs'

export default function SettingsPage() {
  const clerk = useClerk()

  if (!clerk.loaded) {
    return null
  }

  return (
    <UserProfile
      appearance={{
        elements: {
          rootBox: 'shadow-none -ml-8',
          card: 'shadow-none border-0',
          navbar: 'hidden',
          pageScrollBox: 'pt-0 bg-background border-0',
        },
      }}
    />
  )
}

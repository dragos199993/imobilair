'use client'
import { Profile } from '@prisma/client'
import axios from 'axios'
import { Copy, Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export const ApiKeyField = () => {
  const t = useTranslations('Dashboard')
  const [profile, setProfile] = useState<Profile>()
  const [apiKeyVisible, setApiKeyVisible] = useState(false) // Initialize as hidden

  useEffect(() => {
    ;(async () => {
      const { data } = await axios('/api/profile')
      setProfile(data)
    })()
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(profile?.key ?? '')
      .then(() => {
        toast.success(t('copied_with_success'))
      })
      .catch((err) => {
        toast.error(t('copied_failed'))
        console.error('Failed to copy API key: ', err)
      })
  }

  const toggleApiKeyVisibility = () => {
    setApiKeyVisible(!apiKeyVisible)
  }

  return (
    <div className="mt-10">
      <p className="pb-4 text-2xl font-semibold">{t('your_api_key')}</p>
      <div className="flex w-full items-center space-x-2">
        <Button type="button" variant="link" onClick={toggleApiKeyVisibility}>
          {apiKeyVisible ? <EyeOff /> : <Eye />}
        </Button>
        <Button type="submit" variant="link" onClick={copyToClipboard}>
          <Copy />
        </Button>
        <p className="block max-w-[250px] overflow-scroll rounded-lg py-2 text-sm md:max-w-full">
          {apiKeyVisible ? profile?.key : '*'.repeat(profile?.key.length || 0)}
        </p>
      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import axios from 'axios'
import { Profile } from '@prisma/client'

export const ApiKeyField = () => {
  const t = useTranslations('Dashboard')
  const apiRef = useRef<HTMLParagraphElement>(null)
  const [profile, setProfile] = useState<Profile>()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios('/api/profile')
      setProfile(data)
    })()
  }, [])

  const copyToClipboard = () => {
    if (apiRef.current) {
      navigator.clipboard
        .writeText(apiRef.current.textContent ?? '')
        .then(() => {
          toast.success(t('copied_with_success'))
        })
        .catch((err) => {
          toast.error(t('copied_failed'))
          console.error('Failed to copy API key: ', err)
        })
    }
  }

  return (
    <div className="mt-10">
      <p className="pb-4 text-2xl font-semibold">{t('your_api_key')}</p>
      <div className="flex w-full items-center space-x-2">
        <p
          className="block rounded-lg border border-secondary  px-4 py-2"
          ref={apiRef}
        >
          {profile?.key}
        </p>
        <Button type="submit" variant="link" onClick={copyToClipboard}>
          <Copy />
        </Button>
      </div>
    </div>
  )
}

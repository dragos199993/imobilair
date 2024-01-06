'use client'
import { useTranslations } from 'next-intl'
import { login } from '@/actions/auth/login'
import { useState } from 'react'
import { ButtonLoading } from '@/components/ui/button-loading'

export const LoginWithGoogle = () => {
  const t = useTranslations('Landing')
  const [loading, setLoading] = useState(false)

  const loginWithLoading = async () => {
    console.log('here')
    setLoading(true)
    await login()
  }

  return (
    <ButtonLoading loading={loading} onClick={loginWithLoading}>
      {t('start_for_free')}
    </ButtonLoading>
  )
}

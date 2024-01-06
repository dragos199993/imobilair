'use client'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { login } from '@/actions/auth/login'

export const LoginWithGoogle = () => {
  const t = useTranslations('Landing')

  return (
    <Button onClick={async () => await login()}>{t('start_for_free')}</Button>
  )
}

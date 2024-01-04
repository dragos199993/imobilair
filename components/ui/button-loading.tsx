import React, { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { Button, ButtonProps } from '@/components/ui/button'

type Props = {
  children: ReactNode
  loading: boolean
} & ButtonProps

export const ButtonLoading = ({ loading, children }: Props) => {
  return (
    <Button type="submit" aria-disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}

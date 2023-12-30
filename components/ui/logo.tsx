import React from 'react'
import Link from 'next/link'
import { routes } from '@/constants/routes'

export const Logo = () => {
  return (
    <Link
      href={routes.HOME}
      className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl"
    >
      {process.env.NEXT_PUBLIC_APP_NAME}
    </Link>
  )
}

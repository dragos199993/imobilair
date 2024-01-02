import React, { ReactElement } from 'react'
import Link from 'next/link'
import { routes } from '@/constants/routes'

export const Logo = () => {
  let coloredLogo = process.env.NEXT_PUBLIC_APP_NAME ?? ''
  let finalLogo: ReactElement = <></>

  if (coloredLogo.includes('ai')) {
    finalLogo = (
      <span>
        {coloredLogo.split('ai')[0]}
        <span className="text-primary">ai</span>
        {coloredLogo.split('ai')[1]}
      </span>
    )
  } else {
    finalLogo = <>{coloredLogo}</>
  }

  return (
    <div>
      <Link
        href={routes.HOME}
        className="flex scroll-m-20 items-center gap-1 text-3xl font-extrabold tracking-tight lg:text-3xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-home"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        {finalLogo}
      </Link>
    </div>
  )
}

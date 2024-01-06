'use client'

import { useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/actions/auth/logout'
import Image from 'next/image'

export const UserButton = () => {
  const session = useSession()

  if (!session.data?.user) {
    return null
  }

  const { image, email } = session.data?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="block overflow-hidden rounded-full ">
        <Image
          src={image as string}
          alt={`${email} profile image`}
          width={32}
          height={32}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout()
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

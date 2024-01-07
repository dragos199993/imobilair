import { Menu } from 'lucide-react'

import LanguageSwitcher from '@/components/languageSwitcher/LanguageSwitcher'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const MobileNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[280px]">
        <DropdownMenuItem>
          <LanguageSwitcher />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

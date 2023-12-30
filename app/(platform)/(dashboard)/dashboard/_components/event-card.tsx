'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routes } from '@/constants/routes'
import { useAuth, useSession } from '@clerk/nextjs'
import dayjs, { Dayjs } from 'dayjs'
import { Edit2Icon, EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { z } from 'zod'
import { formSchema } from '../new/_components/new-event-form'
import { HTTP_TYPE } from '@/lib/utils'
import { deleteEvent, updateEventsLimit } from '@/supabase/mutations'
import { TemplateView } from '@/app/(platform)/(invite)/[locale]/test/_components/template-view'

type Props = {
  event: z.infer<typeof formSchema> & { id: string; slug: string }
}

const EventCard: FC<Props> = ({ event }) => {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const dayObj: Dayjs = dayjs(event.date)
  const { getToken } = useAuth()
  const { session } = useSession()

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    const token = await getToken({ template: 'nunta-noastra' })
    await deleteEvent(token, event.id)
    await updateEventsLimit(token, 0, session?.user.id)
    router.refresh()
  }

  return (
    <>
      <Card>
        <CardHeader className="relative">
          <CardTitle className="cursor-pointer">
            <Link
              href={`${HTTP_TYPE}${event.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
            >
              {event.name}
            </Link>
          </CardTitle>
          <CardDescription>
            {dayObj.format('MMM D, YYYY - HH:mm')}
          </CardDescription>
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute right-6 top-4">
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-destructive/90"
                asChild
              >
                <Link
                  href={`${HTTP_TYPE}${event.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                  target="_blank"
                >
                  <EyeIcon className="mr-2 h-4 w-4" />
                  Vezi pagina evenimentului
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-destructive/90"
                asChild
              >
                <Link href={`${routes.EDIT_EVENT}/${event.id}`}>
                  <Edit2Icon className="mr-2 h-4 w-4" />
                  Modifica
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteModal}
                className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Sterge
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="max-h-[240px] cursor-pointer overflow-y-auto">
          <Link
            href={`${HTTP_TYPE}${event.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          >
            <TemplateView {...event} />
          </Link>
        </CardContent>
      </Card>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Esti sigur ca vrei sa stergi evenimentul &quot;{event.name}&quot;?
            </DialogTitle>
            <DialogDescription>Actiunea nu poate fi anulata.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:justify-start">
            <Button variant="destructive" onClick={handleDelete}>
              Da, Sterge
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Anuleaza
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EventCard

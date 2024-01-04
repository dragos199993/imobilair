'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { createEarlyAccessSubmission } from '@/actions/create-early-access-submission'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export function EarlyAccessDrawer() {
  const t = useTranslations('Landing')
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{t('early_access')}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{t('early_access')}</DialogTitle>
            <DialogDescription>
              {t('early_access_description')}
            </DialogDescription>
          </DialogHeader>
          <EarlyAccessForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>{t('early_access')}</Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader className="text-left">
          <DrawerTitle>{t('early_access')}</DrawerTitle>
          <DrawerDescription>{t('early_access_description')}</DrawerDescription>
        </DrawerHeader>
        <EarlyAccessForm setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t('close_drawer')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function EarlyAccessForm({ setOpen }: { setOpen: (value: boolean) => void }) {
  const t = useTranslations('Landing')
  const schema = z.object({
    name: z.string().min(1, { message: t('name_required') }),
    email: z.string().email(t('email_invalid')),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await createEarlyAccessSubmission(data)
      toast.success(t('early_access_submission_sent'))
      setOpen(false)
    } catch (error: any) {
      if (!error) {
        toast.success(t('early_access_submission_sent'))
        setOpen(false)
        return
      }
      if (error?.message?.includes('Unique')) {
        toast.error(t('early_access_submission_duplicate'))
        return
      }

      if (error) {
        toast.error(t('early_access_submission_error'))
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-4 md:px-0"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name_label')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email_label')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full px-12 text-right md:w-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('submit_button')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

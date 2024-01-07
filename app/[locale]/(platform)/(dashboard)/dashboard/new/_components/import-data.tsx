'use client'
import { Import, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
  formSchema,
  importDataSchema,
} from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-listing-form'
import { Button } from '@/components/ui/button'
import { ButtonLoading } from '@/components/ui/button-loading'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { importAll, scrapeLink } from '@/lib/scrapeData'

type Props = UseFormReturn<z.infer<typeof importDataSchema>> & {
  setImportedData: (data: z.infer<typeof formSchema>) => void
}

export const ImportData = ({ setImportedData, ...form }: Props) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations('Dashboard')
  async function onSubmit(values: z.infer<typeof importDataSchema>) {
    try {
      const data = (await scrapeLink(values.url)) as z.infer<typeof formSchema>
      setImportedData(data)
      toast.success(t('import_data_success'))
      form.reset()
      setOpen(false)
    } catch (error) {
      form.setError('url', { message: t('import_data_failed') })
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Import className="mr-2 h-4 w-4" />{' '}
            <span className="">{t('import_data_title')}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{t('import_data_title')}</DialogTitle>
                <DialogDescription>
                  {t('import_data_description')}
                </DialogDescription>
              </DialogHeader>

              <div className="flex  flex-col gap-4 space-y-2 pb-12">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t('import_data_description')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <ButtonLoading
                  type="submit"
                  aria-disabled={form.formState.isSubmitting}
                  className="mt-0"
                  loading={form.formState.isSubmitting}
                >
                  {t('listing_form_submit')}
                </ButtonLoading>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

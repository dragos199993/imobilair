'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { Textarea } from '@/components/ui/textarea'
import { createListing } from '@/actions/create-listing'
import { Loader2 } from 'lucide-react'
import { ImportData } from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/import-data'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { useTranslations } from 'next-intl'
import { ButtonLoading } from '@/components/ui/button-loading'

export const importDataSchema = z.object({
  url: z.string().min(2, {
    message: 'Url field is required',
  }),
})

export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'title_required',
  }),
  content: z.string().min(2, {
    message: 'content_required',
  }),
  price: z.string().min(2, {
    message: 'price_required',
  }),
})

function NewListingForm() {
  const [importedData, setImportedData] = useState<z.infer<typeof formSchema>>()
  const router = useRouter()
  const t = useTranslations('Dashboard')

  const importDataForm = useForm<z.infer<typeof importDataSchema>>({
    resolver: zodResolver(importDataSchema),
    defaultValues: {
      url: '',
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: '',
      content: '',
    },
  })

  useEffect(() => {
    if (importedData) {
      form.setValue('title', importedData.title)
      form.setValue('price', importedData.price)
      form.setValue('content', importedData.content)
      form.clearErrors()
    }
  }, [importedData])

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let limitExceeded = false

    if (!limitExceeded) {
      const { error } = await createListing({
        title: values.title,
        content: values.content,
        price: values.price,
      })

      if (!error) {
        router.push(routes.DASHBOARD)
        router.refresh()
      }
    }
  }

  return (
    <DashboardLayout
      title="create_listing"
      actions={
        <ImportData {...importDataForm} setImportedData={setImportedData} />
      }
    >
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex w-full max-w-[450px] gap-6"
          >
            <div className="flex  w-full  flex-col gap-4 space-y-2 pb-12">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('listing_form_title')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('listing_form_title_placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('listing_form_price')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('listing_form_content')}</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoading loading={isSubmitting}>
                {t('listing_form_submit')}
              </ButtonLoading>
            </div>
          </form>
        </Form>
      </FormProvider>
    </DashboardLayout>
  )
}

export default NewListingForm

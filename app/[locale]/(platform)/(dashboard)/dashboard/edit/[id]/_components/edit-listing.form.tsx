'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { updateListing } from '@/actions/update-listing'
import { formSchema } from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-listing-form'
import { ButtonLoading } from '@/components/ui/button-loading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { routes } from '@/constants/routes'

type Props = z.infer<typeof formSchema> & { id: string }

const EditListingForm: FC<Props> = ({ id, title, content, price }) => {
  const t = useTranslations('Dashboard')
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      content,
      price,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await updateListing({
      id,
      title: values.title,
      content: values.content,
      price: values.price,
    })

    if (!error) {
      router.push(routes.DASHBOARD)
      router.refresh()
    }
  }

  return (
    <>
      <div className="mt-6 flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
          {t('listing_edit_title')}
        </h1>
      </div>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex w-full gap-6"
          >
            <div className="flex w-full min-w-[240px] max-w-[450px] flex-col gap-4 space-y-8 pb-12">
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
              <ButtonLoading
                loading={form.formState.isSubmitting}
                type="submit"
              >
                {t('listing_form_edit_submit')}
              </ButtonLoading>
            </div>
          </form>
        </Form>
      </FormProvider>
    </>
  )
}

export default EditListingForm

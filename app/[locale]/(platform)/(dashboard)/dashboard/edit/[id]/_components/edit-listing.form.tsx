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
import { FC } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { updateListing } from '@/actions/update-listing'
import { formSchema } from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-listing-form'

type Props = z.infer<typeof formSchema> & { id: string }

const EditListingForm: FC<Props> = ({ id, title, content, price }) => {
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
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex w-full gap-6"
        >
          <div className="flex w-full min-w-[240px] flex-col gap-4 space-y-8 pb-12">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numele</FormLabel>
                  <FormControl>
                    <Input placeholder="Mihai si Mihaela" {...field} />
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
                  <FormLabel>Descriere</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descriere" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Modifica anuntul</Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}

export default EditListingForm

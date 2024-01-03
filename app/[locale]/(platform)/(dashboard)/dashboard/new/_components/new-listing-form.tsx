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

export const importDataSchema = z.object({
  url: z.string().min(2, {
    message: 'Url field is required',
  }),
})

export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Numele evenimentului trebuie sa aiba minim 2 caractere.',
  }),
  content: z.string().min(2, {
    message: 'Descrierea evenimentului trebuie sa aiba minim 2 caractere.',
  }),
})

function NewListingForm() {
  const [importedData, setImportedData] = useState<z.infer<typeof formSchema>>()
  const router = useRouter()

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
      content: '',
    },
  })

  useEffect(() => {
    if (importedData) {
      form.setValue('title', importedData.title)
      form.setValue('content', importedData.content)
    }
  }, [importedData])

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let limitExceeded = false

    if (!limitExceeded) {
      const { data, error } = await createListing({
        title: values.title,
        content: values.content,
      })

      if (!error) {
        router.push(routes.DASHBOARD)
        router.refresh()
      }
    }
  }

  return (
    <>
      <ImportData {...importDataForm} setImportedData={setImportedData} />
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex w-full gap-6"
          >
            <div className="flex  w-full  flex-col gap-4 space-y-8 pb-12">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numele</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
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
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descriere" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" aria-disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Adauga anunt
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </>
  )
}

export default NewListingForm

'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import * as z from 'zod'
import {
  formSchema,
  importDataSchema,
} from '@/app/[locale]/(platform)/(dashboard)/dashboard/new/_components/new-listing-form'
import { UseFormReturn } from 'react-hook-form'
import { scrapeLink } from '@/lib/scrapeData'

type Props = UseFormReturn<z.infer<typeof importDataSchema>> & {
  setImportedData: (data: z.infer<typeof formSchema>) => void
}

export const ImportData = ({ setImportedData, ...form }: Props) => {
  async function onSubmit(values: z.infer<typeof importDataSchema>) {
    const data = (await scrapeLink(values.url)) as z.infer<typeof formSchema>
    setImportedData(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 flex w-[600px] gap-6"
      >
        <div className="flex  w-full  flex-col gap-4 space-y-8 pb-12">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" aria-disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Import
          </Button>
        </div>
      </form>
    </Form>
  )
}

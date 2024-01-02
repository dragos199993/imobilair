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
import { useAuth, useSession } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { FC } from 'react'
import { formSchema } from '../../../new/_components/new-event-form'
import { Textarea } from '@/components/ui/textarea'

type Props = z.infer<typeof formSchema> & { id: string }

const EditEventForm: FC<Props> = ({ id, title, content }) => {
  const router = useRouter()
  const { session } = useSession()
  const { getToken } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      content,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await getToken({ template: 'nunta-noastra' })

    const { data, error } = await supabaseClient(token)
      .from('events')
      .update({
        ...values,
        user_id: session?.user.id,
      })
      .eq('id', id)
      .select()

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
          <div className="flex w-[240px] min-w-[240px] flex-col gap-4 space-y-8 pb-12">
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
            <Button type="submit">Modifica evenimentul</Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}

export default EditEventForm

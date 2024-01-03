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
import { Textarea } from '@/components/ui/textarea'
import { MAX_FREE_EVENTS_LIMIT } from '@/constants/general'
import { createListing } from '@/actions/create-listing'
import { Loader2 } from 'lucide-react'

export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Numele evenimentului trebuie sa aiba minim 2 caractere.',
  }),
  content: z.string().min(2, {
    message: 'Descrierea evenimentului trebuie sa aiba minim 2 caractere.',
  }),
})

function NewListingForm({ isPro }: { isPro: boolean }) {
  const router = useRouter()
  const { session } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting
  async function setLimit(token: string | null) {
    const { data: eventsLimit } = await supabaseClient(token)
      .from('events_limit')
      .select()
      .eq('user_id', session?.user.id)
      .single()

    if (!eventsLimit) {
      const { error: eventsLimitError } = await supabaseClient(token)
        .from('events_limit')
        .insert([
          {
            user_id: session?.user.id,
            updated_at: new Date(),
            created_at: new Date(),
            events_count: 1,
          },
        ])
        .select()
    } else {
      const { data: events_limit } = await supabaseClient(token)
        .from('events_limit')
        .update({
          updated_at: new Date(),
          events_count: eventsLimit.events_count + 1,
        })
        .eq('user_id', session?.user.id)
        .select()
        .single()
      if (events_limit?.events_count > MAX_FREE_EVENTS_LIMIT) {
        return true
      }
    }
  }

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
  )
}

export default NewListingForm

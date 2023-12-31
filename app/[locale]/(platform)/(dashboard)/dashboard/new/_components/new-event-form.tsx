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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, slugify } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import dayjs, { Dayjs } from 'dayjs'
import { useAuth, useSession } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { TemplateEditor } from '@/components/ui/template-editor'
import { GradientGroup, GradientPicker } from '@/components/ui/gradient-picket'
import { Textarea } from '@/components/ui/textarea'
import { MAX_FREE_EVENTS_LIMIT } from '@/constants/general'
import { checkSubscription } from '@/lib/subscription'

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Numele evenimentului trebuie sa aiba minim 2 caractere.',
  }),
  description: z.string().min(2, {
    message: 'Descrierea evenimentului trebuie sa aiba minim 2 caractere.',
  }),
  date: z.date({
    required_error: 'Data evenimentului este obligatorie.',
  }),
  location: z
    .string({ required_error: 'Locatia evenimentului este obligatorie ' })
    .min(2, {
      message: 'Locatia evenimentului trebuie sa aiba minim 2 caractere.',
    }),
  customization: z.object({
    background: z.object({
      value: z.string(),
      color: z.string(),
      label: z.string(),
    }),
    name: z.object({
      alignment: z.string(),
      fontFamily: z.string(),
    }),
    description: z.object({
      alignment: z.string(),
      fontFamily: z.string(),
    }),
    location: z.object({
      alignment: z.string(),
      fontFamily: z.string(),
    }),
    date: z.object({
      alignment: z.string(),
      fontFamily: z.string(),
    }),
  }),
})

function NewEventForm({ isPro }: { isPro: boolean }) {
  const router = useRouter()
  const { session } = useSession()
  const { getToken } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      customization: {
        name: {
          alignment: 'center',
          fontFamily: 'greatVibes',
        },
        location: {
          alignment: 'center',
          fontFamily: 'greatVibes',
        },
        date: {
          alignment: 'center',
          fontFamily: 'greatVibes',
        },
        description: {
          alignment: 'center',
          fontFamily: 'greatVibes',
        },
        background: { value: '#09203f', color: 'light', label: 'Dark Blue' },
      },
    },
  })

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
    const token = await getToken({ template: 'nunta-noastra' })

    let limitExceeded = false
    if (!isPro) {
      limitExceeded = !!setLimit(token)
    }

    if (!limitExceeded) {
      const { error } = await supabaseClient(token)
        .from('events')
        .insert([
          {
            ...values,
            slug: slugify(values.name),
            user_id: session?.user.id,
          },
        ])
        .select()

      if (!error) {
        router.push(routes.DASHBOARD)
        router.refresh()
      }
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <div className="mt-8 flex w-full gap-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex w-full gap-6"
          >
            <div className="flex w-[240px] min-w-[240px] flex-col gap-4 space-y-8 pb-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numele</FormLabel>
                    <FormControl>
                      <Input placeholder="Mihai si Mihaela" {...field} />
                    </FormControl>
                    {form.watch('name') && (
                      <p className="text-xs text-gray-500">
                        {slugify(form.watch('name'))}.
                        {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
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
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locatia</FormLabel>
                    <FormControl>
                      <Input placeholder="Medgidia, sub pod" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => {
                  const dayObj: Dayjs = dayjs(field.value)

                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                dayObj.format('MMM D, YYYY')
                              ) : (
                                <span>Alege data evenimentului</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              dayjs(date).isBefore(dayjs(), 'day')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="customization.background"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fundal</FormLabel>
                      <FormControl>
                        <GradientPicker
                          background={field.value as GradientGroup}
                          setBackground={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <Button type="submit">Adauga evenimentul</Button>
            </div>

            <TemplateEditor
              name={form.watch('name')}
              date={form.watch('date')}
              description={form.watch('description')}
              location={form.watch('location')}
              customization={form.watch('customization')}
            />
          </form>
        </div>
      </Form>
    </FormProvider>
  )
}

export default NewEventForm

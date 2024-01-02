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
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import dayjs, { Dayjs } from 'dayjs'
import { useAuth, useSession } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { FC } from 'react'
import { formSchema } from '../../../new/_components/new-event-form'
import { Textarea } from '@/components/ui/textarea'

type Props = z.infer<typeof formSchema> & { id: string }

const EditEventForm: FC<Props> = ({
  id,
  date,
  description,
  location,
  name,
}) => {
  const router = useRouter()
  const { session } = useSession()
  const { getToken } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      date: dayjs(date).toDate(),
      description,
      location,
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
              name="name"
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
            <Button type="submit">Modifica evenimentul</Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}

export default EditEventForm

import supabaseClient from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import { HTTP_TYPE } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TemplateView } from '@/app/(platform)/(invite)/[locale]/test/_components/template-view'

export default async function EventDetail({
  params,
}: {
  params: { slug: string }
}) {
  const { data: event, error } = await supabaseClient()
    .from('events')
    .select()
    .eq('slug', params.slug.split('.')[0])
    .single()

  console.log(error)
  if (!event) {
    notFound()
  }

  return (
    <section className="flex h-[600px]  flex-col p-8">
      <div className=" gap-8 pb-16">
        <TemplateView
          {...event}
          action={
            <Button
              asChild
              variant={
                event.customization.background.color ? 'default' : 'secondary'
              }
            >
              <Link
                href={`${HTTP_TYPE}${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/dashboard`}
              >
                Inapoi la &quot;Nunta Noastra&quot;
              </Link>
            </Button>
          }
        />
      </div>
    </section>
  )
}

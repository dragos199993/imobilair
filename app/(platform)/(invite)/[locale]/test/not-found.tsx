import { Button } from '@/components/ui/button'
import { HTTP_TYPE } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center text-center">
      <span className="text-6xl font-bold">404</span>
      <h2 className="text-3xl font-bold">Evenimentul nu a fost gasit</h2>
      <p className="mb-6">Verifica daca adresa este corecta</p>
      <Button asChild>
        <Link href={`${HTTP_TYPE}${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}>
          <span>Inapoi la </span>
          <span className="pl-1 font-bold">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </Link>
      </Button>
    </div>
  )
}

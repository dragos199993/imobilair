'use client'

import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'

export const UpgradeToPro = () => {
  const { user } = useUser()
  const dashboardUrl = absoluteUrl(routes.DASHBOARD)

  console.log({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'ron',
          product_data: {
            name: 'Nunta noastra PRO+',
            description: 'Deblocheaza customizarea completa a invitatiei',
          },
          unit_amount: 4900,
          recurring: {
            interval: 'month',
          },
        },
        price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        quantity: 1,

        metadata: {
          userId: user?.id ?? '',
        },
      },
    ],
    payment_intent_data: {
      metadata: {
        userId: user?.id ?? '',
      },
    },
    metadata: {
      userId: user?.id ?? '',
    },
    billing_address_collection: 'auto',
    success_url: `${dashboardUrl}/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: dashboardUrl,
    customer_email: user?.emailAddresses[0].emailAddress,
  })
  const upgrateToPro = async () => {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: 'Nunta noastra PRO+',
              description: 'Deblocheaza customizarea completa a invitatiei',
            },
            unit_amount: 4900,
            recurring: {
              interval: 'month',
            },
          },
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user?.id ?? '',
      },
      billing_address_collection: 'auto',
      success_url: `${dashboardUrl}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: dashboardUrl,
      customer_email: user?.emailAddresses[0].emailAddress,
    })

    if (typeof window === 'undefined') return
    ;(window as any).location.href = stripeSession.url
  }

  return (
    <div className="flex flex-col gap-4 text-center">
      <div>
        <h4 className="text-5xl font-bold">49 RON</h4>
        <p className="text-sm font-medium text-muted-foreground">
          Plata lunara
        </p>
      </div>
      <Button onClick={upgrateToPro}>Incepe acum</Button>
    </div>
  )
}

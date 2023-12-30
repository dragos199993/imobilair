import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import supabaseClient from '@/lib/supabaseClient'
import { auth } from '@clerk/nextjs'

export async function POST(req: Request) {
  const { getToken } = auth()
  const token = await getToken({ template: 'nunta-noastra' })
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return new NextResponse('Invalid Stripe webhook event', { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session.metadata?.userId) {
      return new NextResponse('Missing metadata', { status: 400 })
    }

    console.log(token)
    try {
      const { data, error } = await supabaseClient(token)
        .from('subscriptions')
        .insert([
          {
            user_id: session?.metadata?.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items?.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        ])
        .select()

      console.log(error)
    } catch (error) {
      console.log(error)
    }
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session.metadata?.userId) {
      return new NextResponse('Missing metadata', { status: 400 })
    }

    supabaseClient(token)
      .from('subscriptions')
      .update({
        stripePriceId: subscription.items?.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
      .match({ stripeSubscriptionId: subscription.id })
  }

  return new NextResponse(null, { status: 200 })
}

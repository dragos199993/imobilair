import { auth } from '@clerk/nextjs'
import supabaseClient from './supabaseClient'
import dayjs from 'dayjs'

export const checkSubscription = async (token: string | null) => {
  const { userId } = auth()

  if (!userId) {
    return false
  }

  const { data: subscription } = await supabaseClient(token)
    .from('subscriptions')
    .select()
    .eq('user_id', userId)
    .single()

  if (!subscription) {
    return false
  }

  const isValid =
    subscription?.stripePriceId &&
    dayjs(subscription.stripeCurrentPeriodEnd).isAfter(dayjs())

  return !!isValid
}

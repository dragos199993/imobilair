import supabaseClient from '@/lib/supabaseClient'

export const getEventsLimit = async (token: string | null, userId?: string) =>
  await supabaseClient(token)
    .from('events_limit')
    .select()
    .eq('user_id', userId)
    .single()

export const getEvents = async (token: string | null, userId?: string) =>
  await supabaseClient(token)
    .from('events')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

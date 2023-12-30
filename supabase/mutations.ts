import supabaseClient from '@/lib/supabaseClient'

export const deleteEvent = async (token: string | null, eventId: string) =>
  await supabaseClient(token).from('events').delete().eq('id', eventId)

export const updateEventsLimit = async (
  token: string | null,
  newEventsCount: number,
  userId?: string
) =>
  await supabaseClient(token)
    .from('events_limit')
    .update({
      updated_at: new Date(),
      events_count: newEventsCount,
    })
    .eq('user_id', userId)
    .select()
    .single()

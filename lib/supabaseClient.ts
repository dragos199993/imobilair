import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)

const supabaseClient = (supabaseAccessToken?: string | null) => {
  if (supabaseAccessToken) {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    })
    return supabase
  }

  return createClient(supabaseUrl, supabaseKey)
}

export default supabaseClient

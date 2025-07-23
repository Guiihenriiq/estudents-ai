import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis de ambiente do Supabase não estão configuradas')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }

export default function useSupabase() {
  return { supabase }
}

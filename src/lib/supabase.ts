import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export const isSupabaseConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

let _supabaseClient: ReturnType<typeof createClient> | null = null
let _supabaseServer: ReturnType<typeof createClient> | null = null

// Client for browser (uses anon key) - singleton
export const supabaseClient = isSupabaseConfigured
  ? (() => {
      if (!_supabaseClient) {
        _supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
      }
      return _supabaseClient
    })()
  : null

// Server client (uses service role key for full access) - singleton
export const supabaseServer = isSupabaseConfigured
  ? (() => {
      if (!_supabaseServer) {
        _supabaseServer = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
      }
      return _supabaseServer
    })()
  : null

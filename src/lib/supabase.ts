import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export const isSupabaseConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function initClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

function initServer(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null
  return createClient<Database>(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
}

export const supabaseClient = initClient()
export const supabaseServer = initServer()

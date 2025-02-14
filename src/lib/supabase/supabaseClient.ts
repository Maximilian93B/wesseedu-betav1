// lib/supabase/supabaseClient.ts
// This file is used to create a client for the supabase database
// this allows us to use the supabase client in the app

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)


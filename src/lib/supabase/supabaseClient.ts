// lib/supabaseClient.ts

// This file is used to create a client for the supabase database
// this allows us to use the supabase client in the app
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabaseClient = createClientComponentClient();


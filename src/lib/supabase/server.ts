import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'
import type { Database } from '@/lib/supabase/types'


type User = Database['public']['Tables']['users']['Row']

// Create a cached Supabase client
export const createServerClient = cache(() => {
  return createServerComponentClient<Database>({ cookies })
})

// Get the current user with caching
export const getUser = cache(async () => {
  const supabase = createServerClient()
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return profile as User | null
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error fetching user:', err.message)
    } else {
      console.error('Error fetching user:', err)
    }
    return null

  }
})

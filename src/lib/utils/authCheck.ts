import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Utility function to check if a user is authenticated in an API route
 * @returns An object with the authenticated user's session and supabase client, or a NextResponse error if not authenticated
 */
export async function checkAuth() {
  const supabase = createRouteHandlerClient({ cookies })
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      authenticated: false,
      supabase: null,
      session: null
    }
  }
  
  return {
    error: null,
    authenticated: true,
    supabase,
    session
  }
} 
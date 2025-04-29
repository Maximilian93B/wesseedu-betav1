import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import authConfig from '@/config/auth.config'

/**
 * Utility function to check if a user is authenticated in an API route
 * @returns An object with the authenticated user's session and supabase client, or a NextResponse error if not authenticated
 */
export async function checkAuth() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  // In development with auth disabled, bypass authentication
  if (process.env.NODE_ENV === 'development' && !authConfig.isAuthEnabled) {
    console.log('Development mode: Bypassing authentication check');
    
    // Create a mock session with the dev bypass email
    const mockSession = {
      user: {
        id: 'dev-user-id',
        email: authConfig.devBypassEmail,
        role: 'authenticated',
      }
    }
    
    return {
      error: null,
      authenticated: true,
      supabase,
      session: mockSession
    }
  }
  
  try {
    // Check if user is authenticated via session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      return {
        error: null,
        authenticated: true,
        supabase,
        session
      }
    }
    
    // If no session found, return unauthorized error
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      authenticated: false,
      supabase: null,
      session: null
    }
  } catch (error) {
    console.error('Error in checkAuth:', error);
    return {
      error: NextResponse.json({ error: 'Authentication error' }, { status: 401 }),
      authenticated: false,
      supabase: null, 
      session: null
    }
  }
} 
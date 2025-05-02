import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import authConfig from '@/config/auth.config'

// Cache to prevent infinite auth checks in a short period of time
const authFailureCache = {
  lastFailure: 0,
  failureCount: 0,
  COOLDOWN_PERIOD: 5000, // 5 seconds
  MAX_FAILURES: 3, // Maximum failures before starting to throttle
  THROTTLE_PERIOD: 30000, // 30 seconds throttle after reaching max failures
};

/**
 * Utility function to check if a user is authenticated in an API route
 * @returns An object with the authenticated user's session and supabase client, or a NextResponse error if not authenticated
 */
export async function checkAuth() {
  console.log('Starting auth check...');
  
  // First check if we need to throttle due to recent failures
  const now = Date.now();
  const timeSinceLastFailure = now - authFailureCache.lastFailure;
  
  // If we've failed too many times recently, throttle the auth checks
  if (authFailureCache.failureCount >= authFailureCache.MAX_FAILURES && 
      timeSinceLastFailure < authFailureCache.THROTTLE_PERIOD) {
    console.log(`Auth checks throttled due to ${authFailureCache.failureCount} recent failures. ` +
                `Next check available in ${Math.round((authFailureCache.THROTTLE_PERIOD - timeSinceLastFailure)/1000)}s`);
    return {
      error: NextResponse.json({ error: 'Too many auth attempts' }, { status: 429 }),
      authenticated: false,
      supabase: null,
      session: null
    };
  }
  
  // If we had some failures but not enough to trigger throttling, check cooldown
  if (authFailureCache.failureCount > 0 && 
      timeSinceLastFailure < authFailureCache.COOLDOWN_PERIOD) {
    console.log(`Auth check cooling down after failure. Next check in ${Math.round((authFailureCache.COOLDOWN_PERIOD - timeSinceLastFailure)/1000)}s`);
    return {
      error: NextResponse.json({ error: 'Auth check cooling down' }, { status: 429 }),
      authenticated: false,
      supabase: null,
      session: null
    };
  }
  
  // Check if auth bypass is enabled - use a consistent method with the client-side code
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const FORCE_DISABLE_AUTH_DEV = (process.env.FORCE_DISABLE_AUTH_DEV || 'true') === 'true';
  const bypassAuth = NODE_ENV === 'development' && FORCE_DISABLE_AUTH_DEV && !authConfig.isAuthEnabled;
  
  console.log('Auth status:', { 
    env: NODE_ENV, 
    bypassEnabled: bypassAuth, 
    forceDisabled: FORCE_DISABLE_AUTH_DEV,
    authConfig: {
      isAuthEnabled: authConfig.isAuthEnabled,
      hasDevEmail: !!authConfig.devBypassEmail
    }
  });
  
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  // Log cookie existence for debugging 
  const hasSupabaseCookies = cookieStore.getAll().filter(c => 
    c.name.includes('supabase') || 
    c.name.includes('sb-') || 
    c.name.includes('auth')
  );
  
  console.log('Auth cookies present:', hasSupabaseCookies.map(c => c.name).join(', '));
  
  // In development with auth disabled, bypass authentication
  if (bypassAuth) {
    console.log(`Development mode: Bypassing authentication check with email: ${authConfig.devBypassEmail}`);
    
    // Create a mock session with the dev bypass email
    const mockSession = {
      user: {
        id: 'dev-user-id',
        email: authConfig.devBypassEmail,
        role: 'authenticated',
      }
    }
    
    // Reset failure counter on successful auth
    authFailureCache.failureCount = 0;
    
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
      console.log('Auth check succeeded. User authenticated:', session.user.id);
      
      // Reset failure counter on successful auth
      authFailureCache.failureCount = 0;
      
      return {
        error: null,
        authenticated: true,
        supabase,
        session
      }
    }
    
    // Check for auth-specific cookies to help diagnose issues
    console.log('No session found. Checking for specific auth cookies...');
    const sbAccessToken = cookieStore.get('sb-access-token');
    const sbRefreshToken = cookieStore.get('sb-refresh-token');
    
    if (sbAccessToken) {
      console.log('Access token cookie found but no session - possible token issue.');
    }
    
    // If no session found, track the failure and return unauthorized error
    console.log('Auth check failed. No session found.');
    authFailureCache.lastFailure = Date.now();
    authFailureCache.failureCount++;
    console.log(`Auth failures: ${authFailureCache.failureCount}`);
    
    return {
      error: NextResponse.json({ 
        error: 'Unauthorized',
        dev: NODE_ENV === 'development',
        bypassEnabled: bypassAuth,
        hasTokenCookies: !!sbAccessToken 
      }, { status: 401 }),
      authenticated: false,
      supabase: null,
      session: null
    }
  } catch (error) {
    console.error('Error in checkAuth:', error);
    
    // Track the failure
    authFailureCache.lastFailure = Date.now();
    authFailureCache.failureCount++;
    console.log(`Auth failures: ${authFailureCache.failureCount}`);
    
    return {
      error: NextResponse.json({ error: 'Authentication error' }, { status: 401 }),
      authenticated: false,
      supabase: null, 
      session: null
    }
  }
} 
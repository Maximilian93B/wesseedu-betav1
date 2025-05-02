import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * Maximum number of refresh attempts to prevent infinite loops
 */
const MAX_REFRESH_ATTEMPTS = 3;
let refreshAttempts = 0;

/**
 * Refreshes the user's authentication session
 * @returns A boolean indicating whether the refresh was successful
 */
export async function refreshAuthSession(): Promise<boolean> {
  try {
    // Prevent infinite refresh attempts
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      console.warn('Too many auth refresh attempts, aborting to prevent loops');
      return false;
    }
    
    refreshAttempts++;
    console.log(`Refreshing auth session (attempt ${refreshAttempts}/${MAX_REFRESH_ATTEMPTS})`);
    
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error || !data.session) {
      console.error('Failed to refresh session:', error?.message || 'No session returned');
      return false;
    }
    
    // Reset the refresh attempts counter on success
    refreshAttempts = 0;
    
    // Wait a moment to ensure database state is consistent
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return false;
  }
}

/**
 * Checks if the user's session is valid
 * @returns A boolean indicating whether the session is valid
 */
export async function checkAuthSession(): Promise<boolean> {
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error checking session:', error.message);
      return false;
    }
    
    return !!data.session;
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
}

/**
 * Makes an API call to the server to verify session
 * This is useful when you need server-side session validation 
 * @returns Information about the current session
 */
export async function verifyServerSession() {
  try {
    const response = await fetch('/api/auth/check-session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      cache: 'no-store' // Prevent caching for most up-to-date session
    });
    
    if (!response.ok) {
      console.error(`Server session check failed: ${response.status}`);
      return { authenticated: false, session: null };
    }
    
    const data = await response.json();
    
    // Add safety check for multiple profiles returned error
    if (data.error && data.error.includes('PGRST116')) {
      console.error('Multiple profile rows returned, session verification failing safely');
      return { authenticated: false, session: null };
    }
    
    return data.data;
  } catch (error) {
    console.error('Error verifying server session:', error);
    return { authenticated: false, session: null };
  }
}

/**
 * Checks if the user is authenticated
 * First tries client-side check, then falls back to server-side
 * @returns A boolean indicating whether the user is authenticated
 */
export async function isUserAuthenticated(): Promise<boolean> {
  // Try client-side check first
  const clientCheck = await checkAuthSession();
  
  if (clientCheck) {
    return true;
  }
  
  // Fall back to server check
  const serverCheck = await verifyServerSession();
  return serverCheck.authenticated;
}

/**
 * Synchronizes client and server authentication state
 * This is useful to detect and fix mismatches between client and server auth
 */
export async function syncAuthState() {
  try {
    console.log('Syncing client/server auth state');
    const response = await fetch('/api/auth/sync-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`Auth sync failed: ${response.status}`);
      return { 
        synced: false,
        clientAuthenticated: await checkAuthSession(),
        serverAuthenticated: false
      };
    }
    
    const { data } = await response.json();
    const clientAuthenticated = await checkAuthSession();
    
    // Check if client and server auth states match
    const serverAuthenticated = data.authenticated;
    const synced = clientAuthenticated === serverAuthenticated;
    
    if (!synced) {
      console.warn(`Auth state mismatch: client=${clientAuthenticated}, server=${serverAuthenticated}`);
      
      // If server thinks we're authenticated but client disagrees, refresh session
      if (serverAuthenticated && !clientAuthenticated) {
        console.log('Server authenticated but client not, attempting to refresh session');
        const refreshed = await refreshAuthSession();
        return { 
          synced: refreshed, 
          clientAuthenticated: refreshed, 
          serverAuthenticated,
          refreshed
        };
      }
    }
    
    // If server indicates token needs refresh, do it
    if (data.needsRefresh) {
      console.log('Server indicates token needs refresh');
      const refreshed = await refreshAuthSession();
      return {
        synced,
        clientAuthenticated,
        serverAuthenticated,
        refreshed
      };
    }
    
    return { synced, clientAuthenticated, serverAuthenticated };
  } catch (error) {
    console.error('Error syncing auth state:', error);
    return { 
      synced: false, 
      clientAuthenticated: await checkAuthSession(), 
      serverAuthenticated: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 
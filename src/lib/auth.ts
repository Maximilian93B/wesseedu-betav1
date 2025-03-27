import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * Refreshes the user's authentication session
 * @returns A boolean indicating whether the refresh was successful
 */
export async function refreshAuthSession(): Promise<boolean> {
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error || !data.session) {
      console.error('Failed to refresh session:', error?.message || 'No session returned');
      return false;
    }
    
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
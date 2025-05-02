/**
 * Utility function to make authenticated API requests
 * This handles the common pattern of fetching data with authentication
 * and returning a standardized response format
 */
import { refreshAuthSession } from '@/lib/auth';

// Track auth failure timestamps to prevent rapid successive calls
const authFailureCache = new Map<string, number>();
const AUTH_FAILURE_COOLDOWN = 5000; // 5 seconds cooldown
const TOKEN_REFRESH_BUFFER = 300; // Refresh token if less than 5 minutes remaining

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    // Check if this URL has recently failed with auth error
    const now = Date.now();
    const lastFailure = authFailureCache.get(url);
    if (lastFailure && (now - lastFailure) < AUTH_FAILURE_COOLDOWN) {
      console.log(`Skipping request to ${url} - recent auth failure (${Math.round((now - lastFailure) / 1000)}s ago)`);
      return {
        data: null,
        error: "Authorization required",
        status: 401,
      };
    }

    // Check for auth token in localStorage
    let token = null;
    let tokenSource = 'none';
    let tokenExpiresAt = 0;
    let needsRefresh = false;
    
    if (typeof window !== 'undefined') {
      // Try to get the Supabase token from localStorage
      const supabaseAuthData = localStorage.getItem('supabase.auth.token');
      if (supabaseAuthData) {
        try {
          const parsedData = JSON.parse(supabaseAuthData);
          token = parsedData?.currentSession?.access_token;
          tokenExpiresAt = parsedData?.currentSession?.expires_at;
          
          if (token) {
            tokenSource = 'localStorage';
            console.log(`Auth token found in localStorage for: ${url}`);
            
            // Check if token is expiring soon
            const currentTime = Math.floor(Date.now() / 1000);
            const timeRemaining = tokenExpiresAt - currentTime;
            
            if (timeRemaining < TOKEN_REFRESH_BUFFER) {
              console.log(`Token expires in ${timeRemaining}s, needs refresh`);
              needsRefresh = true;
            }
          }
        } catch (e) {
          console.error('Error parsing auth data:', e);
        }
      }
      
      // If token not found in primary location, try alternate storage
      if (!token) {
        // Try to get from session storage
        const sessionAuthData = sessionStorage.getItem('supabase.auth.token');
        if (sessionAuthData) {
          try {
            const parsedSessionData = JSON.parse(sessionAuthData);
            token = parsedSessionData?.currentSession?.access_token;
            tokenExpiresAt = parsedSessionData?.currentSession?.expires_at;
            
            if (token) {
              tokenSource = 'sessionStorage';
              console.log(`Auth token found in sessionStorage for: ${url}`);
              
              // Check if token is expiring soon
              const currentTime = Math.floor(Date.now() / 1000);
              const timeRemaining = tokenExpiresAt - currentTime;
              
              if (timeRemaining < TOKEN_REFRESH_BUFFER) {
                console.log(`Token expires in ${timeRemaining}s, needs refresh`);
                needsRefresh = true;
              }
            }
          } catch (e) {
            console.error('Error parsing session auth data:', e);
          }
        }
      }
      
      // Attempt to refresh token if needed and not for auth-related endpoints
      if (needsRefresh && !url.includes('/api/auth/')) {
        console.log('Attempting to refresh auth session before request');
        try {
          const refreshed = await refreshAuthSession();
          if (refreshed) {
            console.log('Auth session refreshed successfully');
            
            // Re-fetch token after refresh
            if (tokenSource === 'localStorage') {
              const refreshedData = localStorage.getItem('supabase.auth.token');
              if (refreshedData) {
                const parsedRefreshed = JSON.parse(refreshedData);
                token = parsedRefreshed?.currentSession?.access_token;
              }
            } else if (tokenSource === 'sessionStorage') {
              const refreshedData = sessionStorage.getItem('supabase.auth.token');
              if (refreshedData) {
                const parsedRefreshed = JSON.parse(refreshedData);
                token = parsedRefreshed?.currentSession?.access_token;
              }
            }
          } else {
            console.warn('Auth session refresh failed');
          }
        } catch (error) {
          console.error('Error refreshing auth session:', error);
        }
      }
    }

    console.log(`Making authenticated request to ${url} with token: ${token ? 'present' : 'missing'} (source: ${tokenSource})`);

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        // Include authorization header if token exists
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      credentials: 'include', // Important for including cookies
    });

    // Log response status
    console.log(`Response from ${url}: status ${response.status}`);

    if (!response.ok) {
      // Special handling for 401 unauthorized errors
      if (response.status === 401) {
        console.warn('Unauthorized request to:', url);
        
        // If this was after a token refresh attempt, something is wrong with auth system
        if (needsRefresh) {
          console.error('Still unauthorized after token refresh attempt');
        }
        
        // Store failure timestamp to prevent rapid retries
        authFailureCache.set(url, Date.now());
        
        return {
          data: null,
          error: "Unauthorized",
          status: response.status,
        };
      }

      // For other errors, try to parse the error message
      const errorData = await response.json().catch(() => ({}));
      console.error(`Request failed for ${url}:`, errorData);
      return {
        data: null,
        error: errorData.error || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      data: data.data || data, // Handle both {data: ...} and direct data formats
      error: null,
      status: response.status,
    };
  } catch (error) {
    console.error(`Error in fetchWithAuth for ${url}:`, error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
    };
  }
} 
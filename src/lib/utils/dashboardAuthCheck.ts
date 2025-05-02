import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface DashboardAuthCheckResult {
  isAuthorized: boolean;
  redirectUrl: string | null;
  message: string | null;
}

/**
 * Utility to consistently check auth state for dashboard pages
 * Provides a standard approach for auth checks across all dashboard pages
 */
export function useDashboardAuthCheck() {
  const { toast } = useToast();
  
  /**
   * Check if the current user is authorized for a dashboard page
   * @param user The current user object from useAuth
   * @param loading Whether auth state is still loading
   * @returns Auth check result with authorization status and redirect info
   */
  const checkAuth = (user: User | null, loading: boolean): DashboardAuthCheckResult => {
    // Still loading, so we can't determine auth state yet
    if (loading) {
      return {
        isAuthorized: false,
        redirectUrl: null,
        message: null
      };
    }
    
    // User is not authenticated
    if (!user) {
      return {
        isAuthorized: false,
        redirectUrl: '/auth/login',
        message: 'Authentication required to access this page'
      };
    }
    
    // Check if token is about to expire (if we can access expiry info)
    if (user.app_metadata?.provider === 'email') {
      // We could add token expiry checks here if needed
      // This would need token expiry info from the auth context
    }
    
    // User is authorized
    return {
      isAuthorized: true,
      redirectUrl: null,
      message: null
    };
  };
  
  /**
   * Handle auth errors by showing a toast and returning redirect info
   * @param message Error message to display
   * @returns Redirect URL for the login page
   */
  const handleAuthError = (message: string = 'Session expired. Please sign in again.'): string => {
    toast({
      title: 'Authentication Required',
      description: message,
      variant: 'destructive',
    });
    
    return '/auth/login';
  };
  
  return {
    checkAuth,
    handleAuthError
  };
}

/**
 * Helper function to check if the current user is authorized for a dashboard page
 * To be used with the unified useAuth hook
 * 
 * @param user The current user object from useAuth
 * @param loading Whether auth state is still loading
 * @returns Auth check result with authorization status and redirect info
 */
export function checkDashboardAuth(user: User | null, loading: boolean): DashboardAuthCheckResult {
  // Still loading, so we can't determine auth state yet
  if (loading) {
    return {
      isAuthorized: false,
      redirectUrl: null,
      message: null
    };
  }
  
  // User is not authenticated
  if (!user) {
    return {
      isAuthorized: false,
      redirectUrl: '/auth/login',
      message: 'Authentication required to access this page'
    };
  }
  
  // User is authorized
  return {
    isAuthorized: true,
    redirectUrl: null,
    message: null
  };
} 
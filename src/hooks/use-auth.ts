import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { useAuth as useAuthContext } from '@/context/AuthContext';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/index',
  '/about',
  '/contact',
  '/marketing',
  '/unauthorized',
  '/auth/login',
  '/auth/signin',
  '/auth/signup',
  '/auth/callback',
  '/auth/confirmation',
  '/auth/verification',
  '/auth/reset-password',
  '/onboarding'
];

interface LoginCredentials {
  email: string;
  password: string;
  onSuccess?: () => void;
}

interface UseAuthOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  checkOnMount?: boolean;
}

/**
 * Unified auth hook that combines functionality from use-auth-guard, use-login and dashboardAuthCheck
 */
export function useAuth(options: UseAuthOptions = {}) {
  const {
    redirectTo = '/auth/signin',
    requireAuth = true,
    checkOnMount = true
  } = options;
  
  const authContext = useAuthContext();
  const { user, loading, signOut } = authContext;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Derive isAuthenticated from user
  const isAuthenticated = !!user;

  /**
   * Handle authentication errors
   */
  const handleAuthError = useCallback((message: string = 'Session expired. Please sign in again.', options?: { redirect?: string }) => {
    toast({
      title: "Authentication Error",
      description: message,
      variant: "destructive",
    });
    
    signOut();
    
    if (options?.redirect) {
      router.push(options.redirect);
    }
  }, [toast, signOut, router]);

  /**
   * Check if user is authorized for current route
   */
  const checkAuthStatus = useCallback(() => {
    // Skip if still loading
    if (loading) return;

    // Check if current route is public
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname?.startsWith(route));

    // If authentication is required and user is not authenticated
    if (requireAuth && !isAuthenticated && !isPublicRoute) {
      // Create URL with return path for after login
      const returnPath = encodeURIComponent(pathname || '/');
      router.push(`${redirectTo}?returnTo=${returnPath}`);
      
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
    }
  }, [loading, pathname, requireAuth, isAuthenticated, router, redirectTo, toast]);

  /**
   * Login function
   */
  const login = useCallback(async ({ email, password, onSuccess }: LoginCredentials) => {
    setLoginLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Login failed');
      }

      // Call onSuccess callback if provided
      onSuccess?.();
      
      // Use the redirectUrl from API response or fallback to returnUrl from URL params
      const redirectUrl = data.redirectUrl || searchParams.get('returnTo') || '/dashboard/home';
      
      console.log(`useAuth: Login successful, redirecting to: ${redirectUrl}`);
      // Use window.location.href for full page navigation to ensure cookies are preserved
      window.location.href = redirectUrl;
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoginLoading(false);
    }
  }, [searchParams, toast]);

  // Run auth check on mount if required
  useEffect(() => {
    if (checkOnMount) {
      checkAuthStatus();
    }
  }, [loading, isAuthenticated, pathname, requireAuth, checkAuthStatus, checkOnMount]);

  return {
    ...authContext,
    isAuthenticated,
    handleAuthError,
    checkAuthStatus,
    login,
    loginLoading
  };
} 
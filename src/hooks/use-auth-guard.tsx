import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/index',
  '/about',
  '/contact',
  '/marketing',
  '/unauthorized',
  '/auth/login',
  '/auth/signup',
  '/auth/callback',
  '/auth/confirmation',
  '/auth/verification',
  '/auth/reset-password',
  '/onboarding'
];

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * Hook to handle authentication state for components
 * Navigates to login page if user is not authenticated and page requires auth
 */
export function useAuthGuard({
  redirectTo = '/auth/login',
  requireAuth = true,
}: UseAuthGuardOptions = {}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip if still loading
    if (loading) return;

    // Check if current route is public
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname?.startsWith(route));

    // If authentication is required and user is not authenticated
    if (requireAuth && !isAuthenticated && !isPublicRoute) {
      // Create URL with return path for after login
      const returnPath = encodeURIComponent(pathname || '/');
      router.push(`${redirectTo}?returnTo=${returnPath}`);
    }
  }, [loading, isAuthenticated, pathname, redirectTo, requireAuth, router, user]);

  return { 
    isAuthenticated, 
    isLoading: loading,
    user
  };
} 
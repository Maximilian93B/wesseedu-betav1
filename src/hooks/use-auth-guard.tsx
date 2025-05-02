/**
 * @deprecated Use the unified useAuth hook instead with appropriate options
 * Example: import { useAuth } from '@/hooks/use-auth';
 *          const { isAuthenticated, isLoading, user } = useAuth({ requireAuth: true });
 */

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

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

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * @deprecated Use useAuth from @/hooks/use-auth instead
 */
export function useAuthGuard({
  redirectTo = '/auth/signin',
  requireAuth = true,
}: UseAuthGuardOptions = {}) {
  console.warn(
    '[DEPRECATED] useAuthGuard is deprecated. Use the unified useAuth hook instead.\n' +
    'Example: const { isAuthenticated, isLoading, user } = useAuth({ requireAuth: true });'
  );
  
  const { isAuthenticated, isLoading, user, checkAuthStatus } = useAuth({
    redirectTo,
    requireAuth,
    checkOnMount: false
  });
  const pathname = usePathname();

  useEffect(() => {
    checkAuthStatus();
  }, [isAuthenticated, pathname, isLoading]);

  return { 
    isAuthenticated, 
    isLoading, 
    user
  };
} 
/**
 * @deprecated Use the unified useAuth hook instead which includes login functionality
 * Example: import { useAuth } from '@/hooks/use-auth';
 *          const { login, loginLoading } = useAuth();
 */

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from './use-toast'
import { useAuth } from './use-auth'

interface LoginCredentials {
  email: string
  password: string
  onSuccess?: () => void
}

/**
 * @deprecated Use the unified useAuth hook instead which includes login functionality
 */
export function useLogin() {
  console.warn(
    '[DEPRECATED] useLogin is deprecated. Use the unified useAuth hook instead.\n' +
    'Example: const { login, loginLoading } = useAuth();'
  );
  
  const { login, loginLoading: loading } = useAuth();
  
  return { login, loading };
} 
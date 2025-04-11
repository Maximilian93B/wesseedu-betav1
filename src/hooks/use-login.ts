import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from './use-toast'

interface LoginCredentials {
  email: string
  password: string
  onSuccess?: () => void
}

/**
 * A lightweight hook for handling login in components other than the main login page.
 * The main login page should implement its own logic to avoid duplication.
 * This hook is kept for backward compatibility with other components that might use it.
 */
export function useLogin() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const login = async ({ email, password, onSuccess }: LoginCredentials) => {
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Login failed')
      }

      // Call onSuccess callback if provided
      onSuccess?.()
      
      // Use the redirectUrl from API response or fallback to returnUrl from URL params
      const redirectUrl = data.redirectUrl || searchParams.get('returnUrl') || '/auth/home'
      
      router.push(redirectUrl)
      router.refresh()
      
      return data
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
} 
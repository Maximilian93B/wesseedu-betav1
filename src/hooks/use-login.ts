import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from './use-toast'

interface LoginCredentials {
  email: string
  password: string
  onSuccess?: () => void
}

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

<<<<<<< HEAD
      onSuccess?.()

      if (!data.hasProfile) {
        router.push('/auth/profile-create')
      } else {
        const returnUrl = searchParams.get('returnUrl') || '/auth/home'
        router.push(returnUrl)
=======
      if (onSuccess) {
        onSuccess()
>>>>>>> a47a78bfd7a56499cdb0752c8c49f1c28cf56a50
      }

      const redirectUrl = data.redirectUrl || searchParams.get('returnUrl') || '/auth/home'
      
      console.log("Redirecting to:", redirectUrl)
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
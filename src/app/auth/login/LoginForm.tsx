'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const searchParams = new URLSearchParams(window.location.search)
  const error = searchParams.get('error')
  const redirectedFrom = searchParams.get('redirectedFrom')

  useEffect(() => {
    // Check if user is locked out
    const lockoutUntil = localStorage.getItem('loginLockoutUntil')
    if (lockoutUntil && Number(lockoutUntil) > Date.now()) {
      setLoading(true)
      const remainingTime = Math.ceil((Number(lockoutUntil) - Date.now()) / 1000 / 60)
      toast({
        title: "Account Locked",
        description: `Too many login attempts. Please try again in ${remainingTime} minutes.`,
        variant: "destructive",
      })
    }
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check lockout
    const lockoutUntil = localStorage.getItem('loginLockoutUntil')
    if (lockoutUntil && Number(lockoutUntil) > Date.now()) {
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Reset attempts on successful login
      localStorage.removeItem('loginLockoutUntil')

      // Refresh the page to update server-side session
      router.refresh()
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
        {error === 'unauthorized' && (
          <div className="mt-2 text-sm text-red-500">
            Please log in to access {redirectedFrom || 'this page'}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </CardFooter>
    </Card>
  )
}


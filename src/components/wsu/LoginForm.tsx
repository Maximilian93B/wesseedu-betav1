'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLogin } from '@/hooks/use-login'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight } from "lucide-react"

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login, loading } = useLogin()
  
  // Generate ID once when component mounts, not on every render
  const formId = useState(() => Math.random().toString(36).substr(2, 9))[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      await login({ email, password, onSuccess })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-[#14B8A6]/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Welcome Back to{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
            WeSeedU
          </span>
        </CardTitle>
        <CardDescription className="text-white/70">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border border-red-500/20 bg-red-500/10 backdrop-blur-sm">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor={`email-${formId}`} className="text-white">Email</Label>
              <Input
                id={`email-${formId}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400/50 focus:ring-teal-400/20"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`password-${formId}`} className="text-white">Password</Label>
              <Input
                id={`password-${formId}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400/50 focus:ring-teal-400/20"
                placeholder="••••••••"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading}
            className="w-full group relative text-white border-white/20 hover:border-white/40 
              backdrop-blur-sm px-6 py-2 h-auto
              bg-gradient-to-r from-teal-500/50 to-purple-500/50
              hover:from-teal-500/60 hover:to-purple-500/60
              shadow-lg shadow-teal-500/10
              hover:shadow-teal-500/20
              transition-all duration-300 ease-in-out
              disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Log in <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}


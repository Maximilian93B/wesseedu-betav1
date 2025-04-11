"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, Mail, Lock, Leaf } from "lucide-react"
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  // Generate ID once when component mounts
  const formId = useState(() => Math.random().toString(36).substr(2, 9))[0];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
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
      
      // Use the redirectUrl from API response or fallback to returnUrl
      const redirectUrl = data.redirectUrl || searchParams.get('returnUrl') || '/auth/home'
      
      router.push(redirectUrl)
      router.refresh()
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Failed to login. Please try again.')
      toast({
        title: "Login Failed",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Green Background with image as centerpiece */}
      <div 
        className="hidden md:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundImage: "linear-gradient(115deg, #70f570, #49c628)"
        }}
      >
        
        {/* Simple decorative glow behind the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-white/10 blur-[100px]"></div>
        
        {/* Large faded header text with radiant glow */}
        <div className="absolute top-0 left-0 right-0 text-center z-10 pt-8">
          {/* Glow effect behind text */}
          <div className="absolute inset-0 w-full h-full flex justify-center">
            <div className="w-3/4 h-16 bg-white/60 blur-[50px] rounded-full"></div>
          </div>
          
          <h1 className="text-[8rem] font-bold tracking-tighter leading-none relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] via-white/80 to-white/5 drop-shadow-md">
              WeSeedU
            </span>
          </h1>
        </div>
        
        {/* Featured centerpiece image - larger and more prominent */}
        <div className="relative w-[85%] h-[60%] flex items-center justify-center z-20">

          <Image 
            src="/savings-jar.png" 
            alt="WeSeedU 3D Illustration" 
            fill
            style={{ 
              objectFit: 'contain',
              objectPosition: 'center'
            }}
            priority
            className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Simple bottom tagline */}
        <div className="absolute bottom-[8%] left-0 right-0 text-center z-10">
          <p className="text-white text-2xl font-medium px-4 drop-shadow-sm">
            Sustainable investing for a better future
          </p>
        </div>
      </div>
      
      {/* Right side - Login Form in a modern 3D card */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 lg:p-10">
        <div className="w-full max-w-md">
          {/* Mobile-only logo - outside card */}
          <div className="flex flex-col items-center mb-8 md:hidden">
            <div className="p-3.5 rounded-full bg-gradient-to-r from-[#70f570] to-[#49c628] shadow-lg mb-4">
              <Leaf className="h-9 w-9 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">WeSeedU</h2>
          </div>
          
          {/* 3D Modern Card Container with Enhanced Shadows */}
          <div className="relative transform transition-all duration-500 
            rounded-2xl overflow-hidden
            shadow-[0_8px_30px_rgba(0,0,0,0.04),_0_4px_8px_rgba(0,0,0,0.02)]
            hover:shadow-[0_30px_60px_rgba(0,0,0,0.12),_0_8px_25px_rgba(0,0,0,0.08),_0_4px_12px_rgba(73,198,40,0.05)]
            border border-gray-100
            group">
            
            {/* Card Background with Gradient and Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
            
            {/* Subtle Dot Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" 
              style={{
                backgroundImage: `radial-gradient(circle at 15px 15px, black 1px, transparent 0)`,
                backgroundSize: "30px 30px"
              }}>
            </div>
            
            {/* Top Edge Highlight - Enhanced */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
            
            {/* Side Edge Highlights - New */}
            <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-white/50 via-transparent to-transparent"></div>
            <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-white/50 via-transparent to-transparent"></div>
            
            {/* Bottom Edge Shadow - New */}
            <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-slate-200/30"></div>
            
            {/* 3D Shadow Effects - Enhanced with Positioning */}
            <div className="absolute -left-40 -top-40 w-80 h-80 bg-green-50/80 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-700"></div>
            <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-blue-50/80 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-700"></div>
            
            {/* Subtle Inner Shadow - New */}
            <div className="absolute inset-0 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] rounded-2xl pointer-events-none"></div>
            
            {/* White Overlay for Depth Effect - New */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl"></div>
            
            {/* Hover Interactive Effects - New */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
            
            {/* Card Content */}
            <div className="relative p-8 md:p-10">
              {/* Enhanced header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-2">Log in to your account</h2>
              </div>
              
              {/* Improved Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border border-red-500/20 bg-red-50 text-red-700 rounded-lg">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Label 
                      htmlFor={`email-${formId}`} 
                      className="text-gray-700 font-medium block mb-1.5"
                    >
                      Email address
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500">
                        <Mail className="h-[18px] w-[18px]" />
                      </div>
                      <Input
                        id={`email-${formId}`}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-11 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-green-500/10 text-gray-800 placeholder:text-gray-400 rounded-xl shadow-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label htmlFor={`password-${formId}`} className="text-gray-700 font-medium">Password</Label>
                      <a href="/auth/forgot-password" className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500">
                        <Lock className="h-[18px] w-[18px]" />
                      </div>
                      <Input
                        id={`password-${formId}`}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-11 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-green-500/10 text-gray-800 placeholder:text-gray-400 rounded-xl shadow-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 group relative
                    bg-gradient-to-r from-[#70f570] to-[#49c628] 
                    text-white font-medium text-lg
                    shadow-[0_4px_10px_rgba(73,198,40,0.2)]
                    hover:shadow-[0_6px_15px_rgba(73,198,40,0.3)] 
                    transition-all duration-300 ease-out 
                    hover:translate-y-[-2px] rounded-xl
                    disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Sign in <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
                
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200/70"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gradient-to-b from-white to-gray-50 text-gray-500">or</span>
                  </div>
                </div>
              
                {/* Improved account creation link */}
                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    Don't have an account?
                  </p>
                  <a 
                    href="/auth/register" 
                    className="inline-flex items-center justify-center text-green-600 hover:text-green-700 font-medium hover:underline"
                  >
                    Create an account <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </form>
            </div>
          </div>
          
          {/* Enhanced footer - outside card */}
          <div className="pt-6 mt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              Need help? <a href="/contact" className="text-green-600 hover:text-green-700 font-medium">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


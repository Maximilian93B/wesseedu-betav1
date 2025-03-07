'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, Zap, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import LoginForm from "@/components/wsu/LoginForm"
import { useLogin } from '@/hooks/use-login'


export function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { loading } = useLogin()
  const spotlightRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Spotlight effect
  useEffect(() => {
    if (!spotlightRef.current || !logoRef.current || !navRef.current) return
    
    // Hide spotlight initially
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0'
    }
    
    // Position spotlight based on mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || !spotlightRef.current) return
      
      const navRect = navRef.current?.getBoundingClientRect()
      const x = e.clientX
      const y = e.clientY
      
      if (navRect) {
        // More concentrated spotlight with sharper falloff
        spotlightRef.current.style.background = `
          radial-gradient(
            circle 100px at ${x}px ${y}px, 
            rgba(52, 211, 153, 0.15) 0%, 
            rgba(52, 211, 153, 0.05) 40%, 
            transparent 60%
          )
        `
        spotlightRef.current.style.opacity = '1'
      }
    }
    
    // Add mouse move event listener
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovering])

  const handleLoginSuccess = () => {
    setIsLoginOpen(false)
  }

  // Move the Dialog definition here
  const loginDialog = (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold 
            shadow-md hover:shadow-emerald-500/25 transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-emerald-500/20">
        <DialogTitle className="sr-only">Login Form</DialogTitle>
        <DialogDescription className="sr-only">
          Enter your credentials to log in to your account
        </DialogDescription>
        <LoginForm onSuccess={handleLoginSuccess} />
      </DialogContent>
    </Dialog>
  );

  return (
    <nav 
      ref={navRef}
      className="w-full z-50 backdrop-blur-sm bg-black/20 relative border-b border-emerald-500/10 sticky top-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        // Hide spotlight when not hovering
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = '0'
        }
      }}
    >
      {/* Spotlight effect overlay */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle 100px at 50% 50%, rgba(52, 211, 153, 0.15) 0%, rgba(52, 211, 153, 0.05) 40%, transparent 60%)',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between md:justify-center h-20 relative">
          <div className="flex items-center md:absolute md:left-0">
            <Link href="/" className="flex items-center group">
              <Zap className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <div ref={logoRef} className="ml-2 text-xl font-bold flex">
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  We
                </span>
                <span className="seed-text bg-gradient-to-r from-white to-white bg-clip-text text-transparent relative">
                  Seed
                  {/* Subtle glow effect for the Seed text */}
                  <span className="absolute inset-0 blur-sm bg-white/10 opacity-50 rounded-full" />
                </span>
                <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  U
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300" asChild>
              <Link href="/mobile-first-weSeedU">The Platform</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300" asChild>
              <Link href="/solutions">Solutions</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
          
          {/* Login button - positioned to the right on desktop */}
          <div className="hidden md:block md:absolute md:right-0">
            {loginDialog}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-emerald-500/10">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 justify-start" asChild>
              <Link href="/mobile-first-weSeedU">The Platform</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 justify-start" asChild>
              <Link href="/solutions">Solutions</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 justify-start" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 justify-start" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <div className="pt-2">
              {loginDialog}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}


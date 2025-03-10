'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, Zap, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import LoginForm from "@/components/wsu/LoginForm"
import { useLogin } from '@/hooks/use-login'

// Define the props for the Navigation component
interface NavigationProps {
  scrollToSection?: (sectionId: string) => void;
  currentPath?: string;
}

export function Navigation({ scrollToSection, currentPath = '/' }: NavigationProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { loading } = useLogin()
  const spotlightRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
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
    
    // Close sidebar when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isHovering, isSidebarOpen])

  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [isSidebarOpen])

  const handleLoginSuccess = () => {
    setIsLoginOpen(false)
  }

  // Handle section navigation
  const handleSectionClick = (sectionId: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId)
      setIsSidebarOpen(false) // Close sidebar after navigation
    }
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

  // Section navigation links component
  const sectionLinks = currentPath === '/' ? (
    <>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start"
        onClick={() => handleSectionClick('hero-section')}
      >
        Home
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start"
        onClick={() => handleSectionClick('impact-section')}
      >
        Impact
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start"
        onClick={() => handleSectionClick('card-section')}
      >
        Features
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start"
        onClick={() => handleSectionClick('partners-section')}
      >
        Partners
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start"
        onClick={() => handleSectionClick('solution-section')}
      >
        Solutions
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start"
        onClick={() => handleSectionClick('features-section')}
      >
        Key Features
      </Button>
    </>
  ) : null;

  // Page navigation links component
  const navigationLinks = (
    <>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start" 
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/mobile-first-weSeedU">The Platform</Link>
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start" 
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/solutions">Solutions</Link>
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start" 
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/about">About</Link>
      </Button>
      <Button 
        variant="ghost" 
        className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start" 
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/contact">Contact</Link>
      </Button>
    </>
  )

  return (
    <>
      {/* Main navigation bar */}
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
          <div className="flex items-center justify-between h-20 relative">
            {/* Logo */}
            <div className="flex items-center">
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

            {/* Menu toggle button */}
            <Button 
              variant="ghost" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            
            {/* Login button - visible on desktop navbar */}
            <div className="hidden md:block">
              {loginDialog}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-black/90 backdrop-blur-md z-50 border-r border-emerald-500/20 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex flex-col gap-4">
          {/* Close sidebar button - visible on mobile only */}
          <div className="flex justify-end md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSidebarOpen(false)} 
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 p-1"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Navigation links */}
          <div className="space-y-2 mt-6">
            {/* If we're on the home page, show section links */}
            {currentPath === '/' && (
              <div className="mb-8">
                <h3 className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-3">
                  Page Sections
                </h3>
                <div className="space-y-2">
                  {sectionLinks}
                </div>
              </div>
            )}
            
            <h3 className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-3">
              Main Navigation
            </h3>
            {navigationLinks}
          </div>
          
          {/* Login button in sidebar */}
          <div className="mt-8">
            {loginDialog}
          </div>
        </div>
      </div>
    </>
  )
}


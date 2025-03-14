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
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false);

  // Detect scrolling to adjust nav appearance
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSidebarOpen])

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
        className={`w-full z-50 fixed top-0 transition-all duration-300 ${
          hasScrolled 
            ? 'backdrop-blur-md bg-black/30 border-b border-emerald-500/20' 
            : 'backdrop-blur-sm bg-black/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Zap className="w-6 h-6 text-emerald-400" />
                <div className="ml-2 text-xl font-bold flex">
                  <span className="text-emerald-400">We</span>
                  <span className="text-white">Seed</span>
                  <span className="text-emerald-400">U</span>
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
        className={`fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md z-50 border-l border-emerald-500/20 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex flex-col gap-4">
          {/* Close sidebar button */}
          <div className="flex justify-end">
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
          <div className="space-y-2 mt-4">
            {/* If we're on the home page, show section links */}
            {currentPath === '/' && (
              <div className="mb-6">
                <h3 className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-2">
                  Page Sections
                </h3>
                <div className="space-y-1">
                  {sectionLinks}
                </div>
              </div>
            )}
            
            <h3 className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-2">
              Main Navigation
            </h3>
            {navigationLinks}
          </div>
          
          {/* Login button in sidebar */}
          <div className="mt-6">
            {loginDialog}
          </div>
        </div>
      </div>
    </>
  )
}


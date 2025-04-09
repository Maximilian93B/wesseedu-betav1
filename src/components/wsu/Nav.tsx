'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, Zap, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import LoginForm from "@/components/wsu/LoginForm"
import { useLogin } from '@/hooks/use-login'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { SectionNav, SectionLinks } from './SectionNav'
import { motion, AnimatePresence } from "framer-motion"

// Define the props for the Navigation component
interface MainNavProps {
  currentPath?: string;
}

export function MainNav({ currentPath = '/' }: MainNavProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { loading } = useLogin()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');
  const [showSectionNav, setShowSectionNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Simple, optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Basic scroll detection
      setHasScrolled(currentScrollY > 10);
      
      // Simple check - hide on scroll down, show on scroll up or top
      if (currentScrollY > 80) {
        setShowSectionNav(currentScrollY <= lastScrollY);
      } else {
        setShowSectionNav(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

  // Handle section navigation for sidebar
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsSidebarOpen(false); // Close sidebar after navigation
    }
  };

  // Login dialog component
  const loginDialog = (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-black hover:bg-gray-800 text-white font-semibold 
            shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] 
            transition-all duration-300 hover:translate-y-[-2px] rounded-full py-2 px-6 
            hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border-gray-200 rounded-2xl">
        <DialogTitle className="sr-only">Login Form</DialogTitle>
        <DialogDescription className="sr-only">
          Enter your credentials to log in to your account
        </DialogDescription>
        <LoginForm onSuccess={handleLoginSuccess} />
      </DialogContent>
    </Dialog>
  );

  // Get Started button
  const getStartedButton = (
    <Button 
      className="bg-white hover:bg-gray-100 text-black font-semibold 
        shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] 
        transition-all duration-300 hover:translate-y-[-2px] rounded-full py-2 px-6 
        hover:scale-105 border border-gray-200"
      asChild
    >
      <Link href="/auth/signup">Get Started</Link>
    </Button>
  );

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
        className={`w-full z-50 fixed top-0 transition-all duration-300 px-2 sm:px-4 md:px-6 ${
          hasScrolled 
            ? 'backdrop-blur-md bg-white/95 border-b border-green-500/20 shadow-[0_8px_25px_rgba(0,0,0,0.1)] dark:bg-white/90 dark:border-green-500/10 rounded-b-2xl' 
            : 'backdrop-blur-sm bg-white/90 dark:bg-white/85 rounded-b-3xl'
        }`}
        style={{ 
          backgroundImage: 'linear-gradient(to right top, rgba(255,255,255,0.98), rgba(255,255,255,0.9))',
          boxShadow: '0 8px 30px rgba(73, 198, 40, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="p-2 bg-green-100 rounded-full transition-all duration-300 group-hover:scale-110">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-2 text-xl font-bold flex">
                  <span className="text-green-600">We</span>
                  <span className="text-green-800 dark:text-green-700">Seed</span>
                  <span className="text-green-600">U</span>
                </div>
              </Link>
            </div>

            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              {getStartedButton}
              <div className="h-6 w-px bg-gray-300/50 mx-1"></div>
              {loginDialog}
            </div>

            {/* Menu toggle button */}
            <Button 
              variant="ghost" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="text-green-700 hover:text-green-600 hover:bg-green-50 md:hidden p-3 rounded-full border border-green-500/30 hover:scale-110 transition-all duration-300"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Divider with simple conditional visibility */}
        {currentPath === '/' && (
          <div 
            className={`hidden md:block relative transition-opacity duration-300 ${
              showSectionNav ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Simplified divider effect - fewer elements */}
            <div 
              className="w-full h-[1px] bg-black/5"
              style={{
                boxShadow: '0 0.5px 2px rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            ></div>
            <div 
              className="w-full h-[1px] bg-white/30 absolute top-[1px] left-0"
            ></div>
          </div>
        )}
        
        {/* SectionNav with simple CSS transitions */}
        {currentPath === '/' && (
          <div 
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out origin-top ${
              showSectionNav 
                ? 'opacity-100 transform-none' 
                : 'opacity-0 transform -translate-y-4 pointer-events-none h-0 overflow-hidden'
            }`}
          >
            <SectionNav />
          </div>
        )}
      </nav>

      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 dark:bg-black/50 dark:backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-md z-50 
          border-l border-green-500/20 transform transition-transform duration-300 ease-in-out 
          rounded-l-3xl shadow-[-8px_0_30px_rgba(73,198,40,0.1)] ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex flex-col gap-4">
          {/* Close sidebar button */}
          <div className="flex justify-between items-center">
            <ThemeToggle className="ml-1" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSidebarOpen(false)} 
              className="text-green-600 hover:text-green-500 hover:bg-green-50 p-2 rounded-full 
                hover:scale-110 transition-all duration-300"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Navigation links */}
          <div className="mt-4 flex flex-col gap-2">
            {/* If we're on the home page, show section links */}
            {currentPath === '/' && (
              <SectionLinks 
                activeSection={activeSection} 
                handleSectionClick={handleSectionClick} 
              />
            )}
            
            <h3 className="text-green-600 text-sm font-medium uppercase tracking-wider mb-3 pl-2">
              Main Navigation
            </h3>
            {navigationLinks}
          </div>
          
          {/* Login button in sidebar */}
          <div className="mt-6 flex flex-col space-y-3">
            {getStartedButton}
            <div className="h-px w-full bg-gray-200 my-1"></div>
            {loginDialog}
          </div>
        </div>
      </div>
    </>
  )
}


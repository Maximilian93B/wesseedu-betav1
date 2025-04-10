'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, Zap, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import LoginForm from "@/components/wsu/LoginForm"
import { useLogin } from '@/hooks/use-login'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { SectionNav, SectionLinks } from '@/components/wsu/SectionNav'

// Define the props for the Navigation component
interface MainNavProps {
  currentPath?: string;
}

// Extracted common styles
const styles = {
  brandLink: "flex items-center group",
  brandIcon: "p-2 bg-green-100 rounded-full transition-all duration-300 group-hover:scale-110",
  mainButton: "transition-all duration-300 hover:translate-y-[-2px] rounded-full py-2 px-6 hover:scale-105",
  getStartedButton: "bg-white hover:bg-gray-100 text-black font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-gray-200",
  loginButton: "bg-black hover:bg-gray-800 text-white font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]",
  menuToggle: "text-green-700 hover:text-green-600 hover:bg-green-50 md:hidden p-3 rounded-full border border-green-500/30 hover:scale-110 transition-all duration-300",
  sidebarLink: "text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all duration-300 w-full justify-start"
}

// Throttle function to limit execution frequency
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
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

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(throttle(() => {
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
  }, 100), [lastScrollY]);
  
  // Set up optimized scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

  // Extracted components for better readability
  const renderLoginDialog = () => (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <Button 
          className={`${styles.mainButton} ${styles.loginButton}`}
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

  const renderGetStartedButton = () => (
    <Button 
      className={`${styles.mainButton} ${styles.getStartedButton}`}
      asChild
    >
      <Link href="/auth/signup">Get Started</Link>
    </Button>
  );

  const renderNavigationLinks = () => (
    <>
      <Button 
        variant="ghost" 
        className={styles.sidebarLink}
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/mobile-first-weSeedU">The Platform</Link>
      </Button>
      <Button 
        variant="ghost" 
        className={styles.sidebarLink}
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/solutions">Solutions</Link>
      </Button>
      <Button 
        variant="ghost" 
        className={styles.sidebarLink} 
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/about">About</Link>
      </Button>
      <Button 
        variant="ghost" 
        className={styles.sidebarLink}
        asChild
        onClick={() => setIsSidebarOpen(false)}
      >
        <Link href="/contact">Contact</Link>
      </Button>
    </>
  );

  // Navigation bar style with memoization to prevent recalculation on each render
  const navbarStyle = {
    backgroundImage: 'linear-gradient(to right top, rgba(255,255,255,0.98), rgba(255,255,255,0.9))',
    boxShadow: '0 8px 30px rgba(73, 198, 40, 0.1)'
  };

  return (
    <>
      {/* Main navigation bar */}
      <nav 
        className={`w-full z-50 fixed top-0 transition-all duration-300 px-2 sm:px-4 md:px-6 ${
          hasScrolled 
            ? 'backdrop-blur-md bg-white/95 border-b border-green-500/20 shadow-[0_8px_25px_rgba(0,0,0,0.1)] dark:bg-white/90 dark:border-green-500/10 rounded-b-2xl' 
            : 'backdrop-blur-sm bg-white/90 dark:bg-white/85 rounded-b-3xl'
        }`}
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className={styles.brandLink}>
                <div className={styles.brandIcon}>
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
              {renderGetStartedButton()}
              <div className="h-6 w-px bg-gray-300/50 mx-1"></div>
              {renderLoginDialog()}
            </div>

            {/* Menu toggle button */}
            <Button 
              variant="ghost" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className={styles.menuToggle}
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
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white/95 backdrop-blur-md z-50 
          border-l border-green-500/20 transform transition-transform duration-300 ease-in-out 
          rounded-l-3xl shadow-[-8px_0_30px_rgba(73,198,40,0.1)] ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 pt-6 flex flex-col gap-4">
          {/* Close sidebar button */}
          <div className="flex justify-between items-center mb-2">
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
          <div className="mt-2 flex flex-col gap-1">
            {/* If we're on the home page, show section links */}
            {currentPath === '/' && (
              <div className="mb-6">
                <SectionLinks 
                  activeSection={activeSection} 
                  handleSectionClick={handleSectionClick} 
                />
              </div>
            )}
            
            <h3 className="text-green-600 text-xs font-medium uppercase tracking-wider mb-2 pl-1">
              Main Navigation
            </h3>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="text-gray-500 hover:text-black relative transition-all duration-200 w-full justify-start p-2 
                  group hover:translate-y-[-1px] border-l-2 border-transparent
                  hover:border-l-2 hover:border-green-500"
                asChild
                onClick={() => setIsSidebarOpen(false)}
              >
                <Link href="/mobile-first-weSeedU">The Platform</Link>
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-500 hover:text-black relative transition-all duration-200 w-full justify-start p-2 
                  group hover:translate-y-[-1px] border-l-2 border-transparent
                  hover:border-l-2 hover:border-green-500"
                asChild
                onClick={() => setIsSidebarOpen(false)}
              >
                <Link href="/solutions">Solutions</Link>
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-500 hover:text-black relative transition-all duration-200 w-full justify-start p-2 
                  group hover:translate-y-[-1px] border-l-2 border-transparent
                  hover:border-l-2 hover:border-green-500"
                asChild
                onClick={() => setIsSidebarOpen(false)}
              >
                <Link href="/about">About</Link>
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-500 hover:text-black relative transition-all duration-200 w-full justify-start p-2 
                  group hover:translate-y-[-1px] border-l-2 border-transparent
                  hover:border-l-2 hover:border-green-500" 
                asChild
                onClick={() => setIsSidebarOpen(false)}
              >
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
          
          {/* Login button in sidebar */}
          <div className="mt-4 flex flex-col space-y-3">
            {renderGetStartedButton()}
            <div className="h-px w-full bg-gray-200 my-1"></div>
            {renderLoginDialog()}
          </div>
        </div>
      </div>
    </>
  )
}


'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { SectionNav } from '@/components/wsu/SectionNav'
import { MobileNav } from '@/components/wsu/MobileNav'

// Define the props for the Navigation component
interface MainNavProps {
  currentPath?: string;
}

// Main navigation items to avoid duplication
const MAIN_NAV_ITEMS = [
  { href: "/mobile-first-weSeedU", label: "The Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

// Simplified styles
const styles = {
  mainButton: "transition-all duration-300 rounded-full py-2 px-6 font-semibold",
  getStartedButton: "bg-white text-black shadow-md hover:shadow-lg border border-gray-200",
  loginButton: "bg-black text-white shadow-md hover:shadow-lg",
  menuToggle: "text-gray-700 md:hidden p-2 rounded-full hover:bg-gray-100 transition-all",
}

export function MainNav({ currentPath = '/' }: MainNavProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Simplified scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 10);
      
      if (currentScrollY > 80) {
        setShowSectionNav(currentScrollY <= lastScrollY);
      } else {
        setShowSectionNav(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    const throttledHandler = () => {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 100);
    };
    
    window.addEventListener('scroll', throttledHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandler);
  }, [lastScrollY]);

  // Reusable button components
  const AuthButtons = () => (
    <>
      <Button 
        className={`${styles.mainButton} ${styles.getStartedButton}`}
        asChild
      >
        <Link href="/auth/signup">Get Started</Link>
      </Button>
      <Button 
        className={`${styles.mainButton} ${styles.loginButton}`}
        asChild
      >
        <Link href="/auth/login">Login</Link>
      </Button>
    </>
  );

  return (
    <>
      {/* Main navigation bar */}
      <nav 
        className={`w-full z-50 fixed top-0 transition-all duration-300 px-4 ${
          hasScrolled 
            ? 'backdrop-blur-md bg-white/95 border-b border-green-500/20 shadow-md rounded-b-xl' 
            : 'backdrop-blur-sm bg-white/90 rounded-b-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="ml-2 text-xl font-bold flex">
                  <span className="text-black">We</span>
                  <span className="text-green-800">Seed</span>
                  <span className="text-black">U</span>
                </div>
              </Link>
            </div>

            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <AuthButtons />
            </div>

            {/* Menu toggle button */}
            <Button 
              variant="ghost" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className={styles.menuToggle}
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Section navigation for desktop */}
        {currentPath === '/' && (
          <div className={`transition-all duration-300 ${showSectionNav ? 'opacity-100 max-h-16' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="w-full h-[1px] bg-black/5 hidden md:block"></div>
            <div className="max-w-7xl mx-auto">
              <SectionNav />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile navigation using the new MobileNav component */}
      <MobileNav 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentPath={currentPath}
      />
    </>
  )
}


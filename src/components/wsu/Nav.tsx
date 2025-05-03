'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { SectionNav } from '@/components/wsu/SectionNav'

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
  sidebarLink: "text-gray-700 hover:text-black p-3 border-l-2 border-transparent hover:border-l-2 hover:border-gray-300"
}

export function MainNav({ currentPath = '/' }: MainNavProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
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

  // Close sidebar on outside click or escape key
  useEffect(() => {
    if (!isSidebarOpen) return;
    
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if ('key' in e && e.key === 'Escape') {
        setIsSidebarOpen(false);
        return;
      }
      
      if ('target' in e && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClose);
    window.addEventListener('keydown', handleClose);
    
    return () => {
      document.removeEventListener('mousedown', handleClose);
      window.removeEventListener('keydown', handleClose);
    };
  }, [isSidebarOpen]);

  // Handle section navigation for sidebar
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsSidebarOpen(false);
    }
  };

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

      {/* Simplified mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Simplified mobile sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-white shadow-lg z-50 
          transform transition-transform duration-300 ease-in-out rounded-l-2xl
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSidebarOpen(false)} 
              className="p-2 rounded-full"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Mobile navigation content */}
          <div className="flex-grow overflow-y-auto">
            {/* Main navigation */}
            <div className="mb-6">
              <h3 className="text-black text-xs font-medium uppercase tracking-wider mb-3 pl-1">
                Navigation
              </h3>
              <div className="space-y-1">
                {MAIN_NAV_ITEMS.map((item) => (
                  <Button 
                    key={item.href}
                    variant="ghost" 
                    className={styles.sidebarLink}
                    asChild
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Auth buttons */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, Zap, X } from "lucide-react"
import Link from "next/link"
import { SectionNav, SectionLinks } from '@/components/wsu/SectionNav'

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

// Extracted common styles
const styles = {
  brandLink: "flex items-center group",
  brandIcon: "p-2 bg-green-100 rounded-full transition-all duration-300 group-hover:scale-110",
  mainButton: "transition-all duration-300 hover:translate-y-[-2px] rounded-full py-2 px-6 hover:scale-105",
  getStartedButton: "bg-white hover:bg-gray-100 text-black font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-gray-200",
  loginButton: "bg-black hover:bg-gray-800 text-white font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]",
  menuToggle: "text-gray-700 hover:text-black hover:bg-gray-100 md:hidden p-3 rounded-full border border-gray-300 hover:scale-110 transition-all duration-300",
  sidebarLink: "text-gray-700 hover:text-black relative transition-all duration-200 w-full justify-start p-3 group hover:translate-y-[-1px] border-l-2 border-transparent hover:border-l-2 hover:border-gray-300"
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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

  // Unified handler for sidebar events (click outside and escape key)
  useEffect(() => {
    if (!isSidebarOpen) return;
    
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      // Close on escape key
      if ('key' in e && e.key === 'Escape') {
        setIsSidebarOpen(false);
        return;
      }
      
      // Close on click outside
      if ('target' in e && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    
    // Add both event listeners
    document.addEventListener('mousedown', handleClose);
    window.addEventListener('keydown', handleClose);
    
    // Clean up
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
      setActiveSection(sectionId);
      setIsSidebarOpen(false); // Close sidebar after navigation
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

  // Navigation bar style
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
            ? 'backdrop-blur-md bg-white/95 border-b border-green-500/20 shadow-[0_8px_25px_rgba(0,0,0,0.1)] rounded-b-2xl' 
            : 'backdrop-blur-sm bg-white/90 rounded-b-3xl'
        }`}
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className={styles.brandLink}>
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
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Section navigation for desktop */}
        {currentPath === '/' && (
          <>
            {/* Divider with conditional visibility */}
            <div 
              className={`hidden md:block relative transition-opacity duration-300 ${
                showSectionNav ? 'opacity-100' : 'opacity-0'
              }`}
            >
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
            
            {/* SectionNav with CSS transitions */}
            <div 
              className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out origin-top ${
                showSectionNav 
                  ? 'opacity-100 transform-none' 
                  : 'opacity-0 transform -translate-y-4 pointer-events-none h-0 overflow-hidden'
              }`}
            >
              <SectionNav />
            </div>
          </>
        )}
      </nav>

      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[85%] max-w-xs bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.15)] z-50 
          border-l border-gray-200 transform transition-transform duration-300 ease-in-out 
          rounded-l-3xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 pt-6 flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSidebarOpen(false)} 
              className="text-black hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full 
                hover:scale-110 transition-all duration-300"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Mobile navigation content */}
          <div className="flex-grow overflow-y-auto">
            {/* Section links (if on home page) */}
            {currentPath === '/' && (
              <div className="mb-8">
                <SectionLinks 
                  activeSection={activeSection} 
                  handleSectionClick={handleSectionClick} 
                />
              </div>
            )}
            
            {/* Main navigation */}
            <h3 className="text-black text-xs font-medium uppercase tracking-wider mb-3 pl-1">
              Main Navigation
            </h3>
            <div className="space-y-2 mb-8">
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
          
          {/* Auth buttons */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


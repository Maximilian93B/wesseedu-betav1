'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { X, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Animation variants
const drawerVariants = {
  hidden: { x: "100%", opacity: 0.5 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30, 
      duration: 0.3
    }
  },
  exit: { 
    x: "100%", 
    opacity: 0,
    transition: { 
      duration: 0.2, 
      ease: "easeInOut" 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

interface MobileNavProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  currentPath?: string;
}

export function MobileNav({ 
  isSidebarOpen, 
  setIsSidebarOpen,
  currentPath = '/'
}: MobileNavProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero-section');

  // Handle escape key and clicks outside the sidebar
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
  }, [isSidebarOpen, setIsSidebarOpen]);

  // Handle section navigation for sidebar
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsSidebarOpen(false);
      setActiveSection(sectionId);
    }
  };

  // Track active section based on scroll - simplified version
  useEffect(() => {
    if (currentPath !== '/') return;
    
    const handleScroll = () => {
      const sections = ['hero-section', 'card-section', 'partners-section', 'startup-section', 'impact-section'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop overlay with clean styling */}
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Mobile navigation drawer with clean white styling */}
          <motion.div 
            ref={sidebarRef}
            className="fixed top-0 right-0 h-full w-[85%] max-w-xs z-50 rounded-l-2xl overflow-hidden shadow-xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* White background */}
            <div className="absolute inset-0 bg-white"></div>
            
            {/* Content container */}
            <div className="relative z-10 h-full flex flex-col p-6">
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center" onClick={() => setIsSidebarOpen(false)}>
                  <div className="text-xl font-bold flex">
                    <span className="text-black">We</span>
                    <span className="text-green-800">Seed</span>
                    <span className="text-black">U</span>
                  </div>
                </Link>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)} 
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Navigation content */}
              <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {/* Section links - conditionally render for homepage */}
                {currentPath === '/' && (
                  <div className="mb-8">
                    <motion.div 
                      className="w-20 h-1 bg-gray-200 mb-4 rounded-full"
                      initial={{ width: 20 }}
                      animate={{ width: 40 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    <h3 className="text-black text-sm font-medium uppercase tracking-wider mb-4 font-display">
                      Page Sections
                    </h3>
                    <div className="space-y-2">
                      {['hero-section', 'card-section', 'partners-section', 'startup-section', 'impact-section'].map((sectionId, i) => {
                        const sectionLabel = {
                          'hero-section': 'Home',
                          'card-section': 'Features',
                          'partners-section': 'Partners',
                          'startup-section': 'Application',
                          'impact-section': 'Impact'
                        }[sectionId];
                        
                        return (
                          <motion.div
                            key={sectionId}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Button 
                              variant="ghost" 
                              className={`w-full justify-start text-gray-800 hover:text-black text-sm sm:text-base py-3 px-4 rounded-lg transition-all duration-300 font-body
                                ${activeSection === sectionId 
                                  ? 'bg-gray-100 border border-gray-200 shadow-sm font-medium' 
                                  : 'hover:bg-gray-50 border border-transparent'}`}
                              onClick={() => handleSectionClick(sectionId)}
                            >
                              <span className="flex items-center w-full">
                                {sectionLabel}
                                {activeSection === sectionId && (
                                  <Check className="ml-auto h-4 w-4 text-black" />
                                )}
                              </span>
                            </Button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Auth buttons */}
              <div className="pt-4 border-t border-gray-100">
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Button 
                    className="w-full border-slate-200 bg-slate-900 text-white font-medium py-5 rounded-lg text-base
                      shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                      hover:bg-slate-800 transition-all duration-300 ease-out hover:translate-y-[-2px)] font-helvetica"
                    asChild
                  >
                    <Link href="/auth/signup">
                      <span className="flex items-center justify-center">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-800 
                      font-medium py-5 rounded-lg text-base
                      shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)]
                      transition-all duration-300 ease-out hover:translate-y-[-2px)] hover:border-slate-300 font-helvetica"
                    asChild
                  >
                    <Link href="/auth/login">
                      <span className="flex items-center justify-center">
                        Login
                      </span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { X, Check, ArrowRight, Menu } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Animation variants
const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40 
    }
  },
  exit: { 
    x: "100%", 
    opacity: 0,
    transition: { 
      duration: 0.25, 
      ease: [0.32, 0.72, 0, 1] 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.06,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }),
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.25 }
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
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClose);
      window.removeEventListener('keydown', handleClose);
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsSidebarOpen(false);
      setActiveSection(sectionId);
    }
  };

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

  const sectionLabels = {
    'hero-section': 'Home',
    'card-section': 'Features',
    'partners-section': 'Partners',
    'startup-section': 'Application',
    'impact-section': 'Impact'
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsSidebarOpen(false)}
          />

          <motion.div 
            ref={sidebarRef}
            className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] z-50 overflow-hidden"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md"></div>
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-70"></div>
            
            <div className="relative z-10 h-full flex flex-col p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center" onClick={() => setIsSidebarOpen(false)}>
                  <div className="text-xl font-bold flex items-center">
                    <span className="text-black">We</span>
                    <span className="text-green-800">Seed</span>
                    <span className="text-black">U</span>
                  </div>
                </Link>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)} 
                  className="w-8 h-8 p-0 rounded-sm bg-gray-100/80 text-gray-700 hover:bg-gray-200 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-grow overflow-y-auto scrollbar-none">
                {currentPath === '/' && (
                  <div className="mb-8">
                    <motion.div 
                      className="w-10 h-[2px] bg-gray-200 mb-5"
                      initial={{ width: 10, opacity: 0.5 }}
                      animate={{ width: 20, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-4 font-sans">
                      Navigation
                    </h3>
                    <div className="space-y-1.5">
                      {Object.entries(sectionLabels).map(([sectionId, label], i) => (
                        <motion.div
                          key={sectionId}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Button 
                            variant="ghost" 
                            className={`w-full justify-start text-gray-600 hover:text-black text-sm py-2.5 px-3 rounded-none transition-all duration-200
                              ${activeSection === sectionId 
                                ? 'bg-gray-50 text-black font-medium border-l-2 border-gray-200' 
                                : 'hover:bg-gray-50/50'}`}
                            onClick={() => handleSectionClick(sectionId)}
                          >
                            <span className="flex items-center w-full">
                              {label}
                              {activeSection === sectionId && (
                                <Check className="ml-auto h-3.5 w-3.5 text-green-600" />
                              )}
                            </span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <motion.div
                  className="space-y-2.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                >
                  <Button 
                    className="w-full bg-black hover:bg-black/90 text-white font-medium py-2.5 px-4 rounded-none text-sm
                      shadow-sm hover:shadow transition-all duration-200"
                    asChild
                  >
                    <Link href="/auth/signup">
                      <span className="flex items-center justify-center">
                        Get Started
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 
                      font-medium py-2.5 px-4 rounded-none text-sm transition-all duration-200"
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
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

// Define sections once to avoid duplication
const SECTIONS = [
  { id: 'hero-section', label: 'Home' },
  { id: 'card-section', label: 'Features' },
  { id: 'partners-section', label: 'Partners' },
  { id: 'startup-section', label: 'Application' },
  { id: 'impact-section', label: 'Impact' }
];

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  scrollToSection?: (sectionId: string) => void;
}

export function SectionNav({ scrollToSection }: SectionNavProps = {}) {
  const [activeSection, setActiveSection] = useState('hero-section');
  const navRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  // Create smooth scrolling effect
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 300,
    restDelta: 0.001
  });
  
  // Parallax transforms for nav elements
  const navTranslateY = useTransform(smoothScroll, [0, 0.1], [0, -10]);
  const navScale = useTransform(smoothScroll, [0, 0.1], [1, 0.97]);
  const navOpacity = useTransform(smoothScroll, [0, 0.2], [1, 0.9]);
  
  // Track the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = SECTIONS.map(section => section.id);
      
      // Find the current section based on scroll position
      const currentSection = sectionIds.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });
      
      if (currentSection) setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section navigation
  const handleSectionClick = (sectionId: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  const firstHalf = SECTIONS.slice(0, 3);
  const secondHalf = SECTIONS.slice(3);

  // NavButton component to reduce repeated code
  const NavButton = ({ section, index, offset = 0 }: { 
    section: Section; 
    index: number; 
    offset?: number; 
  }) => {
    // Per-button transforms with slight delay based on index
    const buttonX = useTransform(
      smoothScroll, 
      [0, 0.3], 
      [0, index % 2 === 0 ? -5 - (index * 3) : 5 + (index * 3)]
    );
    
    return (
      <motion.div
        style={{ 
          x: buttonX,
          transition: `all ${300 + (index * 30)}ms cubic-bezier(0.4, 0, 0.2, 1)`
        }}
      >
        <Button 
          key={section.id}
          variant="ghost" 
          className={`
            relative text-gray-700 rounded-full text-sm px-5 py-2 transition-all duration-300
            ${activeSection === section.id ? 'bg-white shadow-md scale-105 text-black' : 'bg-transparent hover:bg-white/10'}
          `}
          onClick={() => handleSectionClick(section.id)}
          style={{ transitionDelay: `${(index + offset) * 50}ms` }}
        >
          <span>{section.label}</span>
          {activeSection === section.id && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></span>
          )}
        </Button>
      </motion.div>
    );
  };

  return (
    <motion.div 
      ref={navRef}
      className="hidden md:flex items-center justify-center py-4 overflow-x-auto transition-all duration-300 w-full"
      style={{
        y: navTranslateY,
        scale: navScale,
        opacity: navOpacity
      }}
    >
      <div className="flex justify-between w-full max-w-6xl px-4">
        <div className="flex space-x-5">
          {firstHalf.map((section, index) => (
            <NavButton section={section} index={index} key={section.id} />
          ))}
        </div>
        
        <div className="flex space-x-5">
          {secondHalf.map((section, index) => (
            <NavButton section={section} index={index} offset={3} key={section.id} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Export the section links separately so they can be used in the sidebar
export function SectionLinks({ activeSection, handleSectionClick }: { 
  activeSection: string, 
  handleSectionClick: (sectionId: string) => void 
}) {
  const firstHalf = SECTIONS.slice(0, 3);
  const secondHalf = SECTIONS.slice(3);

  return (
    <div className="mb-6">
      <h3 className="text-black text-xs font-medium uppercase tracking-wider mb-3 pl-1">
        Page Sections
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {SECTIONS.map((section, index) => (
          <Button 
            key={section.id}
            variant="ghost" 
            className={`text-black relative transition-all duration-200 w-full justify-start p-3 pl-3
              group hover:translate-y-[-1px] border-l-2 border-transparent
              ${activeSection === section.id ? 'text-black font-medium border-l-2 border-black bg-gray-50' : ''}`}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="flex items-center w-full">
              <span className="ml-1 text-sm">{section.label}</span>
              <div className={`ml-auto transform scale-0 opacity-0 transition-all duration-200 
                ${activeSection === section.id ? 'scale-100 opacity-100' : 'group-hover:opacity-30 group-hover:scale-75'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
} 
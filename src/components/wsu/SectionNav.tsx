'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Define sections once to avoid duplication
const SECTIONS = [
  { id: 'hero-section', label: 'Home' },
  { id: 'card-section', label: 'Features' },
  { id: 'partners-section', label: 'Partners' },
  { id: 'startup-section', label: 'Application' },
  { id: 'impact-section', label: 'Impact' }
];

interface SectionNavProps {
  scrollToSection?: (sectionId: string) => void;
}

export function SectionNav({ scrollToSection }: SectionNavProps = {}) {
  const [activeSection, setActiveSection] = useState('hero-section');
  
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
    
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  return (
    <div className="hidden md:flex items-center justify-center py-2 overflow-x-auto w-full">
      <div className="flex justify-between w-full max-w-5xl">
        <div className="flex space-x-2">
          {SECTIONS.slice(0, 3).map((section) => (
            <Button 
              key={section.id}
              variant="ghost" 
              className={`
                relative text-gray-700 rounded-full text-sm px-4 py-1.5 transition-all duration-200
                ${activeSection === section.id ? 'bg-white shadow-sm text-black' : 'hover:bg-white/10'}
              `}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.label}
              {activeSection === section.id && (
                <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></span>
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          {SECTIONS.slice(3).map((section) => (
            <Button 
              key={section.id}
              variant="ghost" 
              className={`
                relative text-gray-700 rounded-full text-sm px-4 py-1.5 transition-all duration-200
                ${activeSection === section.id ? 'bg-white shadow-sm text-black' : 'hover:bg-white/10'}
              `}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.label}
              {activeSection === section.id && (
                <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Export the section links separately so they can be used in the sidebar
export function SectionLinks({ activeSection, handleSectionClick }: { 
  activeSection: string, 
  handleSectionClick: (sectionId: string) => void 
}) {
  return (
    <div className="mb-4">
      <h3 className="text-black text-xs font-medium uppercase tracking-wider mb-2 pl-1">
        Page Sections
      </h3>
      <div className="grid grid-cols-1 gap-1">
        {SECTIONS.map((section) => (
          <Button 
            key={section.id}
            variant="ghost" 
            className={`text-gray-700 relative w-full justify-start p-2 pl-3
              border-l-2 border-transparent transition-all duration-200
              ${activeSection === section.id ? 'text-black font-medium border-l-2 border-black bg-gray-50' : ''}`}
            onClick={() => handleSectionClick(section.id)}
          >
            <span className="ml-1 text-sm">{section.label}</span>
            {activeSection === section.id && (
              <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
} 
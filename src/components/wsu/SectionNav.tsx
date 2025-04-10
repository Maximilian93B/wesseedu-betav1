'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

// Define sections once to avoid duplication
const SECTIONS = [
  { id: 'hero-section', label: 'Home' },
  { id: 'impact-section', label: 'Impact' },
  { id: 'card-section', label: 'Features' },
  { id: 'partners-section', label: 'Partners' },
  { id: 'solution-section', label: 'Solutions' },
  { id: 'features-section', label: 'Key Features' }
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
  }) => (
    <Button 
      key={section.id}
      variant="ghost" 
      className={`
        relative text-gray-700 rounded-full text-sm px-4 py-1 transition-all duration-300
        ${activeSection === section.id ? 'bg-white shadow-md scale-105 text-black' : 'bg-transparent'}
      `}
      onClick={() => handleSectionClick(section.id)}
      style={{ transitionDelay: `${(index + offset) * 50}ms` }}
    >
      <span>{section.label}</span>
      {activeSection === section.id && (
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></span>
      )}
    </Button>
  );

  return (
    <div className="hidden md:flex items-center justify-center pb-2 pt-2 overflow-x-auto transition-all duration-300 w-full">
      <div className="flex justify-between w-full max-w-6xl px-4">
        <div className="flex space-x-3">
          {firstHalf.map((section, index) => (
            <NavButton section={section} index={index} key={section.id} />
          ))}
        </div>
        
        <div className="flex space-x-3">
          {secondHalf.map((section, index) => (
            <NavButton section={section} index={index} offset={3} key={section.id} />
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
  const firstHalf = SECTIONS.slice(0, 3);
  const secondHalf = SECTIONS.slice(3);

  return (
    <div className="mb-4">
      <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 pl-1">
        Page Sections
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-8">
        {SECTIONS.map((section, index) => (
          <Button 
            key={section.id}
            variant="ghost" 
            className={`text-gray-400 relative transition-all duration-200 w-full justify-start p-2 pl-2
              group hover:translate-y-[-1px] border-l-2 border-transparent
              ${activeSection === section.id ? 'text-black font-medium border-l-2 border-black' : ''}`}
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
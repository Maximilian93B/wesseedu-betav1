'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface SectionNavProps {
  scrollToSection?: (sectionId: string) => void;
}

export function SectionNav({ scrollToSection }: SectionNavProps = {}) {
  const [activeSection, setActiveSection] = useState('hero-section');
  
  // Track the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero-section',
        'impact-section',
        'card-section',
        'partners-section',
        'solution-section',
        'features-section'
      ];
      
      // Find the current section based on scroll position
      const currentSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        // Consider a section active when it's near the top of the viewport
        return rect.top <= 150 && rect.bottom > 150;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section navigation
  const handleSectionClick = (sectionId: string) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
      setActiveSection(sectionId);
    } else {
      // Default behavior if no scrollToSection prop is provided
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
  };

  const sections = [
    { id: 'hero-section', label: 'Home' },
    { id: 'impact-section', label: 'Impact' },
    { id: 'card-section', label: 'Features' },
    { id: 'partners-section', label: 'Partners' },
    { id: 'solution-section', label: 'Solutions' },
    { id: 'features-section', label: 'Key Features' }
  ];

  const firstHalf = sections.slice(0, 3);
  const secondHalf = sections.slice(3);

  return (
    <div className="hidden md:flex items-center justify-center pb-4 pt-4 overflow-x-auto transition-all duration-300 w-full">
      <div className="flex justify-between w-full max-w-6xl px-4">
        <div className="flex space-x-3">
          {firstHalf.map((section, index) => (
            <Button 
              key={section.id}
              variant="ghost" 
              className={`
                relative text-gray-700 rounded-full text-sm px-4 py-1.5 transition-all duration-300
                ${activeSection === section.id ? 'bg-white shadow-md scale-105 text-black' : 'bg-transparent'}
              `}
              onClick={() => handleSectionClick(section.id)}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              <span>{section.label}</span>
              {activeSection === section.id && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></span>
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex space-x-3">
          {secondHalf.map((section, index) => (
            <Button 
              key={section.id}
              variant="ghost" 
              className={`
                relative text-gray-700 rounded-full text-sm px-4 py-1.5 transition-all duration-300
                ${activeSection === section.id ? 'bg-white shadow-md scale-105 text-black' : 'bg-transparent'}
              `}
              onClick={() => handleSectionClick(section.id)}
              style={{
                transitionDelay: `${(index + 3) * 50}ms`
              }}
            >
              <span>{section.label}</span>
              {activeSection === section.id && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></span>
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
  const sections = [
    { id: 'hero-section', label: 'Home' },
    { id: 'impact-section', label: 'Impact' },
    { id: 'card-section', label: 'Features' },
    { id: 'partners-section', label: 'Partners' },
    { id: 'solution-section', label: 'Solutions' },
    { id: 'features-section', label: 'Key Features' }
  ];

  const firstHalf = sections.slice(0, 3);
  const secondHalf = sections.slice(3);

  return (
    <div className="mb-6">
      <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-3 pl-2">
        Page Sections
      </h3>
      <div className="flex space-x-12">
        <div className="flex-1 space-y-2">
          {firstHalf.map((section, index) => (
            <Button 
              key={section.id}
              variant="ghost" 
              className={`text-gray-500 hover:text-black hover:bg-gray-100 transition-all duration-300 w-full justify-start 
                ${activeSection === section.id ? 'text-black bg-gray-100 font-medium' : ''}`}
              onClick={() => handleSectionClick(section.id)}
              style={{
                transitionDelay: `${index * 30}ms`
              }}
            >
              {section.label}
            </Button>
          ))}
        </div>
        <div className="flex-1 space-y-2">
          {secondHalf.map((section, index) => (
            <Button 
              key={section.id}
              variant="ghost" 
              className={`text-gray-500 hover:text-black hover:bg-gray-100 transition-all duration-300 w-full justify-start 
                ${activeSection === section.id ? 'text-black bg-gray-100 font-medium' : ''}`}
              onClick={() => handleSectionClick(section.id)}
              style={{
                transitionDelay: `${(index + 3) * 30}ms`
              }}
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 
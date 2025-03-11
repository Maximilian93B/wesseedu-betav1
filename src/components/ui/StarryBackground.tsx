"use client"
import { useState, useEffect, useRef, memo } from 'react'

// Memoized component to prevent unnecessary re-renders
const StarryBackground = memo(() => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [orbitingParticles, setOrbitingParticles] = useState<React.ReactNode[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Further reduced particles for better performance
  const TOTAL_STARS = 60; // Reduced from 75
  const TOTAL_PARTICLES = 8; // Reduced from 10
  
  // Detect if reduced motion is preferred
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Add listener for changes
      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  // Only generate stars when component is visible in viewport
  useEffect(() => {
    // Set up intersection observer for performance optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Generate stars only when visible and only once
  useEffect(() => {
    if (!isVisible) return;
    
    // Only generate stars if we haven't yet
    if (stars.length === 0) {
      const generatedStars = Array.from({ length: TOTAL_STARS }).map((_, i) => {
        const size = Math.random() * 2;
        const isLarger = Math.random() > 0.92;
        const hasGlow = Math.random() > 0.85; // Further reduced glow frequency
        const isBright = Math.random() > 0.75;
        
        return (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{ 
              width: isLarger ? size + 1 + 'px' : size + 'px',
              height: isLarger ? size + 1 + 'px' : size + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.4 + 0.6,
              backgroundColor: isBright ? 
                `rgba(255, 255, 255, 1)` : 
                isLarger ? 
                  `rgba(${240 + Math.random() * 15}, ${240 + Math.random() * 15}, ${250}, 1)` : 
                  `rgba(${210 + Math.random() * 45}, ${210 + Math.random() * 45}, ${230 + Math.random() * 25}, 1)`,
              // Only apply shadow to larger stars to save performance
              boxShadow: hasGlow && isLarger ? 
                `0 0 ${Math.random() * 2 + 1}px rgba(255, 255, 255, ${Math.random() * 0.3 + 0.3})` : 
                'none',
              // Use reduced motion if preferred by user
              animation: !prefersReducedMotion ? 
                `twinkle ${Math.random() * 6 + 8}s ease-in-out infinite` : 
                'none',
              animationDelay: `${Math.random() * 5}s`,
              // Hardware acceleration for smoother animations
              transform: 'translateZ(0)'
            }}
          />
        );
      });
      
      setStars(generatedStars);
    }
    
    // Only generate orbiting particles if we haven't yet
    if (orbitingParticles.length === 0) {
      const generatedOrbitingParticles = Array.from({ length: prefersReducedMotion ? Math.floor(TOTAL_PARTICLES / 2) : TOTAL_PARTICLES }).map((_, i) => {
        const angle = Math.random() * 360;
        const distance = 75 + Math.random() * 10;
        const size = Math.random() * 1.5 + 0.5;
        const isBright = Math.random() > 0.7;
        
        return (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{ 
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: isBright ?
                `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.7})` :
                `rgba(${210 + Math.random() * 45}, ${210 + Math.random() * 45}, ${240}, ${Math.random() * 0.4 + 0.6})`,
              // Simplified shadow
              boxShadow: `0 0 ${Math.random() * 1 + 0.5}px rgba(255, 255, 255, ${Math.random() * 0.3 + 0.3})`,
              left: `calc(50% + ${distance * Math.cos(angle * Math.PI / 180)}vmin)`,
              top: `calc(50% + ${distance * Math.sin(angle * Math.PI / 180)}vmin)`,
              // Slower animations for better performance
              animation: !prefersReducedMotion ? 
                `rotate-slow ${Math.random() * 30 + 120}s linear infinite${Math.random() > 0.5 ? ' reverse' : ''}` : 
                'none',
              opacity: Math.random() * 0.3 + 0.6,
              // Hardware acceleration for smoother animations
              transform: 'translateZ(0)'
            }}
          />
        );
      });
      
      setOrbitingParticles(generatedOrbitingParticles);
    }
  }, [isVisible, stars.length, orbitingParticles.length, prefersReducedMotion]);
  
  // Add any necessary CSS keyframes
  return (
    <>
      {/* Add essential keyframes - simplified animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.95); }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg) translateZ(0); }
          100% { transform: rotate(360deg) translateZ(0); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }

        @keyframes atmospheric-shimmer {
          0%, 100% { 
            box-shadow: 0 0 40px 10px rgba(168, 85, 247, 0.08), inset 0 0 100px 40px rgba(147, 51, 234, 0.15);
            opacity: 0.65;
            transform: scale(1) translateZ(0);
          }
          50% { 
            box-shadow: 0 0 50px 15px rgba(168, 85, 247, 0.12), inset 0 0 120px 50px rgba(147, 51, 234, 0.2);
            opacity: 0.75;
            transform: scale(1.005) translateZ(0);
          }
        }
      `}</style>
      
      {/* Fixed background container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -110 }}>
        {/* Deep space gradient background */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse at center, #05060a 0%, #040508 45%, #020307 70%, #010205 100%)',
            opacity: 0.85,
          }}
        ></div>
        
        {/* Stars are now rendered from state, generated only on client and when visible */}
        <div className="absolute inset-0">
          {stars}
        </div>
      </div>
      
      {/* Modified planet implementation - positioned to create "cresting over" effect with simplified animations */}
      {isVisible && (
        <div 
          className="fixed inset-0 pointer-events-none overflow-visible"
          style={{ 
            zIndex: -80,
          }}
        >
          {/* Planet container - moved up to create cresting effect */}
          <div 
            className="absolute w-screen pointer-events-none overflow-visible"
            style={{ 
              top: '50%',
              left: '0',
              right: '0',
              mixBlendMode: 'screen',
              willChange: 'transform',
            }}
          >
            {/* Planet core with full width - positioned higher to create cresting effect */}
            <div 
              className="absolute rounded-[50%]"
              style={{ 
                width: '300vw',
                height: '300vw',
                left: '50%',
                transform: 'translateX(-50%) translateZ(0)',
                top: '10vh',
                background: 'linear-gradient(135deg, #030310 0%, #05051a 100%)',
                boxShadow: '0 0 80px 20px rgba(15, 15, 40, 0.6), inset 0 0 50px 25px rgba(5, 5, 15, 0.7)',
                border: '1px solid rgba(60, 60, 100, 0.4)',
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              {/* Planet texture overlay - increased visibility */}
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(60, 60, 100, 0.8) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(50, 50, 80, 0.8) 0%, transparent 60%)'
                }}
              ></div>
            </div>
            
            {/* Atmospheric radiant ring - simplified for performance but preserves visual effect */}
            {!prefersReducedMotion && (
              <div 
                className="absolute rounded-[50%]"
                style={{ 
                  width: '302vw',
                  height: '302vw',
                  left: '50%',
                  transform: 'translateX(-50%) translateZ(0)',
                  top: '9.5vh',
                  zIndex: 0,
                  background: 'transparent',
                  border: '4px solid rgba(168, 85, 247, 0.08)',
                  boxShadow: '0 0 40px 10px rgba(168, 85, 247, 0.1), inset 0 0 100px 40px rgba(147, 51, 234, 0.15)',
                  opacity: 0.75,
                  willChange: 'transform, opacity',
                  animation: 'atmospheric-shimmer 30s ease-in-out infinite'
                }}
              ></div>
            )}
            
            {/* Secondary atmospheric halo - simplified for performance */}
            {!prefersReducedMotion && (
              <div 
                className="absolute rounded-[50%]"
                style={{ 
                  width: '307vw',
                  height: '307vw',
                  left: '50%',
                  transform: 'translateX(-50%) translateZ(0)',
                  top: '8.3vh',
                  zIndex: -1,
                  background: 'transparent',
                  boxShadow: '0 0 120px 25px rgba(126, 34, 206, 0.05), inset 0 0 50px 15px rgba(168, 85, 247, 0.07)',
                  opacity: 0.55,
                  willChange: 'opacity',
                  animation: 'pulse-glow 35s ease-in-out infinite'
                }}
              ></div>
            )}
            
            {/* Primary glow ring - simplified for performance */}
            <div 
              className="absolute rounded-[50%]"
              style={{ 
                width: '320vw',
                height: '320vw',
                left: '50%',
                transform: 'translateX(-50%) translateZ(0)',
                top: '7vh',
                background: !prefersReducedMotion ? 
                  'radial-gradient(circle at center, transparent 72%, rgba(168, 85, 247, 0.1) 80%, rgba(147, 51, 234, 0.5) 88%, rgba(126, 34, 206, 0.25) 95%, transparent 100%)' :
                  'radial-gradient(circle at center, transparent 72%, rgba(168, 85, 247, 0.05) 80%, rgba(147, 51, 234, 0.25) 88%, rgba(126, 34, 206, 0.15) 95%, transparent 100%)',
                opacity: 0.8,
                zIndex: -2,
                willChange: !prefersReducedMotion ? 'transform' : 'auto',
                animation: !prefersReducedMotion ? 'rotate-slow 400s linear infinite reverse' : 'none'
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  )
});

// Set display name for debugging purposes
StarryBackground.displayName = 'StarryBackground';

export default StarryBackground; 
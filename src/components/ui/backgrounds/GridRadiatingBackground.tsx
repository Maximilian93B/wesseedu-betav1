"use client"

import { useState, useEffect, useRef, memo } from 'react'

// Memoized component to prevent unnecessary re-renders
const GridRadiatingBackground = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detect if reduced motion is preferred
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
  
  // Only render when component is visible in viewport
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
  
  // Generate planetary elements similar to StarryBackground
  const [orbitingParticles, setOrbitingParticles] = useState<React.ReactNode[]>([]);
  
  // Generate orbiting particles only when visible and only once
  useEffect(() => {
    if (!isVisible) return;
    
    // Only generate orbiting particles if we haven't yet
    if (orbitingParticles.length === 0) {
      const TOTAL_PARTICLES = 8;
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
              transform: 'translateZ(0)',
              zIndex: 2
            }}
          />
        );
      });
      
      setOrbitingParticles(generatedOrbitingParticles);
    }
  }, [isVisible, orbitingParticles.length, prefersReducedMotion]);
  
  return (
    <>
      {/* Add essential keyframes */}
      <style jsx global>{`
        @keyframes pulse-grid {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        
        @keyframes rotate-grid {
          0% { transform: rotate(0deg) translateZ(0); }
          100% { transform: rotate(360deg) translateZ(0); }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg) translateZ(0); }
          100% { transform: rotate(360deg) translateZ(0); }
        }
        
        @keyframes grid-flow {
          0% { transform: translateZ(0); }
          50% { transform: translateZ(0) scale(1.05); }
          100% { transform: translateZ(0); }
        }
        
        @keyframes grid-glow {
          0%, 100% { filter: blur(1px) brightness(1); }
          50% { filter: blur(1.5px) brightness(1.2); }
        }
        
        @keyframes grid-ripple {
          0% { transform: scale(0.95) translateZ(0); opacity: 0.8; }
          50% { transform: scale(1.05) translateZ(0); opacity: 1; }
          100% { transform: scale(0.95) translateZ(0); opacity: 0.8; }
        }
        
        @keyframes enhanced-atmospheric-shimmer {
          0%, 100% { 
            box-shadow: 0 0 60px 15px rgba(168, 85, 247, 0.25), inset 0 0 120px 50px rgba(147, 51, 234, 0.3);
            opacity: 0.85;
            transform: scale(1) translateZ(0);
            filter: brightness(1);
          }
          50% { 
            box-shadow: 0 0 80px 25px rgba(168, 85, 247, 0.35), inset 0 0 150px 70px rgba(147, 51, 234, 0.4);
            opacity: 0.95;
            transform: scale(1.01) translateZ(0);
            filter: brightness(1.05);
          }
        }
        
        @keyframes horizon-shimmer {
          0%, 100% { 
            opacity: 0.7;
            transform: translateY(0px) translateZ(0);
          }
          50% { 
            opacity: 0.9;
            transform: translateY(-1px) translateZ(0);
          }
        }
        
        @keyframes edge-radiance {
          0%, 100% { 
            opacity: 0.95;
            filter: blur(0.5px) brightness(1.05);
            border-top-color: rgba(147, 51, 234, 0.7);
            box-shadow: 0 -5px 15px 1px rgba(147, 51, 234, 0.4);
          }
          33% { 
            opacity: 0.9;
            filter: blur(0.6px) brightness(1);
            border-top-color: rgba(147, 51, 234, 0.65);
            box-shadow: 0 -4px 12px 1px rgba(147, 51, 234, 0.35);
          }
          66% { 
            opacity: 1;
            filter: blur(0.4px) brightness(1.1);
            border-top-color: rgba(147, 51, 234, 0.8);
            box-shadow: 0 -6px 18px 2px rgba(147, 51, 234, 0.5);
          }
        }
      `}</style>
      
      {/* Fixed background container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -110 }}>
        {/* Deep space gradient background - adjusted to be more purple */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse at center, #150838 0%, #0C0425 45%, #08031A 70%, #050212 100%)',
            opacity: 0.9,
          }}
        ></div>
        
        {/* Grid pattern - only render when visible */}
        {isVisible && (
          <div className="absolute inset-0 overflow-hidden">
            {/* Base Grid overlay - matches the image grid pattern */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(126, 34, 206, 0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(126, 34, 206, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '6vmin 6vmin',
                opacity: 0.7,
                animation: !prefersReducedMotion ? 'pulse-grid 8s ease-in-out infinite' : 'none',
                willChange: 'opacity',
                zIndex: 1
              }}
            ></div>
            
            {/* Diagonal grid overlay - adds depth to main grid */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(147, 51, 234, 0.15) 1px, transparent 1px),
                  linear-gradient(135deg, rgba(147, 51, 234, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '10vmin 10vmin',
                opacity: 0.6,
                animation: !prefersReducedMotion ? 'pulse-grid 10s ease-in-out infinite reverse' : 'none',
                willChange: 'opacity',
                zIndex: 1
              }}
            ></div>
            
            {/* Planet implementation from StarryBackground */}
            <div 
              className="fixed inset-0 pointer-events-none overflow-visible"
              style={{ 
                zIndex: 5,
              }}
            >
              {/* Planet container - moved to create cresting effect */}
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
                {/* Planet core with full width */}
                <div 
                  className="absolute rounded-[50%]"
                  style={{ 
                    width: '300vw',
                    height: '300vw',
                    left: '50%',
                    transform: 'translateX(-50%) translateZ(0)',
                    top: '16vh',
                    background: 'linear-gradient(135deg, #0F0428 0%, #14062C 100%)',
                    boxShadow: '0 0 80px 20px rgba(25, 12, 60, 0.6), inset 0 0 50px 25px rgba(15, 5, 35, 0.7)',
                    border: '1px solid rgba(90, 60, 150, 0.4)',
                    zIndex: 1,
                    overflow: 'hidden',
                  }}
                >
                  {/* Enhanced planet texture overlay with directional lighting */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 65% 35%, rgba(140, 80, 200, 0.9) 0%, transparent 45%), radial-gradient(circle at 30% 70%, rgba(70, 50, 130, 0.8) 0%, transparent 60%)'
                    }}
                  ></div>
                  
                  {/* Edge highlight to enhance 3D appearance */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'radial-gradient(circle at 75% 25%, rgba(180, 140, 250, 0.25) 0%, transparent 30%)',
                      mixBlendMode: 'overlay'
                    }}
                  ></div>
                  
                  {/* Enhanced 3D surface texture with subtle highlights */}
                  {!prefersReducedMotion && (
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(ellipse at 65% 35%, rgba(170, 100, 240, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 30% 60%, rgba(120, 80, 200, 0.15) 0%, transparent 60%)',
                        transform: 'translateZ(0)',
                        opacity: 0.8
                      }}
                    ></div>
                  )}
                </div>
                
                {/* Primary atmospheric halo */}
                {!prefersReducedMotion && (
                  <div 
                    className="absolute rounded-[50%]"
                    style={{ 
                      width: '310vw',
                      height: '310vw',
                      left: '50%',
                      transform: 'translateX(-50%) translateZ(0)',
                      top: '15vh',
                      zIndex: -1,
                      background: 'transparent',
                      boxShadow: '0 0 100px 25px rgba(147, 51, 234, 0.15), inset 0 0 70px 25px rgba(168, 85, 247, 0.18)',
                      opacity: 0.85,
                      willChange: 'opacity, box-shadow',
                      animation: 'enhanced-atmospheric-shimmer 35s ease-in-out infinite'
                    }}
                  ></div>
                )}
                
                {/* Primary horizon glow - main curved atmospheric effect */}
                {!prefersReducedMotion && (
                  <div 
                    className="absolute rounded-[50%]"
                    style={{ 
                      width: '300vw',
                      height: '300vw',
                      left: '50%',
                      transform: 'translateX(-50%) translateZ(0)',
                      top: '16vh',
                      zIndex: 2,
                      background: 'linear-gradient(to bottom, rgba(147, 51, 234, 0.05) 0%, transparent 15%)',
                      border: '5px solid transparent',
                      borderTopColor: 'rgba(147, 51, 234, 0.75)',
                      borderLeftColor: 'rgba(147, 51, 234, 0.15)',
                      borderRightColor: 'rgba(147, 51, 234, 0.15)',
                      boxShadow: '0 -15px 40px 5px rgba(147, 51, 234, 0.6), inset 0 15px 35px 3px rgba(168, 85, 247, 0.4)',
                      filter: 'blur(4px)',
                      opacity: 0.97,
                      animation: 'enhanced-atmospheric-shimmer 30s ease-in-out infinite'
                    }}
                  ></div>
                )}
                
                {/* Horizon line that follows the planet's curve precisely */}
                {!prefersReducedMotion && (
                  <div 
                    className="absolute rounded-[50%]"
                    style={{ 
                      width: '300vw',
                      height: '300vw',
                      left: '50%',
                      top: '16vh',
                      transform: 'translateX(-50%)',
                      border: '1.5px solid rgba(168, 85, 247, 0.8)',
                      borderBottom: 'none',
                      borderLeft: '1px solid rgba(168, 85, 247, 0.2)',
                      borderRight: '1px solid rgba(168, 85, 247, 0.2)',
                      boxShadow: '0 -2px 10px 0.5px rgba(168, 85, 247, 0.5)',
                      filter: 'blur(0.4px)',
                      opacity: 0.98,
                      zIndex: 15,
                      pointerEvents: 'none',
                      mixBlendMode: 'screen',
                      animation: 'edge-radiance 15s ease-in-out infinite'
                    }}
                  ></div>
                )}
              </div>
            </div>
            
            {/* Central glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vmin] h-[50vmin] rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, rgba(168, 85, 247, 0.15) 30%, transparent 70%)',
                filter: 'blur(5vmin)',
                opacity: 0.6,
                animation: !prefersReducedMotion ? 'grid-glow 8s ease-in-out infinite' : 'none',
                willChange: 'filter, opacity',
                zIndex: 1
              }}
            ></div>
            
            {/* Orbiting particles around the center */}
            <div className="absolute inset-0 z-10">
              {orbitingParticles}
            </div>
            
            {/* Subtle ambient particles */}
            {!prefersReducedMotion && Array.from({ length: 8 }).map((_, i) => {
              const size = Math.random() * 2 + 1;
              const angle = Math.random() * 360;
              const distance = 30 + Math.random() * 30;
              const x = 50 + Math.cos(angle * Math.PI / 180) * distance;
              const y = 50 + Math.sin(angle * Math.PI / 180) * distance;
              const duration = Math.random() * 20 + 20;
              const delay = Math.random() * 10;
              
              return (
                <div 
                  key={i}
                  className="absolute rounded-full"
                  style={{ 
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${x}%`,
                    top: `${y}%`,
                    backgroundColor: Math.random() > 0.5 ? 
                      'rgba(147, 51, 234, 0.5)' : 
                      'rgba(168, 85, 247, 0.5)',
                    boxShadow: `0 0 ${size * 2}px ${Math.random() > 0.5 ? 'rgba(147, 51, 234, 0.7)' : 'rgba(168, 85, 247, 0.7)'}`,
                    opacity: Math.random() * 0.5 + 0.3,
                    animation: `grid-ripple ${duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                    willChange: 'transform, opacity',
                    filter: 'blur(1px)',
                    zIndex: 3
                  }}
                />
              );
            })}
            
            {/* Horizon accent - subtle glowing line near bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: 'linear-gradient(to right, transparent 0%, rgba(168, 85, 247, 0.3) 15%, rgba(147, 51, 234, 0.3) 50%, rgba(168, 85, 247, 0.3) 85%, transparent 100%)',
                boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.2)',
                opacity: 0.7,
                animation: !prefersReducedMotion ? 'pulse-grid 6s ease-in-out infinite' : 'none',
                willChange: 'opacity',
                zIndex: 1
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  )
});

// Set display name for debugging purposes
GridRadiatingBackground.displayName = 'GridRadiatingBackground';

export default GridRadiatingBackground; 
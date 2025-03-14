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
            box-shadow: 0 0 40px 10px rgba(168, 85, 247, 0.15), inset 0 0 100px 40px rgba(147, 51, 234, 0.2);
            opacity: 0.7;
            transform: scale(1) translateZ(0);
          }
          50% { 
            box-shadow: 0 0 60px 15px rgba(168, 85, 247, 0.2), inset 0 0 120px 50px rgba(147, 51, 234, 0.3);
            opacity: 0.9;
            transform: scale(1.01) translateZ(0);
          }
        }
        
        /* Enhanced atmospheric shimmer with more dramatic glow */
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
        
        @keyframes atmospheric-clouds {
          0% { transform: translateX(0%) translateZ(0); opacity: 0.5; }
          50% { opacity: 0.7; }
          100% { transform: translateX(-100%) translateZ(0); opacity: 0.5; }
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
        
        /* Enhanced edge radiance with more glow */
        @keyframes edge-radiance {
          0%, 100% { 
            opacity: 0.95;
            filter: blur(0.5px) brightness(1.05);
            border-top-color: rgba(89, 209, 197, 0.7);
            box-shadow: 0 -5px 15px 1px rgba(89, 209, 197, 0.4);
          }
          33% { 
            opacity: 0.9;
            filter: blur(0.6px) brightness(1);
            border-top-color: rgba(89, 209, 197, 0.65);
            box-shadow: 0 -4px 12px 1px rgba(89, 209, 197, 0.35);
          }
          66% { 
            opacity: 1;
            filter: blur(0.4px) brightness(1.1);
            border-top-color: rgba(89, 209, 197, 0.8);
            box-shadow: 0 -6px 18px 2px rgba(89, 209, 197, 0.5);
          }
        }
        
        /* Glowing pulse animation for additional elements */
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.7;
            filter: blur(5px) brightness(1);
          }
          50% {
            opacity: 0.9;
            filter: blur(7px) brightness(1.15);
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
            opacity: 0.7,
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
                top: '16vh',
                background: 'linear-gradient(135deg, #030310 0%, #05051a 100%)',
                boxShadow: '0 0 80px 20px rgba(15, 15, 40, 0.6), inset 0 0 50px 25px rgba(5, 5, 15, 0.7)',
                border: '1px solid rgba(60, 60, 100, 0.4)',
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              {/* Enhanced planet texture overlay with directional lighting */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 65% 35%, rgba(90, 80, 170, 0.9) 0%, transparent 45%), radial-gradient(circle at 30% 70%, rgba(50, 50, 100, 0.8) 0%, transparent 60%)'
                }}
              ></div>
              
              {/* Edge highlight to enhance 3D appearance */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'radial-gradient(circle at 75% 25%, rgba(180, 160, 220, 0.25) 0%, transparent 30%)',
                  mixBlendMode: 'overlay'
                }}
              ></div>
              
              {/* Enhanced 3D surface texture with subtle highlights */}
              {!prefersReducedMotion && (
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 65% 35%, rgba(140, 100, 200, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 30% 60%, rgba(80, 130, 170, 0.15) 0%, transparent 60%)',
                    transform: 'translateZ(0)',
                    opacity: 0.8
                  }}
                ></div>
              )}
              
              {/* Surface detail for topography */}
              {!prefersReducedMotion && (
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    opacity: 0.07,
                    mixBlendMode: 'overlay'
                  }}
                ></div>
              )}
            </div>
            
            {/* === ATMOSPHERIC EFFECTS - REORGANIZED AND CONSOLIDATED === */}
            
            {/* Primary atmospheric halo - with enhanced pulsing glow effect */}
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
                  boxShadow: '0 0 100px 25px rgba(126, 34, 206, 0.15), inset 0 0 70px 25px rgba(168, 85, 247, 0.18)',
                  opacity: 0.85,
                  willChange: 'opacity, box-shadow',
                  animation: 'halo-pulse 35s ease-in-out infinite'
                }}
              ></div>
            )}
            
            {/* === HORIZON EDGE EFFECTS - CONSOLIDATED & ALIGNED === */}
            
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
                  background: 'linear-gradient(to bottom, rgba(89, 209, 197, 0.05) 0%, transparent 15%)',
                  border: '5px solid transparent',
                  borderTopColor: 'rgba(89, 209, 197, 0.75)',
                  borderLeftColor: 'rgba(89, 209, 197, 0.15)',
                  borderRightColor: 'rgba(89, 209, 197, 0.15)',
                  boxShadow: '0 -15px 40px 5px rgba(89, 209, 197, 0.6), inset 0 15px 35px 3px rgba(147, 51, 234, 0.4)',
                  filter: 'blur(4px)',
                  opacity: 0.97,
                  animation: 'enhanced-atmospheric-shimmer 30s ease-in-out infinite'
                }}
              ></div>
            )}
            
            {/* Atmospheric rim light with subtle movement */}
            {!prefersReducedMotion && (
              <div 
                className="absolute rounded-[50%]"
                style={{ 
                  width: '300vw',
                  height: '300vw',
                  left: '50%',
                  transform: 'translateX(-50%) translateZ(0)',
                  top: '16vh',
                  background: 'transparent',
                  boxShadow: 'inset 0 20px 25px -8px rgba(89, 209, 197, 0.75)',
                  filter: 'blur(3px)',
                  opacity: 0.9,
                  zIndex: 3,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                  animation: 'horizon-shimmer 15s ease-in-out infinite, atmospheric-dance 80s ease-in-out infinite'
                }}
              ></div>
            )}
            
            {/* Atmospheric cloud layer with more pronounced movement */}
            {!prefersReducedMotion && (
              <div 
                className="absolute rounded-[50%]"
                style={{
                  width: '300vw',
                  height: '300vw',
                  left: '50%',
                  top: '16vh',
                  background: 'transparent',
                  borderTop: '14vh solid rgba(89, 209, 197, 0.1)',
                  borderLeft: '5vh solid rgba(147, 51, 234, 0.04)',
                  borderRight: '5vh solid rgba(147, 51, 234, 0.04)',
                  transform: 'translateX(-50%) translateZ(0)',
                  filter: 'blur(12px)',
                  opacity: 0.85,
                  zIndex: 1,
                  animation: 'rotate-slow 220s linear infinite'
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
                  border: '1.5px solid rgba(89, 209, 197, 0.8)',
                  borderBottom: 'none',
                  borderLeft: '1px solid rgba(89, 209, 197, 0.2)',
                  borderRight: '1px solid rgba(89, 209, 197, 0.2)',
                  boxShadow: '0 -2px 10px 0.5px rgba(89, 209, 197, 0.5)',
                  filter: 'blur(0.4px)',
                  opacity: 0.98,
                  zIndex: 15,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                  animation: 'edge-radiance 15s ease-in-out infinite'
                }}
              ></div>
            )}

            {/* Additional intense highlight for extra glow */}
            {!prefersReducedMotion && (
              <div 
                className="absolute rounded-[50%]"
                style={{ 
                  width: '300vw',
                  height: '300vw',
                  left: '50%',
                  top: '16vh',
                  transform: 'translateX(-50%)',
                  border: '2.5px solid transparent',
                  borderTopColor: 'rgba(89, 209, 197, 0.65)',
                  borderLeftColor: 'rgba(89, 209, 197, 0.15)',
                  borderRightColor: 'rgba(89, 209, 197, 0.15)',
                  boxShadow: '0 -3px 15px 1px rgba(89, 209, 197, 0.45)',
                  filter: 'blur(0.8px)',
                  opacity: 0.92,
                  zIndex: 16,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen'
                }}
              ></div>
            )}
            
            {/* Inner glow accent for professional definition */}
            {!prefersReducedMotion && (
              <div 
                className="absolute rounded-[50%]"
                style={{ 
                  width: '299vw',
                  height: '299vw',
                  left: '50%',
                  top: '16.2vh',
                  transform: 'translateX(-50%)',
                  border: '0.75px solid transparent',
                  borderTopColor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 -1px 8px 0.5px rgba(255, 255, 255, 0.3)',
                  filter: 'blur(0.3px)',
                  opacity: 0.8,
                  zIndex: 17,
                  pointerEvents: 'none',
                  mixBlendMode: 'overlay'
                }}
              ></div>
            )}
            
            {/* Atmospheric bright halo effect for extra glow */}
            {!prefersReducedMotion && (
              <div 
                className="absolute rounded-[50%]"
                style={{ 
                  width: '302vw',
                  height: '302vw',
                  left: '50%',
                  top: '15.5vh',
                  transform: 'translateX(-50%)',
                  background: 'transparent',
                  border: '3px solid transparent',
                  borderTopColor: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 -10px 30px 5px rgba(255, 255, 255, 0.1), 0 -5px 15px 2px rgba(89, 209, 197, 0.3)',
                  filter: 'blur(5px)',
                  opacity: 0.7,
                  zIndex: 4,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                  animation: 'glow-pulse 20s ease-in-out infinite'
                }}
              ></div>
            )}
          </div>
        </div>
      )}
    </>
  )
});

// Set display name for debugging purposes
StarryBackground.displayName = 'StarryBackground';

export default StarryBackground; 
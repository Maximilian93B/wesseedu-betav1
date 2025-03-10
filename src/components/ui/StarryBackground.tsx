"use client"
import { useState, useEffect, useRef, memo } from 'react'

// Memoized component to prevent unnecessary re-renders
const StarryBackground = memo(() => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [orbitingParticles, setOrbitingParticles] = useState<React.ReactNode[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reduced number of stars and orbital particles
  const TOTAL_STARS = 100; // Reduced from 200
  const TOTAL_PARTICLES = 15; // Reduced from 30
  
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
        const size = Math.random() * 2.2;
        const isLarger = Math.random() > 0.92;
        const hasGlow = Math.random() > 0.7; // Reduced glow frequency from 0.6
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
              // Simplify box shadow for performance
              boxShadow: hasGlow ? 
                `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})` : 
                'none',
              // Optimize animation - longer durations, fewer variations
              animation: `twinkle ${Math.random() * 3 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        );
      });
      
      setStars(generatedStars);
    }
    
    // Only generate orbiting particles if we haven't yet
    if (orbitingParticles.length === 0) {
      const generatedOrbitingParticles = Array.from({ length: TOTAL_PARTICLES }).map((_, i) => {
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
              // Simplify box shadow for better performance
              boxShadow: `0 0 ${Math.random() * 2 + 1}px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
              left: `calc(50% + ${distance * Math.cos(angle * Math.PI / 180)}vmin)`,
              top: `calc(50% + ${distance * Math.sin(angle * Math.PI / 180)}vmin)`,
              // Use slower animations to reduce CPU usage
              animation: `rotate-slow ${Math.random() * 20 + 80}s linear infinite${Math.random() > 0.5 ? ' reverse' : ''}`,
              opacity: Math.random() * 0.3 + 0.7
            }}
          />
        );
      });
      
      setOrbitingParticles(generatedOrbitingParticles);
    }
  }, [isVisible, stars.length, orbitingParticles.length]);
  
  // Add any necessary CSS keyframes
  return (
    <>
      {/* Add essential keyframes */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* Fixed background container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -110 }}>
        {/* Deep space gradient background with richer blacks - reducing darkness to improve planet visibility */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse at center, #05060a 0%, #040508 45%, #020307 70%, #010205 100%)',
            opacity: 0.85, // Reduced opacity to make background less dark
          }}
        ></div>
        
        {/* Stars are now rendered from state, generated only on client and when visible */}
        <div className="absolute inset-0">
          {stars}
        </div>
        
        {/* Simplified noise texture - reduced opacity further */}
        <div 
          className="fixed inset-0 pointer-events-none" 
          style={{ 
            zIndex: -105,
            backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFZSURBVGhD7ZgxTsNAEEX/ItcgPQfgBFyAkpqGBuUCHCLpKWjpOQMlBQUFNR0FRyAFHR3iP7GjKGuv7NjSWP6f9GTt7tjy82i9hIiIiIjIAjmZCLvgbvmt3az6Ojs5BW8TYbxTn4K5xj25qv3CXxvg9sE8bpqR92KFHa36j7xS39Q+qO2D47aqxrJ5LA04HiP+mWqvv9zzFdXZUJ2eMIKp9VP9Oi3PQg0r6HM02rqpMfJoe+B6H3yvnUtX1fMYXZF3D7gAD2DfCPDTUPelz5Oce2AHXICHdPwt9a0BnpcMI9ige54JzKFwriXDCDboXiPAnAr/Wbqt7cHnOh0jRH9r61Nwqy4rfkhxI9ig7uVJg0bFjfiXunN1OpbrGZ1fRHfUhZ/3A/UndSPYoFuLRnRHXWQ9o0VERERkcOZzsR1oxC+2g+/aOTHfi61l4BfbIiIiIiIzI4QfiKSE8+j7GrIAAAAASUVORK5CYII=") repeat',
            opacity: 0.005 // Reduced from 0.01
          }}
        ></div>
      </div>
      
      {/* Black sphere with planetary elements - simplified for performance */}
      {isVisible && (
        <div 
          className="fixed inset-0 pointer-events-none overflow-visible"
          style={{ 
            zIndex: -80,
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none overflow-visible"
            style={{ 
              transform: 'translate(-50%, -50%)',
              mixBlendMode: 'screen', 
            }}
          >
            {/* Planet core with simplified effects - increased visibility */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
              style={{ 
                width: '120vmin',
                height: '120vmin',
                background: 'linear-gradient(135deg, #030310 0%, #05051a 100%)',
                boxShadow: '0 0 90px 25px rgba(15, 15, 40, 0.7), inset 0 0 60px 30px rgba(5, 5, 15, 0.8)',
                border: '1px solid rgba(60, 60, 100, 0.4)',
                zIndex: 1,
                overflow: 'hidden',
                willChange: 'transform', // Performance hint for browsers
              }}
            >
              {/* Simplified glowing effects - brighter glow */}
              <div className="absolute -inset-[5%] -z-10 rounded-full" 
                style={{ 
                  background: 'radial-gradient(circle at center, transparent 78%, rgba(160, 220, 255, 0.5) 82%, rgba(180, 130, 255, 0.7) 86%, rgba(230, 110, 255, 0.6) 90%, rgba(120, 240, 255, 0.5) 94%, transparent 98%)',
                  filter: 'blur(5px)',
                  opacity: 0.98,
                }}
              ></div>
              
              {/* Planet texture overlay - increased visibility */}
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(60, 60, 100, 0.8) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(50, 50, 80, 0.8) 0%, transparent 60%)'
                }}
              ></div>
            </div>
            
            {/* Primary glow ring - brighter */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
              style={{ 
                width: '145vmin',
                height: '145vmin',
                background: 'radial-gradient(circle at center, transparent 72%, rgba(56, 189, 248, 0.2) 80%, rgba(14, 165, 233, 0.85) 88%, rgba(3, 105, 161, 0.45) 95%, transparent 100%)',
                opacity: 0.98,
                zIndex: 0,
                filter: 'blur(1px)',
                boxShadow: '0 0 80px 35px rgba(56, 189, 248, 0.35)',
                willChange: 'transform',
                transform: 'rotate(0deg)',
                animation: 'rotate-slow 120s linear infinite'
              }}
            ></div>
            
            {/* Secondary glow ring - brighter */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
              style={{ 
                width: '150vmin',
                height: '150vmin',
                background: 'radial-gradient(circle at center, transparent 72%, rgba(168, 85, 247, 0.2) 80%, rgba(147, 51, 234, 0.85) 88%, rgba(126, 34, 206, 0.45) 95%, transparent 100%)',
                opacity: 0.98,
                transform: 'rotate(60deg)',
                zIndex: 0,
                filter: 'blur(1px)',
                boxShadow: '0 0 80px 35px rgba(168, 85, 247, 0.35)',
                willChange: 'transform',
                animation: 'rotate-slow 180s linear infinite reverse'
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
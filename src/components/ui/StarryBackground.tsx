"use client"
import { useState, useEffect } from 'react'

const StarryBackground = () => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [orbitingParticles, setOrbitingParticles] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    // Generate stars only on the client side
    const generatedStars = Array.from({ length: 200 }).map((_, i) => {
      const size = Math.random() * 2.2;
      const isLarger = Math.random() > 0.92;
      const hasGlow = Math.random() > 0.6;
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
            boxShadow: hasGlow ? 
              `0 0 ${Math.random() * 5 + 3}px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})${isBright ? ', 0 0 10px rgba(200, 220, 255, 0.8)' : ''}` : 
              'none',
            animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      );
    });
    
    // Generate orbital particles
    const generatedOrbitingParticles = Array.from({ length: 30 }).map((_, i) => {
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
            boxShadow: `0 0 ${Math.random() * 3 + 2}px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
            left: `calc(50% + ${distance * Math.cos(angle * Math.PI / 180)}vmin)`,
            top: `calc(50% + ${distance * Math.sin(angle * Math.PI / 180)}vmin)`,
            animation: `rotate-slow ${Math.random() * 30 + 60}s linear infinite${Math.random() > 0.5 ? ' reverse' : ''}`,
            opacity: Math.random() * 0.3 + 0.7
          }}
        />
      );
    });
    
    setStars(generatedStars);
    setOrbitingParticles(generatedOrbitingParticles);
  }, []); // Empty dependency array ensures this runs only once on mount
  
  return (
    <>
      {/* Fixed background container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -110 }}>
        {/* Deep space gradient background with richer blacks */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse at center, #020204 0%, #010103 45%, #000002 70%, #000000 100%)',
          }}
        ></div>
        
        {/* Stars are now rendered from state, generated only on client */}
        <div className="absolute inset-0">
          {stars}
        </div>
        
        {/* Add a very subtle noise texture for depth and clarity */}
        <div 
          className="fixed inset-0 pointer-events-none" 
          style={{ 
            zIndex: -105,
            backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFZSURBVGhD7ZgxTsNAEEX/ItcgPQfgBFyAkpqGBuUCHCLpKWjpOQMlBQUFNR0FRyAFHR3iP7GjKGuv7NjSWP6f9GTt7tjy82i9hIiIiIjIAjmZCLvgbvmt3az6Ojs5BW8TYbxTn4K5xj25qv3CXxvg9sE8bpqR92KFHa36j7xS39Q+qO2D47aqxrJ5LA04HiP+mWqvv9zzFdXZUJ2eMIKp9VP9Oi3PQg0r6HM02rqpMfJoe+B6H3yvnUtX1fMYXZF3D7gAD2DfCPDTUPelz5Oce2AHXICHdPwt9a0BnpcMI9ige54JzKFwriXDCDboXiPAnAr/Wbqt7cHnOh0jRH9r61Nwqy4rfkhxI9ig7uVJg0bFjfiXunN1OpbrGZ1fRHfUhZ/3A/UndSPYoFuLRnRHXWQ9o0VERERkcOZzsR1oxC+2g+/aOTHfi61l4BfbIiIiIiIzI4QfiKSE8+j7GrIAAAAASUVORK5CYII=") repeat',
            opacity: 0.015
          }}
        ></div>
      </div>
      
      {/* Black sphere with planetary elements */}
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
          {/* Planet core with enhanced depth and details */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full animate-subtle-rotate"
            style={{ 
              width: '120vmin',
              height: '120vmin',
              background: 'linear-gradient(135deg, #010106 0%, #020209 100%)',
              boxShadow: '0 0 90px 25px rgba(5, 5, 20, 0.7), inset 0 0 60px 30px rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(40, 40, 70, 0.3)',
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            {/* Vibrant glowing ring */}
            <div className="absolute -inset-[5%] -z-10 rounded-full animate-pulse-glow" 
              style={{ 
                background: 'radial-gradient(circle at center, transparent 78%, rgba(140, 200, 255, 0.4) 82%, rgba(160, 110, 255, 0.6) 86%, rgba(210, 90, 255, 0.5) 90%, rgba(100, 220, 255, 0.4) 94%, transparent 98%)',
                filter: 'blur(5px)',
                opacity: 0.95,
                animationDuration: '10s',
                boxShadow: '0 0 40px 10px rgba(140, 200, 255, 0.3), 0 0 80px 20px rgba(160, 110, 255, 0.2)',
                mixBlendMode: 'screen'
              }}
            ></div>
            
            {/* Enhanced outer glow effect - multi-layered */}
            <div className="absolute -inset-[15%] -z-10 rounded-full animate-pulse-glow" 
              style={{ 
                background: 'radial-gradient(circle at center, transparent 30%, rgba(56, 189, 248, 0.03) 60%, rgba(168, 85, 247, 0.05) 75%, rgba(236, 72, 153, 0.04) 85%, transparent 100%)',
                filter: 'blur(20px)',
                opacity: 0.9,
                animationDuration: '15s',
                mixBlendMode: 'screen'
              }}
            ></div>
            
            {/* Secondary pulsing glow */}
            <div className="absolute -inset-[8%] -z-10 rounded-full animate-pulse-glow"
              style={{ 
                background: 'radial-gradient(circle at center, transparent 50%, rgba(14, 165, 233, 0.06) 75%, rgba(147, 51, 234, 0.08) 85%, rgba(219, 39, 119, 0.06) 95%, transparent 100%)',
                filter: 'blur(15px)',
                opacity: 0.85,
                animationDuration: '8s',
                animationDelay: '1s',
                mixBlendMode: 'screen'
              }}
            ></div>
            
            {/* Intense edge highlight */}
            <div className="absolute -inset-[2%] -z-10 rounded-full"
              style={{ 
                background: 'radial-gradient(circle at center, transparent 80%, rgba(110, 120, 200, 0.15) 90%, rgba(130, 140, 220, 0.2) 95%, transparent 100%)',
                filter: 'blur(8px)',
                opacity: 0.9,
                mixBlendMode: 'screen'
              }}
            ></div>
            
            {/* Base continent-like texture patterns */}
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(40, 40, 90, 0.8) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(35, 35, 70, 0.8) 0%, transparent 60%)'
              }}
            ></div>
            
            {/* Planet texture overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(40, 40, 70, 0.8) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(30, 30, 50, 0.8) 0%, transparent 60%)'
              }}
            ></div>
          </div>
          
          {/* Primary blue glow ring - refined gradient */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
            style={{ 
              width: '145vmin',
              height: '145vmin',
              background: 'radial-gradient(circle at center, transparent 72%, rgba(56, 189, 248, 0.15) 80%, rgba(14, 165, 233, 0.75) 88%, rgba(3, 105, 161, 0.35) 95%, transparent 100%)',
              opacity: 0.95,
              zIndex: 0,
              filter: 'blur(1px)',
              boxShadow: '0 0 80px 35px rgba(56, 189, 248, 0.25), inset 0 0 30px 10px rgba(56, 189, 248, 0.15)',
              animation: 'rotate-slow 120s linear infinite'
            }}
          ></div>
          
          {/* Secondary purple glow ring - refined gradient */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
            style={{ 
              width: '150vmin',
              height: '150vmin',
              background: 'radial-gradient(circle at center, transparent 72%, rgba(168, 85, 247, 0.15) 80%, rgba(147, 51, 234, 0.75) 88%, rgba(126, 34, 206, 0.35) 95%, transparent 100%)',
              opacity: 0.95,
              transform: 'rotate(60deg)',
              zIndex: 0,
              filter: 'blur(1px)',
              boxShadow: '0 0 80px 35px rgba(168, 85, 247, 0.25), inset 0 0 30px 10px rgba(168, 85, 247, 0.15)',
              animation: 'rotate-slow 180s linear infinite reverse'
            }}
          ></div>
          
          {/* Tertiary pink glow ring - refined gradient */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
            style={{ 
              width: '148vmin',
              height: '148vmin',
              background: 'radial-gradient(circle at center, transparent 72%, rgba(244, 114, 182, 0.15) 80%, rgba(236, 72, 153, 0.75) 88%, rgba(219, 39, 119, 0.35) 95%, transparent 100%)',
              opacity: 0.95,
              transform: 'rotate(200deg)',
              zIndex: 0,
              filter: 'blur(1px)',
              boxShadow: '0 0 80px 35px rgba(244, 114, 182, 0.25), inset 0 0 30px 10px rgba(244, 114, 182, 0.15)',
              animation: 'rotate-slow 240s linear infinite'
            }}
          ></div>

          
          {/* Subtle ambient glow with gentle pulsing */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full animate-pulse-slow"
            style={{ 
              width: '200vmin',
              height: '200vmin',
              background: 'radial-gradient(circle at center, transparent 60%, rgba(56, 189, 248, 0.05) 70%, rgba(168, 85, 247, 0.08) 80%, rgba(20, 184, 166, 0.06) 90%, transparent 100%)',
              opacity: 0.95,
              zIndex: 0,
              filter: 'blur(3px)',
              animationDuration: '8s',
              boxShadow: '0 0 120px 60px rgba(56, 189, 248, 0.08)'
            }}
          ></div>
          
          {/* Very subtle orbital ring - adds depth */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[155vmin] h-[155vmin] rounded-full"
            style={{ 
              border: '1px solid rgba(120, 120, 180, 0.15)',
              transform: 'rotate3d(1, 0.3, 0.2, 75deg)',
              opacity: 0.7,
              boxShadow: '0 0 15px 2px rgba(120, 120, 180, 0.1)',
              animation: 'rotate-slow 240s linear infinite'
            }}
          ></div>
          
          {/* Light dust particles in orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170vmin] h-[170vmin]" style={{ transform: 'rotate3d(1, 0.5, 0.2, 70deg)' }}>
            {orbitingParticles}
          </div>
          
          {/* Secondary smaller planet sphere positioned to the right */}
          <div 
            className="absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-float-orbit"
            style={{ 
              zIndex: -40,
              animationDuration: '90s'
            }}
          >
            {/* Planet core */}
            <div 
              className="relative aspect-square rounded-full animate-subtle-rotate"
              style={{ 
                width: '45vmin',
                height: '45vmin',
                background: 'linear-gradient(135deg, #010105 0%, #020208 100%)',
                boxShadow: '0 0 40px 15px rgba(5, 5, 20, 0.6), inset 0 0 30px 15px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(40, 40, 70, 0.2)',
                overflow: 'hidden',
                animationDuration: '70s'
              }}
            >
              {/* Texture overlay */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(40, 40, 90, 0.7) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(35, 35, 70, 0.7) 0%, transparent 50%)'
                }}
              ></div>
              
              {/* Craters */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: 'radial-gradient(circle at 40% 30%, rgba(0, 0, 0, 0.8) 0%, transparent 10%), radial-gradient(circle at 70% 65%, rgba(0, 0, 0, 0.7) 0%, transparent 8%)'
                }}
              ></div>
              
              {/* Atmospheric glow */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: 'radial-gradient(circle at center, transparent 85%, rgba(70, 70, 130, 0.2) 90%, rgba(90, 90, 160, 0.3) 95%, rgba(110, 110, 190, 0.4) 100%)',
                  opacity: 0.8,
                  mixBlendMode: 'screen',
                  animationDuration: '6s'
                }}
              ></div>
            </div>
            
            {/* Glow ring */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full animate-pulse-glow"
              style={{ 
                width: '55vmin',
                height: '55vmin',
                background: 'radial-gradient(circle at center, transparent 75%, rgba(110, 80, 190, 0.15) 85%, rgba(110, 80, 190, 0.65) 90%, rgba(90, 70, 160, 0.25) 95%, transparent 100%)',
                opacity: 0.9,
                zIndex: 0,
                filter: 'blur(1px)',
                boxShadow: '0 0 60px 20px rgba(110, 80, 190, 0.2), inset 0 0 20px 5px rgba(110, 80, 190, 0.1)',
                animation: 'rotate-slow 100s linear infinite, pulse-glow 7s ease-in-out infinite',
                mixBlendMode: 'screen'
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Style for animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.7; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.32; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; filter: blur(1px); }
          50% { opacity: 1; filter: blur(2px); }
        }
        
        @keyframes float-orbit {
          0%, 100% { transform: translateX(-5%) translateY(0); }
          25% { transform: translateX(0) translateY(3%); }
          50% { transform: translateX(5%) translateY(0); }
          75% { transform: translateX(0) translateY(-3%); }
        }
        
        @keyframes animate-subtle-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default StarryBackground; 
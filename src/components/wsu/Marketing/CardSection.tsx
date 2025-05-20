import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { CARDS } from "./CardSectionData"
import { MarketingCard } from "./MarketingCard"

// Disable animations in production for better performance
const ENABLE_ANIMATIONS = false;

// Simplified variants with minimal animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.03,
      duration: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 5, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 40 }
  }
}

export function CardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Disable animations based on environment, user preference, or mobile
  const disableAnimations = !ENABLE_ANIMATIONS || !!prefersReducedMotion || isMobileView;
  
  // Check for mobile view with debounce
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobile();
    
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % CARDS.length);
  const prevSlide = () => setActiveIndex((prev) => (prev === 0 ? CARDS.length - 1 : prev - 1));
  
  // Card click handler - simplified
  const handleCardClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };
  
  // Optimized drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (disableAnimations) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    setStartX(clientX || 0);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || disableAnimations) return;
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const diff = startX - (clientX || 0);
    
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      setIsDragging(false);
    }
  };
  
  const handleDragEnd = () => setIsDragging(false);
  
  // Simplified keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  // Remove animation styles for better performance
  useEffect(() => {
    if (disableAnimations) return;
    
    // Use less resource-intensive animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes subtle-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
      .animate-subtle-float {
        animation: subtle-float 9s ease-in-out infinite;
      }
      
      @keyframes gentle-glow {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.55; }
      }
      .animate-gentle-glow {
        animation: gentle-glow 12s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [disableAnimations]);
  
  return (
    <div className="w-full relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
      {/* Background pattern - reduced opacity for better performance */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      ></div>
      
      {/* Background glow effects - simplified and reduced for better performance */}
      {!disableAnimations && (
        <>
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px] -z-10 animate-gentle-glow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px] -z-10 animate-gentle-glow" style={{ animationDelay: '-5s' }}></div>
        </>
      )}
      
      <div 
        ref={sectionRef} 
        id="card-section-content" 
        className="relative w-full max-w-7xl mx-auto flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div 
          variants={disableAnimations ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          {/* Header Badge */}
          <motion.div 
            variants={disableAnimations ? undefined : itemVariants}
            className="inline-block mb-4 sm:mb-5"
          >
            <span className="inline-flex items-center px-3 py-1 text-[10px] sm:text-xs font-medium rounded-full text-white border border-white/30 shadow-sm"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1.5"></span>
              Platform Testing - Now open
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h2 
            variants={disableAnimations ? undefined : itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 sm:mb-5 drop-shadow-sm font-display"
          >
            Your Gateway to Impact Investing
          </motion.h2>
          
          {/* Subheading */}
          <motion.p 
            variants={disableAnimations ? undefined : itemVariants}
            className="text-base sm:text-lg md:text-lg text-white/95 max-w-2xl mx-auto mb-6 sm:mb-10 font-medium font-body"
          >
            Join our community of impact investors gaining early access to high-potential sustainable startups.
          </motion.p>
          
          {/* Trust indicators */}
          <motion.div 
            variants={disableAnimations ? undefined : itemVariants}
            className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-3 sm:gap-y-4 w-full"
          >
            <span className="flex items-center text-sm sm:text-base text-white font-body">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2 border border-white/40 shadow-md">
                <Check size={12} />
              </div>
              <span className="font-medium">Vetted Opportunities</span>
            </span>
            <span className="flex items-center text-sm sm:text-base text-white font-body">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2 border border-white/40 shadow-md">
                <Check size={12} />
              </div>
              <span className="font-medium">Community-driven approach</span>
            </span>
            <span className="flex items-center text-sm sm:text-base text-white font-body">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2 border border-white/40 shadow-md">
                <Check size={12} />
              </div>
              <span className="font-medium">Values-aligned growth</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Card carousel container */}
        <div className="w-full max-w-[95%] sm:max-w-[650px] mx-auto relative mb-8 sm:mb-12">
          {/* Carousel navigation buttons - Adjusted positioning */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between items-center z-30 px-0 sm:-mx-6 md:-mx-10 lg:-mx-16">
            <button 
              onClick={prevSlide}
              className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-full bg-white text-[#49c628] flex items-center justify-center border border-white/70 shadow-lg hover:bg-white/90 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 rotate-180" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-full bg-white text-[#49c628] flex items-center justify-center border border-white/70 shadow-lg hover:bg-white/90 transition-all duration-300"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div 
            ref={carouselRef}
            className="relative h-[450px] sm:h-[520px] md:h-[580px] mx-auto"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <AnimatePresence initial={false}>
              {CARDS.map((card, index) => {
                const position = (index - activeIndex + CARDS.length) % CARDS.length;
                const normalizedPosition = position <= CARDS.length / 2 ? position : position - CARDS.length;
                
                const visible = Math.abs(normalizedPosition) <= 1;
                if (!visible) return null;
                
                const zIndex = 20 - Math.abs(normalizedPosition) * 5;
                
                // Simplified positioning logic with reduced effects for better performance
                const scale = normalizedPosition === 0 ? 1 : (isMobileView ? 0.96 : 0.94);
                const opacity = normalizedPosition === 0 ? 1 : 0.8;
                
                const xPosition = normalizedPosition === 0 ? 0 : `${normalizedPosition * (isMobileView ? 30 : 45)}%`;
                const yPosition = normalizedPosition === 0 ? 0 : (isMobileView ? 8 : 12);
                
                return (
                  <motion.div
                    key={card.id}
                    className="absolute top-0 left-0 right-0 mx-auto cursor-pointer"
                    style={{ 
                      width: "100%",
                      maxWidth: "100%"
                    }}
                    initial={{ opacity: 0 }}
                    animate={disableAnimations ? 
                      { 
                        x: normalizedPosition === 0 ? 0 : (normalizedPosition * 100), 
                        opacity: normalizedPosition === 0 ? 1 : 0,
                        scale: 1,
                        zIndex
                      } : 
                      { 
                        x: xPosition,
                        y: yPosition,
                        scale,
                        opacity,
                        zIndex,
                        willChange: 'transform, opacity'
                      }
                    }
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 50,
                      mass: 0.6
                    }}
                    onClick={() => handleCardClick(index)}
                    whileHover={disableAnimations ? {} : {
                      scale: scale * 1.01,
                      y: yPosition - 3,
                      transition: { duration: 0.15 }
                    }}
                  >
                    <MarketingCard 
                      card={card} 
                      index={index} 
                      isActive={normalizedPosition === 0} 
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Enhanced pagination dots */}
          <div className="flex justify-center items-center mt-4 sm:mt-8 space-x-2 sm:space-x-2.5">
            {CARDS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-200 ${
                  idx === activeIndex 
                    ? 'bg-white w-5 sm:w-7 shadow-sm' 
                    : 'bg-white/40 w-2 sm:w-2.5 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom note/footer */}
        <div className="w-full text-center mt-4 sm:mt-5 mb-2 sm:mb-3">
          <div className="inline-flex flex-wrap justify-center items-center px-3 py-2 sm:px-4 sm:py-2.5 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80 mr-2 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium font-helvetica">Limited spots</span>
            <span className="mx-1.5 sm:mx-2.5 text-white/50">•</span>
            <span className="text-xs sm:text-sm font-body">Only 50 new investor accounts available this quarter</span>
          </div>
        </div>
      </div>
    </div>
  )
} 
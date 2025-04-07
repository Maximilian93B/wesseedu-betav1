import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { CARDS } from "./CardSectionData"
import { MarketingCard } from "./MarketingCard"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
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
  
  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % CARDS.length);
  const prevSlide = () => setActiveIndex((prev) => (prev === 0 ? CARDS.length - 1 : prev - 1));
  
  // Click handler for cards
  const handleCardClick = (index: number) => {
    if (index === activeIndex) return; // Already active card
    
    // Determine if we're going forward or backward
    const normalizedPosition = (index - activeIndex + CARDS.length) % CARDS.length;
    if (normalizedPosition <= CARDS.length / 2 && normalizedPosition !== 0) {
      nextSlide();
    } else if (normalizedPosition !== 0) {
      prevSlide();
    }
  };
  
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    setStartX(clientX || 0);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const diff = startX - (clientX || 0);
    
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      setIsDragging(false);
    }
  };
  
  const handleDragEnd = () => setIsDragging(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  // Animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes subtle-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      .animate-subtle-float {
        animation: subtle-float 6s ease-in-out infinite;
      }
      
      @keyframes gentle-glow {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.7; }
      }
      .animate-gentle-glow {
        animation: gentle-glow 8s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="w-full relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Green Apple gradient background */}
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      ></div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-white/15 rounded-full blur-[150px] -z-10 animate-gentle-glow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-white/15 rounded-full blur-[150px] -z-10 animate-gentle-glow" style={{ animationDelay: '-4s' }}></div>
      
      <div 
        ref={sectionRef} 
        id="card-section-content" 
        className="relative w-full max-w-7xl mx-auto flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full text-center mb-10 sm:mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          {/* Header Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-4 sm:mb-6">
            <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full text-white border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1.5 sm:mr-2"></span>
              Platform Testing - Now open
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h2 
            variants={itemVariants} 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 sm:mb-6 drop-shadow-sm"
          >
            Your Gateway to Impact Investing
          </motion.h2>
          
          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto mb-8 sm:mb-12 font-medium"
          >
            Join our community of impact investors gaining early access to high-potential sustainable startups.
          </motion.p>
          
          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-3 sm:gap-y-5 w-full"
          >
            <span className="flex items-center text-xs sm:text-sm md:text-base text-white">
              <div className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/20 text-white mr-2 sm:mr-3 border border-white/40 shadow-md">
                <Check size={12} />
              </div>
              <span className="font-medium">Vetted Opportunities</span>
            </span>
            <span className="flex items-center text-xs sm:text-sm md:text-base text-white">
              <div className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/20 text-white mr-2 sm:mr-3 border border-white/40 shadow-md">
                <Check size={12} />
              </div>
              <span className="font-medium">Community-driven approach</span>
            </span>
            <span className="flex items-center text-xs sm:text-sm md:text-base text-white">
              <div className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/20 text-white mr-2 sm:mr-3 border border-white/40 shadow-md">
                <Check size={12} />
              </div>
              <span className="font-medium">Values-aligned growth</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Card carousel container with improved spacing and alignment */}
        <div className="w-full max-w-[90%] sm:max-w-[600px] mx-auto relative mb-8 sm:mb-12">
          {/* Carousel navigation buttons - PUSHED OUTWARD */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between items-center z-30 px-1 sm:-mx-6 md:-mx-16 lg:-mx-24">
            <button 
              onClick={prevSlide}
              className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              aria-label="Previous slide"
            >
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 rotate-180" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              aria-label="Next slide"
            >
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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
                // Adjust scale for mobile
                const scale = normalizedPosition === 0 ? 1 : (isMobileView ? 0.9 : 0.85) - Math.abs(normalizedPosition) * (isMobileView ? 0.05 : 0.1);
                const opacity = normalizedPosition === 0 ? 1 : 0.7 - Math.abs(normalizedPosition) * 0.3;
                
                // Adjust positions for mobile
                const xPosition = normalizedPosition === 0 ? 0 : `${normalizedPosition * (isMobileView ? 45 : 65)}%`;
                const yPosition = normalizedPosition === 0 ? 0 : (isMobileView ? 10 : 20) * Math.abs(normalizedPosition);
                
                return (
                  <motion.div
                    key={card.id}
                    className="absolute top-0 left-0 right-0 mx-auto cursor-pointer"
                    style={{ 
                      width: "100%",
                      maxWidth: "100%"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      x: xPosition,
                      y: yPosition,
                      scale,
                      opacity,
                      zIndex,
                      filter: normalizedPosition !== 0 ? 'brightness(0.92) blur(1px)' : 'brightness(1)'
                    }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30
                    }}
                    onClick={() => handleCardClick(index)}
                    whileHover={{
                      scale: scale * 1.02,
                      y: yPosition - 5,
                      filter: normalizedPosition === 0 ? 'brightness(1.05)' : 'brightness(0.95)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <MarketingCard card={card} index={index} isActive={normalizedPosition === 0} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Enhanced pagination dots */}
          <div className="flex justify-center items-center mt-4 sm:mt-8 space-x-2 sm:space-x-3">
            {CARDS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? 'bg-white w-6 sm:w-8 shadow-[0_0_10px_rgba(255,255,255,0.7)]' 
                    : 'bg-white/40 w-2 sm:w-2.5 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom note/footer with improved styling */}
        <div className="w-full text-center mt-4 sm:mt-6 mb-2 sm:mb-4">
          <div className="inline-flex flex-wrap justify-center items-center px-3 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/80 mr-2 sm:mr-2.5 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium">Limited spots</span>
            <span className="mx-2 sm:mx-3 text-white/50">•</span>
            <span className="text-xs sm:text-sm">Only 50 new investor accounts available this quarter</span>
          </div>
        </div>
      </div>
    </div>
  )
} 
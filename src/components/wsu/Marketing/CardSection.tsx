import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { CARDS } from "./CardSectionData"
import { MarketingCard } from "./MarketingCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    <div className="w-full min-h-screen relative py-16 md:py-24 lg:py-32">
      {/* Green Apple gradient background */}
      <div className="absolute inset-0"></div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -z-10"></div>
      
      <div ref={sectionRef} id="card-section" className="relative min-h-[80vh] w-full flex flex-col justify-center items-center">
        {/* Header Section - Adjusted spacing and alignment */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full text-center mb-12 md:mb-16 px-4 max-w-3xl mx-auto"
        >
          {/* Header Badge - More space above title */}
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/90 text-green-700 border border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              Platform Testing - Now open
            </span>
          </motion.div>
          
          {/* Main Heading - Larger and properly centered */}
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6"
          >
            Your Gateway to Impact Investing
          </motion.h2>
          
          {/* Subheading - Better wrapping */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto mb-12"
          >
            Join our community of impact investors gaining early access to high-potential sustainable startups.
          </motion.p>
          
          {/* Trust indicators - Improved spacing and layout */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-x-10 md:gap-x-16 gap-y-4 w-full"
          >
            <span className="flex items-center text-xs sm:text-sm text-white">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2.5">
                <Check size={12} />
              </div>
              <span>Vetted Opportunities</span>
            </span>
            <span className="flex items-center text-xs sm:text-sm text-white">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2.5">
                <Check size={12} />
              </div>
              <span>Community-driven approach</span>
            </span>
            <span className="flex items-center text-xs sm:text-sm text-white">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2.5">
                <Check size={12} />
              </div>
              <span>Values-aligned growth</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Standardized card (exact clone of the image) */}
        <div className="w-full max-w-[520px] mx-auto px-4 relative">
          {/* Carousel area */}
          <div 
            ref={carouselRef}
            className="relative h-[600px] mx-auto"
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
                // Calculate position relative to active index
                const position = (index - activeIndex + CARDS.length) % CARDS.length;
                // Create normalized position: -1 (left), 0 (center), 1 (right)
                const normalizedPosition = position <= CARDS.length / 2 ? position : position - CARDS.length;
                
                // Show up to 2 cards on each side
                const visible = Math.abs(normalizedPosition) <= 2;
                if (!visible) return null;
                
                // Card styling based on position
                const zIndex = 20 - Math.abs(normalizedPosition) * 5;
                const scale = normalizedPosition === 0 ? 1 : 0.85 - Math.abs(normalizedPosition) * 0.1;
                const opacity = normalizedPosition === 0 ? 1 : 0.7 - Math.abs(normalizedPosition) * 0.2;
                
                // Position cards in a fan layout
                const xPosition = normalizedPosition === 0 ? 0 : `${normalizedPosition * 60}%`;
                const yPosition = normalizedPosition === 0 ? 0 : 25 * Math.abs(normalizedPosition);
                
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
                      filter: normalizedPosition !== 0 ? 'brightness(0.95)' : 'brightness(1)'
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
                      filter: 'brightness(1.05)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Pass normalizedPosition === 0 as isActive to ensure only center card gets active styling */}
                    <MarketingCard card={card} index={index} isActive={normalizedPosition === 0} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {CARDS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom note/footer */}
        <div className="w-full text-center mt-12 md:mt-16">
          <p className="text-xs text-white/80 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5"></span>
              <span>Limited spots</span>
            </span>
            <span>Only 50 new investor accounts available this quarter</span>
          </p>
        </div>
      </div>
    </div>
  )
} 
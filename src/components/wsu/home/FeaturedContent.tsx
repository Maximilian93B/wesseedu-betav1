import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect, TouchEvent } from "react";

export function FeaturedContent() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Reduce minimum swipe distance for mobile
  const minSwipeDistance = 30;
  
  // Handle next/previous
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  // Improved touch handlers for swipe functionality
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };
  
  // Improved animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };
  
  const cards = [
    {
      title: "ESG News & Analysis",
      description: "Stay informed on sustainable investing trends with curated news and expert analysis.",
      linkText: "Browse Latest News",
      linkHref: "/news",
      imageSrc: "/images/pexels-googledeepmind-17485678.jpg", 
      imageAlt: "Sustainable investing news analytics dashboard"
    },
    {
      title: "Top Rated Companies",
      description: "Discover sustainable businesses with strong ESG scores and positive environmental impact.",
      linkText: "Explore Companies",
      linkHref: "/companies",
      imageSrc: "/images/pexels-pavel-danilyuk-8438975.jpg",
      imageAlt: "Sustainable companies ranking chart"
    },
    {
      title: "Impact Tracking",
      description: "Track how your portfolio contributes to sustainability goals and compare against benchmarks.",
      linkText: "Track Your Impact",
      linkHref: "/impact",
      imageSrc: "/images/pexels-fabien-burgue-1052232-2052521.jpg",
      imageAlt: "Environmental impact tracking dashboard"
    }
  ];

  // Track slide direction for animations - with proper typing
  const [direction, setDirection] = useState(0);
  const prevActiveSlide = useRef(activeSlide);

  // Update direction when active slide changes
  useEffect(() => {
    // Determine direction based on which way we're moving
    const newDirection = activeSlide > prevActiveSlide.current ? 1 : -1;
    setDirection(newDirection);
    prevActiveSlide.current = activeSlide;
  }, [activeSlide]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* LEFT SIDE - Text content that integrates with blue-50 background */}
      <div className="w-full md:w-1/2 bg-black text-white flex items-center justify-center py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-xl w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
          >
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-slate-700 bg-slate-800/50">
              <span className="text-xs font-medium text-slate-300">Featured</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2]">
              <span className="text-white block mb-2">Discover</span>
              <span className="text-white block mb-2">Sustainable</span>
              <span className="text-white block mb-2">Investment</span>
              <span className="text-white block">Opportunities</span>
            </h2>
            
            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
              Access premium insights and curated sustainable investment options that align your financial goals with positive environmental and social impact.
            </p>
            
            <div className="pt-4 sm:pt-6 md:pt-8">
              <Button
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-4 sm:py-6 h-auto text-sm sm:text-base shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.3)] w-full sm:w-auto"
                onClick={() => router.push('/dashboard')}
              >
                Get Started
                <ArrowUpRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* RIGHT SIDE - Card carousel - integrates with white background */}
      <div 
        className="w-full md:w-1/2 bg-white flex items-stretch relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="Featured content carousel"
      >
        <div className="w-full h-full p-0">
          {/* Carousel container with improved alignment */}
          <div className="relative h-full overflow-hidden">
            {/* Slides with AnimatePresence for better transitions */}
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={`slide-${activeSlide}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="h-full relative overflow-hidden">
                  {/* Background Image with optimized loading */}
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={cards[activeSlide].imageSrc}
                      alt={cards[activeSlide].imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={activeSlide === 0}
                      loading={activeSlide === 0 ? "eager" : "lazy"}
                      className="object-cover"
                      style={{ objectPosition: "center" }}
                      quality={85}
                    />
                    {/* Darken overlay for better text readability on mobile */}
                    <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
                  </div>
                  
                  {/* Content positioned over the image - mobile optimized */}
                  <div className="h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 relative z-20 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {/* Accent line */}
                      <div className="h-1 sm:h-1.5 w-16 sm:w-20 bg-white mb-6 sm:mb-10"></div>
                      
                      {/* Title - mobile optimized */}
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 drop-shadow-lg">
                        {cards[activeSlide].title}
                      </h3>
                      
                      {/* Description - improved readability */}
                      <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed max-w-md drop-shadow-lg">
                        {cards[activeSlide].description}
                      </p>
                      
                      {/* Link styled */}
                      <a 
                        href={cards[activeSlide].linkHref}
                        className="inline-flex items-center text-white font-medium text-base sm:text-lg group"
                      >
                        {cards[activeSlide].linkText}
                        <ChevronRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation dots - larger touch targets for mobile */}
            <div 
              className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center space-x-3 sm:space-x-4 z-30"
              role="tablist"
              aria-label="Carousel pagination"
            >
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeSlide === i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    activeSlide === i ? "bg-slate-400" : "bg-white/40 hover:bg-white/60"
                  }`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
            
            {/* Navigation arrows - larger for mobile */}
            <button 
              className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 backdrop-blur-sm
                flex items-center justify-center text-white hover:bg-white/50 
                transition-all duration-300 z-30 hover:scale-110 focus:outline-none"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 backdrop-blur-sm
                flex items-center justify-center text-white hover:bg-white/50
                transition-all duration-300 z-30 hover:scale-110 focus:outline-none"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
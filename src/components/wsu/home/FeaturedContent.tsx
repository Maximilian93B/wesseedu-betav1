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
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  // Handle next/previous
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  // Touch handlers for swipe functionality
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
      imageSrc: "/images/pexels-aboodi-18620005.jpg", 
      imageAlt: "Sustainable investing news analytics dashboard"
    },
    {
      title: "Top Rated Companies",
      description: "Discover sustainable businesses with strong ESG scores and positive environmental impact.",
      linkText: "Explore Companies",
      linkHref: "/companies",
      imageSrc: "/images/pexels-jahoo-388415.jpg",
      imageAlt: "Sustainable companies ranking chart"
    },
    {
      title: "Impact Tracking",
      description: "Track how your portfolio contributes to sustainability goals and compare against benchmarks.",
      linkText: "Track Your Impact",
      linkHref: "/impact",
      imageSrc: "/images/pexels-jahoo-388415.jpg",
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
    <div className="flex flex-col md:flex-row h-full w-full pb-10 md:pb-16 lg:pb-20">
      {/* LEFT SIDE - Text content on slate background */}
      <div className="w-full md:w-1/2 bg-slate-900 text-white flex items-center justify-center pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-24 lg:pb-32">
        <div className="max-w-xl w-full px-10 md:px-14 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 md:space-y-10 lg:space-y-12"
          >
            <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50">
              <span className="text-xs font-medium text-slate-300">Featured</span>
            </div>
            
            {/* Updated heading with improved alignment */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              <span className="text-white block">
                Discover<br />
                Sustainable<br />
                Investment<br />
                Opportunities
              </span>
            </h2>
            
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              Access premium insights and curated sustainable investment options that align your financial goals with positive environmental and social impact.
            </p>
            
            <div className="pt-6 md:pt-8">
              <Button
                className="bg-slate-700 hover:bg-slate-600 text-white px-7 py-6 h-auto text-base shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.3)]"
                onClick={() => router.push('/dashboard')}
              >
                Get Started
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* RIGHT SIDE - Card carousel */}
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
                  </div>
                  
                  {/* Content positioned over the image - better aligned with screenshot */}
                  <div className="h-full flex flex-col justify-center px-10 sm:px-14 md:px-16 lg:px-20 relative z-20 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {/* Accent line */}
                      <div className="h-1 w-16 bg-white mb-8"></div>
                      
                      {/* Title - larger and more prominent */}
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                        {cards[activeSlide].title}
                      </h3>
                      
                      {/* Description - improved readability */}
                      <p className="text-base md:text-lg mb-10 leading-relaxed max-w-md drop-shadow-lg">
                        {cards[activeSlide].description}
                      </p>
                      
                      {/* Link styled */}
                      <a 
                        href={cards[activeSlide].linkHref}
                        className="inline-flex items-center text-white font-medium text-base group"
                      >
                        {cards[activeSlide].linkText}
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation dots */}
            <div 
              className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30"
              role="tablist"
              aria-label="Carousel pagination"
            >
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeSlide === i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === i ? "bg-slate-400" : "bg-white/40 hover:bg-white/60"
                  }`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
            
            {/* Navigation arrows */}
            <button 
              className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm
                flex items-center justify-center text-white hover:bg-white/50 
                transition-all duration-300 z-30 hover:scale-110 focus:outline-none"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm
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
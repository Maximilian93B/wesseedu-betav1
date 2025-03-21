import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function FeaturedContent() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  const slideRef = useRef<HTMLDivElement>(null);
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle next/previous
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  
  // Update slide position
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${activeSlide * 100}%)`;
    }
  }, [activeSlide]);
  
  const cards = [
    {
      title: "ESG News & Analysis",
      description: "Stay informed on sustainable investing trends with curated news and expert analysis.",
      linkText: "Browse Latest News",
      linkHref: "/news",
      imageSrc: "/images/esg-news-analysis.jpg", 
      imageAlt: "Sustainable investing news analytics dashboard"
    },
    {
      title: "Top Rated Companies",
      description: "Discover sustainable businesses with strong ESG scores and positive environmental impact.",
      linkText: "Explore Companies",
      linkHref: "/companies",
      imageSrc: "/images/top-rated-companies.jpg",
      imageAlt: "Sustainable companies ranking chart"
    },
    {
      title: "Impact Tracking",
      description: "Track how your portfolio contributes to sustainability goals and compare against benchmarks.",
      linkText: "Track Your Impact",
      linkHref: "/impact",
      imageSrc: "/images/impact-tracking.jpg",
      imageAlt: "Environmental impact tracking dashboard"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* LEFT SIDE - Text content on black background */}
      <div className="w-full md:w-1/2 bg-black text-white py-24 md:py-32 lg:py-36 flex items-center">
        <div className="max-w-xl mx-auto px-10 md:px-14 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10 md:space-y-12 lg:space-y-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-emerald-800 bg-emerald-900/30">
              <span className="text-xs font-medium text-emerald-300">Featured</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Discover Sustainable Investment Opportunities
              </span>
            </h2>
            
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              Access premium insights and curated sustainable investment options that align your financial goals with positive environmental and social impact.
            </p>
            
            <div className="pt-8 md:pt-10">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-8 h-auto text-base md:text-lg"
                onClick={() => router.push('/dashboard')}
              >
                Get Started
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* RIGHT SIDE - Card carousel on white background */}
      <div className="w-full md:w-1/2 bg-white flex items-stretch relative overflow-hidden">
        <div className="w-full h-full">
          {/* Carousel container */}
          <div className="relative h-full overflow-hidden">
            {/* Slides */}
            <div 
              ref={slideRef}
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ width: `${totalSlides * 100}%` }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="w-full h-full"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  <div className="h-full relative overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <Image 
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                        className="object-cover"
                        style={{ objectPosition: "center" }}
                      />
                      {/* Lighter gradient overlay for better image visibility */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 z-10"></div>
                    </div>
                    
                    {/* Content positioned over the image */}
                    <div className="h-full flex flex-col justify-center px-12 md:px-20 lg:px-24 relative z-20">
                      <div className="h-1.5 w-24 bg-emerald-500 mb-10"></div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-8">{card.title}</h3>
                      <p className="text-zinc-700 text-lg md:text-xl mb-12 leading-relaxed max-w-xl">{card.description}</p>
                      
                      <a 
                        href={card.linkHref}
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-lg group"
                      >
                        {card.linkText}
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation dots - positioned higher from bottom */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-4 z-30">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSlide === i ? "bg-emerald-500 w-12" : "bg-zinc-300"
                  }`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation arrows - moved slightly inward */}
            <button 
              className="absolute top-1/2 left-6 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-zinc-700 hover:text-emerald-600 transition-colors duration-300 z-30"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button 
              className="absolute top-1/2 right-6 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-zinc-700 hover:text-emerald-600 transition-colors duration-300 z-30"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
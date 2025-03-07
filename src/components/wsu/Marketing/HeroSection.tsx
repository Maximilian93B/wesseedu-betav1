"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion, Variants } from "framer-motion"
import { AnimatedTitle } from "@/components/ui/AnimatedTitle"
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { ScrollReveal } from "@/components/ui/scroll-reveal"

// Define card data outside component for better performance
const FEATURE_ITEMS = ['Exclusive opportunities', 'Sustainable focus', 'Vetted by experts', 'Direct founder access']

// Define card types
type CardData = {
  id: string
  title: string
  description?: string
  className: string
  imageUrl?: string
  buttonText?: string
  buttonHref?: string
  featured?: boolean
}

// Card data
const CARDS: CardData[] = [
  {
    id: 'platform',
    title: 'WeSeedU Platform',
    description: 'Access exclusive investment opportunities in sustainable startups, vetted by our team and aligned with UN SDGs.',
    className: 'h-[600px] sm:h-[650px] md:h-[580px] lg:h-[620px] md:-mt-8 md:col-start-2 md:col-end-3 md:row-start-1',
    buttonText: 'Start Investing',
    buttonHref: '/auth/signup',
    featured: true
  },
  {
    id: 'investment',
    title: 'Platform View',
    className: 'h-[440px] sm:h-[460px] md:h-[500px] lg:h-[520px] md:col-start-1 md:col-end-2 md:row-start-1',
    imageUrl: '/path/to/platform-screenshot1.png',
    buttonText: 'Explore Platform',
    buttonHref: '#'
  },
  {
    id: 'security',
    title: 'Dashboard View',
    className: 'h-[440px] sm:h-[460px] md:h-[500px] lg:h-[520px] md:col-start-3 md:col-end-4 md:row-start-1',
    imageUrl: '/path/to/platform-screenshot2.png',
    buttonText: 'View Dashboard',
    buttonHref: '#'
  }
]

export function HeroSection() {
  // Respect user's motion preferences
  const shouldReduceMotion = useReducedMotion()
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }
  
  const titleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
  
  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.6, ease: "easeOut" }
    }
  }
  
  // Main card appears first
  const mainCardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20, 
      scale: 0.98,
      zIndex: 10 // Keep main card on top during animation
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      zIndex: 10,
      transition: { 
        duration: 0.6, 
        delay: 0.8, 
        ease: [0.215, 0.61, 0.355, 1] // Improved easing curve (cubic-bezier)
      }
    },
    hover: {
      y: -5,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  }
  
  // Shared base variants for side cards that slide out from behind the main card
  const sideCardBaseVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: shouldReduceMotion ? 0 : 10,
      zIndex: 5 // Behind the main card
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      zIndex: 5,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
        opacity: { duration: 0.5, ease: "easeOut" },
        scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
      }
    },
    hover: {
      scale: 1.03,
      y: -3,
      zIndex: 6, // Bring hovered card slightly forward
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  };
  
  // Left card slides out from behind with a slight delay
  const leftCardVariants: Variants = {
    hidden: { 
      ...sideCardBaseVariants.hidden,
      x: shouldReduceMotion ? -20 : 0, // Start more centered (behind main card)
      rotateY: shouldReduceMotion ? 0 : -5
    },
    visible: { 
      ...sideCardBaseVariants.visible,
      x: shouldReduceMotion ? 0 : '-5%', // Slide out to the left
      rotateY: 0,
      transition: { 
        ...sideCardBaseVariants.visible.transition,
        delay: 1.1, // Slightly delayed from main card
      }
    },
    hover: sideCardBaseVariants.hover
  }
  
  // Right card slides out from behind with a slight delay
  const rightCardVariants: Variants = {
    hidden: { 
      ...sideCardBaseVariants.hidden,
      x: shouldReduceMotion ? 20 : 0, // Start more centered (behind main card)
      rotateY: shouldReduceMotion ? 0 : 5
    },
    visible: { 
      ...sideCardBaseVariants.visible,
      x: shouldReduceMotion ? 0 : '5%', // Slide out to the right
      rotateY: 0,
      transition: { 
        ...sideCardBaseVariants.visible.transition,
        delay: 1.2, // Slightly more delayed than left card
      }
    },
    hover: sideCardBaseVariants.hover
  }

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div 
        className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollReveal
          className="text-center space-y-10 mb-16 md:mb-24 flex flex-col items-center"
          animation="fade-up"
          duration={0.8}
        >
          <div className="space-y-8">
            <AnimatedTitle
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              words={["We", "Seed", "U"]}
              colors={[
                "bg-gradient-to-r from-[#14B8A6]/90 via-[#14B8A6]/70 to-[#14B8A6]/90",
                "bg-gradient-to-r from-white/90 via-white/70 to-white/90",
                "bg-gradient-to-r from-[#14B8A6]/90 via-[#A78BFA]/70 to-[#14B8A6]/90"
              ]}
              staggerDelay={0.2}
              animationStyle="fade" // Using simpler fade animation
            />

            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed will-change-transform"
              variants={subtitleVariants}
            >
              The world's best platform for purposeful investing,
              <br className="hidden md:block" />
              powered by sustainable innovation.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Three feature cards in a row - with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full max-w-7xl mx-auto mb-16 md:mb-24 relative">
          {/* Render cards with appropriate variants based on position */}
          {CARDS.map((card, index) => {
            // Select the appropriate variant based on card position
            const cardVariant = card.id === 'platform' 
              ? mainCardVariants 
              : card.id === 'investment' 
                ? leftCardVariants 
                : rightCardVariants;
                
            // Add special positioning for mobile view to maintain the "slide out" effect
            const mobileOrder = card.id === 'platform' ? 'order-first md:order-none' : '';
                
            return (
              <ScrollReveal
                key={card.id}
                className={`relative p-[1px] group rounded-xl will-change-transform ${card.className} ${mobileOrder}`}
                animation="fade-up"
                delay={index * 0.2}
                duration={0.7}
              >
                <motion.div
                  variants={cardVariant}
                  whileHover="hover"
                  style={{ 
                    perspective: "1000px", // Add perspective for 3D effect
                    transformStyle: "preserve-3d", // Better 3D rendering
                    backfaceVisibility: "hidden", // Prevent flickering
                    height: "100%",
                    width: "100%"
                  }}
                  layoutId={`card-${card.id}`} // Enable smooth layout transitions
                >
                  {/* Card background glow effect with enhanced animation */}
                  <motion.div 
                    className={`absolute inset-0 rounded-xl blur-[${card.id === 'platform' ? '30px' : '20px'}] ${
                      card.id === 'platform' 
                        ? 'bg-gradient-to-b from-purple-500 to-teal-500' 
                        : card.id === 'investment'
                          ? 'bg-gradient-to-b from-teal-500 to-blue-500'
                          : 'bg-gradient-to-b from-blue-500 to-teal-500'
                    }`}
                    initial={{ opacity: card.id === 'platform' ? 0.4 : 0.3 }}
                    whileHover={{ 
                      opacity: card.id === 'platform' ? 0.5 : 0.4,
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      willChange: "opacity, transform", // Optimize for animation
                    }}
                  ></motion.div>
                  
                  {/* Card content */}
                  <motion.div 
                    className={`relative h-full rounded-xl overflow-hidden ${
                      card.id === 'platform' 
                        ? 'border-2 border-teal-500/30' 
                        : card.id === 'investment'
                          ? 'border border-teal-500/20'
                          : 'border border-blue-500/20'
                    } bg-[#0A1A3B]/60 backdrop-blur-md`}
                    whileHover={{ 
                      borderColor: card.id === 'platform' 
                        ? 'rgba(20, 184, 166, 0.4)' 
                        : card.id === 'investment'
                          ? 'rgba(20, 184, 166, 0.3)'
                          : 'rgba(59, 130, 246, 0.3)',
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      willChange: "transform", // Optimize for animation
                    }}
                  >
                    {/* Featured badge with animation */}
                    {card.featured && (
                      <motion.div 
                        className="absolute top-0 right-0 bg-gradient-to-l from-teal-500 to-purple-500 text-white text-xs font-bold px-5 py-1.5 rounded-bl-lg"
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.3 }}
                      >
                        FEATURED
                      </motion.div>
                    )}
                    
                    {/* Card image for side cards with subtle animation */}
                    {card.imageUrl && (
                      <>
                        <div className="absolute inset-0 w-full h-full">
                          <Image 
                            src={card.imageUrl}
                            alt={`${card.title} Interface`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            priority
                          />
                        </div>
                        
                        {/* Gradient overlay for text readability with enhanced hover effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-[#0A1A3B]/90 via-[#0A1A3B]/50 to-transparent"
                          whileHover={{ 
                            background: "linear-gradient(to top, rgba(10, 26, 59, 0.95), rgba(10, 26, 59, 0.45), transparent)" 
                          }}
                        ></motion.div>
                      </>
                    )}
                    
                    {/* Main card content */}
                    {card.id === 'platform' ? (
                      <div className="p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col h-full">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-teal-500/30 to-purple-500/30 flex items-center justify-center mb-5 mx-auto">
                          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white text-center mb-3 sm:mb-4">{card.title}</h3>
                        
                        {card.description && (
                          <p className="text-white/80 text-sm sm:text-base text-center mb-5 leading-relaxed">
                            {card.description}
                          </p>
                        )}
                        
                        <div className="bg-white/10 rounded-lg p-4 sm:p-5 mb-5 w-full">
                          <ul className="space-y-2 sm:space-y-3">
                            {FEATURE_ITEMS.map((item) => (
                              <li key={item} className="flex items-start space-x-3 text-white text-sm sm:text-base">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-auto flex flex-col gap-1 w-full">
                          {card.buttonHref && (
                            <Link 
                              href={card.buttonHref}
                              className="flex items-center justify-center w-full py-3 px-6 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300"
                              aria-label={card.buttonText}
                            >
                              {card.buttonText}
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Side card content with enhanced animation
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-6 lg:p-8"
                        initial={{ y: 10, opacity: 0.9 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                          delay: card.id === 'investment' ? 1.5 : 1.7, 
                          duration: 0.4,
                          ease: "easeOut"
                        }}
                      >
                        <motion.h3 
                          className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold text-white mb-4"
                          whileHover={{ x: 3, transition: { duration: 0.2 } }}
                        >
                          {card.title}
                        </motion.h3>
                        
                        {card.buttonText && (
                          <Button
                            variant="outline"
                            className={`w-full h-10 sm:h-12 border-${card.id === 'investment' ? 'teal' : 'blue'}-500/30 text-white hover:bg-${card.id === 'investment' ? 'teal' : 'blue'}-500/20 group text-sm sm:text-base backdrop-blur-sm`}
                            aria-label={card.buttonText}
                          >
                            {card.buttonText}
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </motion.span>
                          </Button>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </motion.div>
    </div>
  )
}

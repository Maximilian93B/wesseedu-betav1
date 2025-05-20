import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { useInView, motion, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { CardData } from "./CardSectionData"

// Simplified entrance animation with reduced intensity
const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 500, // Increased from 300
      damping: 30,    // Increased from 25
      mass: 0.8       // Added for faster stabilization
    }
  }
};

// Removed floating animation for icons to improve performance

interface MarketingCardProps {
  card: CardData;
  index: number;
  isActive?: boolean;
  disableAnimations?: boolean; // New prop to control animations
}

export function MarketingCard({ 
  card, 
  index, 
  isActive = false,
  disableAnimations = false
}: MarketingCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 }); // Reduced from 0.3 for earlier triggering
  const prefersReducedMotion = useReducedMotion();
  
  // Disable animations based on props or user preference
  const shouldDisableAnimations = disableAnimations || !!prefersReducedMotion;

  return (
    <motion.div
      ref={cardRef}
      initial={shouldDisableAnimations ? { opacity: 1, y: 0 } : "hidden"}
      animate={shouldDisableAnimations ? { opacity: 1, y: 0 } : (isInView ? "visible" : "hidden")}
      variants={shouldDisableAnimations ? undefined : cardVariants}
      className={cn(
        "h-full w-full rounded-xl sm:rounded-2xl overflow-hidden",
        "relative shadow-[0_8px_30px_rgba(0,0,0,0.1)]",
        "border border-white/20",
        card.className
      )}
    >
      {/* Green apple background with exact gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}></div>

      {/* Card content */}
      <div className="relative z-5 h-full p-4 sm:p-5 md:p-7 flex flex-col">
        {/* Header section */}
        <div className="mb-6 sm:mb-8">
          <h3 className={cn(
            "text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight font-display",
            card.featured && "text-2xl sm:text-3xl"
          )}>
            {card.title}
          </h3>
          
          {card.description && (
            <p className="text-sm sm:text-base text-white/90 mt-2 sm:mt-4 line-clamp-3 leading-relaxed font-body">
              {card.description}
            </p>
          )}
        </div>
        
        {/* Image section - Static rendering with no animations */}
        <div className="mb-6 sm:mb-8">
          <div className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
            <div className="relative" style={{ aspectRatio: "3/2" }}>
              <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3 rounded-xl">
                <Image
                  src={card.imageUrl || "/eco-city.png"}
                  alt={card.title}
                  fill
                  className="object-contain scale-80"
                  loading={index <= 2 ? "eager" : "lazy"} // Load first few cards eagerly
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  // Add priority to first card for better LCP
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        {card.stats && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className={`grid ${card.stats.length > 2 ? 'grid-cols-3' : 'grid-cols-2'} divide-x divide-white/20`}>
                {card.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-3 sm:py-6">
                    <p className="font-extrabold text-white text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 font-helvetica">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-white/80 font-body">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Highlights section - Simplified with no animations */}
        {card.highlights && (
          <div className="mb-6 sm:mb-8">
            <ul className="flex flex-col gap-2 sm:gap-4">
              {card.highlights.map((item) => (
                <li key={item} className="flex items-start text-sm sm:text-base leading-relaxed text-white font-body">
                  <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-white flex items-center justify-center mt-0.5 mr-2 sm:mr-3">
                    <Check size={10} className="text-[#49c628]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Button section - Simplified hover effect */}
        {card.buttonText && (
          <div className="mt-auto">
            <Button 
              asChild 
              className="w-full bg-white hover:bg-white/90 text-[#49c628] font-semibold
                       shadow-sm hover:shadow transition-all duration-200 
                       rounded-lg py-3 sm:py-5 text-sm sm:text-base font-helvetica"
            >
              <Link href={card.buttonHref || '#'}>
                <span className="flex items-center justify-center">
                  {card.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
} 
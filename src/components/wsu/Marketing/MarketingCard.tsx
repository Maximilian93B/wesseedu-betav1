import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { useInView, motion } from "framer-motion"
import { useRef } from "react"
import { CardData, FEATURE_ITEMS } from "./CardSectionData"

// Enhanced animation variants
const cardVariants = {
  hidden: { 
    y: 20, 
    opacity: 0,
    scale: 0.98
  },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20
    }
  },
  hover: {
    y: -5,
    scale: 1.03,
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25 
    }
  }
};

// Enhanced image animation
const imageVariants = {
  hover: {
    scale: 1.07,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

// Added button animation
const buttonArrowVariants = {
  hover: {
    x: 5,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

export function MarketingCard({ card, index, isActive = false }: { card: CardData; index: number; isActive?: boolean }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Using the exact gradient specified in the Green Apple style guide
  const getCardBackground = () => {
    return "linear-gradient(to right top, rgba(255,255,255,0.95), rgba(255,255,255,0.85))";
  };
  
  return (
    <motion.div
      ref={cardRef}
      key={card.id}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/20",
        "p-6 sm:p-7",
        "shadow-[0_8px_30px_rgba(0,0,0,0.1)]", 
        "hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)]",
        "transition-all duration-300 ease-out",
        "group flex flex-col",
        "z-10",
        "h-full w-full max-w-2xl mx-auto",
        isActive ? "scale-100 z-20" : "",
        card.className
      )}
      style={{ 
        backgroundImage: getCardBackground()
      }}
    >
      {/* Subtle texture pattern for depth */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Top edge highlight for definition */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 via-white/60 to-white/40"></div>
      
      {/* Inner shadow effects for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      
      {/* Card accent - top bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-300/20"></div>
      
      {/* Hover state glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-gradient-to-b from-white/5 to-transparent"></div>
      <div className="absolute -inset-[2px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded-2xl blur-sm"></div>
      
      {/* Active card indicator */}
      {isActive && (
        <div className="absolute -inset-[3px] shadow-[0_0_20px_rgba(255,255,255,0.4)] rounded-2xl blur-md -z-10"></div>
      )}
      
      {/* Content container with z-index to appear above effects */}
      <div className="relative z-10 flex flex-col h-full">
        <CardHeader card={card} />
        
        {/* Image section - always render with fallback if needed */}
        <div className="mt-4 mb-6">
          <div className="rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/20 transition-all duration-500">
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-green-900/15 to-transparent z-[5]"></div>
              
              <motion.div className="w-full h-full" variants={imageVariants} whileHover="hover">
                <Image 
                  src={card.imageUrl || "/images/Screenshot 2025-02-21 200935.png"} 
                  alt={card.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover z-[1] transform-gpu will-change-transform"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
              
              <div className="absolute inset-0 bg-green-700/0 group-hover:bg-green-700/10 transition-colors duration-500 z-[3]"></div>
              <div className="absolute inset-0 border border-white/10 z-[6] pointer-events-none"></div>
            </div>
          </div>
        </div>
        
        {/* Push content to bottom of card */}
        <div className="mt-auto">
          <CardStatsSection card={card} />
          
          {/* Feature list with consistent styling - only render if highlights exist */}
          {card.highlights && (
            <ul className="flex flex-col gap-3 mb-6">
              {card.highlights.map((item: string) => (
                <li key={item} className="flex items-start text-xs leading-relaxed text-green-700/80">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Check size={11} className="text-green-700" />
                  </div>
                  <span className="flex-1 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          )}
          
          <CardFooter card={card} index={index} />
        </div>
      </div>
    </motion.div>
  );
}

function CardHeader({ card }: { card: CardData }) {
  return (
    <div className="mb-5 sm:mb-6">
      <h3 className="text-lg font-medium text-green-800 group-hover:text-green-900 transition-colors duration-300 leading-tight mt-1 sm:mt-2 sm:text-xl">
        {card.title}
      </h3>
      
      {card.description && (
        <p className="text-green-700/80 text-sm mt-2.5 line-clamp-3 leading-relaxed">
          {card.description}
        </p>
      )}
    </div>
  );
}

function CardStatsSection({ card }: { card: CardData }) {
  if (!card.stats) return null;
  
  return (
    <div className="mb-6">
      <div className="bg-gradient-to-br from-white to-slate-50/70 border border-white/20 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-500">
        <div className={`grid ${card.stats.length > 2 ? 'grid-cols-3' : 'grid-cols-2'} divide-x divide-white/20`}>
          {card.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center text-center px-3 py-4 relative overflow-hidden group/stat">
              {/* Hover highlight */}
              <div className="absolute inset-0 bg-green-50/0 group-hover/stat:bg-green-50/30 transition-colors duration-500"></div>
              
              <p className="font-bold text-green-800 text-lg mb-2 relative z-10 group-hover/stat:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-wider font-medium text-green-700/80 relative z-10">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardFooter({ card, index }: { card: CardData; index?: number }) {
  if (!card.buttonText) return null;
  
  return (
    <div>
      {/* Button with Green Apple styling */}
      <div className="space-y-3">
        <Button 
          asChild 
          className="w-full bg-white hover:bg-slate-50 text-green-700 shadow-[0_4px_10px_rgba(0,0,0,0.1)]
            hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
            hover:translate-y-[-2px] rounded-lg py-2.5"
        >
          <Link href={card.buttonHref || '#'}>
            <span className="flex items-center justify-center">
              {card.buttonText}
              <motion.span variants={buttonArrowVariants} whileHover="hover" className="ml-2">
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </span>
          </Link>
        </Button>
        
        <p className="text-xs text-center text-green-700/80 font-medium">
          {card.id === 'investment' ? 'Part of WeSeedU platform' : 'Included with membership'}
        </p>
      </div>
    </div>
  );
} 
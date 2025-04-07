import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { useInView, motion } from "framer-motion"
import { useRef, useState } from "react"
import { CardData } from "./CardSectionData"

// Simplified animation variants aligned with Green Apple style
const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 25,
    }
  },
  hover: {
    y: -5,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 15,
    }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.15 }
  }
}

// Simplified image animation
const imageVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

// Button arrow animation
const buttonArrowVariants = {
  initial: { x: 0 },
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
  const [hovered, setHovered] = useState(false);

  // Define card colors based on Green Apple style guide
  const getCardColors = () => {
    const accent = "from-[#70f570] to-[#49c628]"; // Primary gradient
    const deepGreen = "#1a5e0a"; // Deep green for contrast elements
    
    return { accent, deepGreen };
  }
  
  const { accent, deepGreen } = getCardColors();
  
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "h-full w-full rounded-xl sm:rounded-2xl overflow-hidden",
        "relative shadow-[0_8px_30px_rgba(0,0,0,0.1)] cursor-pointer",
        "border border-white/20",
        card.className
      )}
    >
      {/* Card background with Green Apple styling */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Subtle pattern overlay for texture - aligned with style guide */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        ></div>
        
        {/* Top highlight edge */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 via-white/60 to-white/40"></div>
        
        {/* Inner shadow for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      </div>

      {/* Hover effect - subtle accent border and glow */}
      {hovered && (
        <>
          {/* Thin accent border */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-xl sm:rounded-2xl border border-green-500/30 pointer-events-none z-10"
          ></motion.div>
          
          {/* Subtle bottom accent */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400/30 via-green-500/40 to-green-400/30 z-10"
          ></motion.div>
        </>
      )}

      {/* Card content */}
      <div className="relative z-5 h-full p-4 sm:p-5 md:p-7 flex flex-col">
        {/* Card header */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-green-800 leading-tight tracking-tight">
            {card.title}
          </h3>
          
          {card.description && (
            <p className="text-sm sm:text-base text-green-700/90 mt-2 sm:mt-4 line-clamp-3 leading-relaxed">
              {card.description}
            </p>
          )}
        </div>
        
        {/* Image section - always render, use placeholder if no imageUrl */}
        <div className="mt-3 sm:mt-5 mb-4 sm:mb-7">
          <div className="rounded-lg overflow-hidden shadow-sm border border-green-500/10">
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent z-[5]"></div>
              
              <motion.div variants={imageVariants} className="w-full h-full">
                <Image 
                  src={card.imageUrl || "/images/placeholder-green-apple.jpg"}
                  alt={card.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover z-[1]"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Push content to bottom of card */}
        <div className="mt-auto">
          {/* Stats section - always include a container even if empty */}
          <div className="mb-4 sm:mb-7">
            {card.stats ? (
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-500/10 rounded-lg overflow-hidden shadow-sm">
                <div className={`grid ${card.stats.length > 2 ? 'grid-cols-3' : 'grid-cols-2'} divide-x divide-green-500/10`}>
                  {card.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-3 sm:py-6 group/stat">
                      {/* Hover highlight */}
                      <div className="absolute inset-0 bg-green-500/0 group-hover/stat:bg-green-500/5 transition-colors duration-300"></div>
                      
                      <p className="font-extrabold text-green-800 text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                        {stat.value}
                      </p>
                      <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-green-700/80">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[60px] sm:h-[88px]"></div> // Empty space for consistent layout
            )}
          </div>
          
          {/* Feature highlights - keep consistent height */}
          <div className="mb-4 sm:mb-7 min-h-[80px] sm:min-h-[120px]">
            {card.highlights ? (
              <ul className="flex flex-col gap-2 sm:gap-4">
                {card.highlights.map((item: string) => (
                  <li key={item} className="flex items-start text-sm sm:text-base leading-relaxed text-green-800">
                    <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mt-0.5 mr-2 sm:mr-3">
                      <Check size={10} className="text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-2 sm:gap-4">
                {Array(2).fill(null).map((_, i) => (
                  <li key={i} className="flex items-start text-sm sm:text-base leading-relaxed text-green-800">
                    <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mt-0.5 mr-2 sm:mr-3">
                      <Check size={10} className="text-white" />
                    </div>
                    <span>{card.featured ? 'Verified impact investment' : i === 0 ? 'Analytics-driven insights' : 'Expert-backed opportunities'}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Card footer with button */}
          {card.buttonText && (
            <div className="space-y-2 sm:space-y-3">
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                  shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] 
                  transition-all duration-300 ease-out hover:translate-y-[-2px] rounded-lg py-3 sm:py-5 text-sm sm:text-base"
              >
                <Link href={card.buttonHref || '#'}>
                  <span className="flex items-center justify-center">
                    {card.buttonText}
                    <motion.span variants={buttonArrowVariants} initial="initial" animate={hovered ? "hover" : "initial"} className="ml-2">
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.span>
                  </span>
                </Link>
              </Button>
              
              <p className="text-[10px] sm:text-xs text-center text-green-700/80 font-medium">
                {card.id === 'investment' ? 'Part of WeSeedU platform' : 'Included with membership'}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 
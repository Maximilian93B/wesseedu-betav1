import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { useInView, motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { CardData } from "./CardSectionData"

// Enhanced 3D card animation variants similar to FundingCard
const cardVariants = {
  initial: { 
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    y: -10,
    scale: 1.03,
    rotateX: "2deg",
    rotateY: "-2deg",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 15,
    }
  },
  tap: {
    scale: 0.98,
    rotateX: "0deg",
    rotateY: "0deg",
    transition: { duration: 0.15 }
  }
}

// Enhanced fade-in with slight bounce
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
}

// Enhanced image animation
const imageVariants = {
  initial: { scale: 1 },
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

// Subtle shine animation for cards
const shineAnimation = {
  initial: { backgroundPosition: "200% 50%" },
  animate: {
    backgroundPosition: "-200% 50%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 8,
      ease: "linear"
    }
  }
};

export function MarketingCard({ card, index, isActive = false }: { card: CardData; index: number; isActive?: boolean }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);

  // Define card colors based on Green Apple style guide
  const getCardColors = () => {
    // Base Green Apple accent colors
    let accentColor = "from-[#70f570] via-[#59dd3c] to-[#49c628]";
    let deepGreen = "#1a5e0a";
    
    // Variations while keeping the green theme
    if (index === 1) {
      accentColor = "from-[#70f570] via-[#59dd3c] to-[#1a5e0a]";
      deepGreen = "#1a5e0a";
    }
    else if (index === 2) {
      accentColor = "from-[#59dd3c] via-[#49c628] to-[#1a5e0a]";
      deepGreen = "#1a5e0a";
    }
    
    return { accentColor, deepGreen };
  }
  
  const { accentColor, deepGreen } = getCardColors();
  
  return (
    <div className="relative h-full w-full">
      {/* Subtle background glow - reduced intensity */}
      <div className="absolute inset-0 -m-1 rounded-xl bg-green-500/3 backdrop-blur-sm opacity-50"></div>
      
      {/* Outer container with appearance animation */}
      <motion.div
        ref={cardRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ delay: index * 0.15 }}
        className="absolute inset-0"
      >
        {/* Inner container with hover animation */}
        <motion.div
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className={cn(
            "absolute inset-0 rounded-xl overflow-hidden cursor-pointer transform-gpu perspective-1000",
            "flex flex-col shadow-sm isolate",
            "border border-green-500/10",
            card.className
          )}
          style={{ 
            transformStyle: "preserve-3d",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05), 0 0 10px rgba(73,198,40,0.05)"
          }}
        >
          {/* Static background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white/95 opacity-100"></div>
            
            {/* Subtle pattern overlay for texture - reduced opacity */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 20px 20px, #49c628 1px, transparent 1px)`,
                backgroundSize: "40px 40px"
              }}
            ></div>
          </div>
          
          {/* Animated shine effect - more subtle */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={shineAnimation}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(90deg, transparent, rgba(112,245,112,0.1), transparent)",
              backgroundSize: "200% 100%",
            }}
          ></motion.div>
          
          {/* Removed the thick top and left accent lines for cleaner look */}
          
          {/* Bottom subtle green glow - more subtle */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-green-500/3 to-transparent"></div>
          
          {/* Inner shadow for depth - reduced */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-30"></div>
          
          {/* Hover-only effects - simplified */}
          {hovered && (
            <>
              {/* Gradient overlay - only shown on hover - more subtle */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0 }}
                className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-3`}
              ></motion.div>
              
              {/* Background glow - only shown on hover - more subtle */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.2, 
                  scale: 1.05, 
                  transition: { duration: 0.5 } 
                }}
                className={`absolute -inset-[50px] bg-gradient-to-br from-green-300/10 via-green-400/5 to-green-500/3 blur-2xl`}
              ></motion.div>
              
              {/* Enhanced border - cleaner on hover */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                className="absolute inset-0 rounded-xl pointer-events-none border border-green-500/15"
              ></motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Content container - fixed position, doesn't animate */}
      <div className="relative z-10 h-full rounded-xl p-7 sm:p-8 flex flex-col">
        <CardHeader card={card} />
        
        {/* Image section - cleaned up border */}
        {card.imageUrl && (
          <div className="mt-5 mb-7">
            <div className="rounded-lg overflow-hidden shadow-sm border border-green-500/10 transition-all duration-500">
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a5e0a]/50 via-black/10 to-transparent z-[5]"></div>
                
                <motion.div className="w-full h-full" variants={imageVariants} initial="initial" whileHover="hover">
                  <Image 
                    src={card.imageUrl || "/images/placeholder.png"} 
                    alt={card.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover z-[1] transform-gpu will-change-transform brightness-110 contrast-110"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </motion.div>
                
                {/* Removed the border overlay for cleaner look */}
              </div>
            </div>
          </div>
        )}
        
        {/* Push content to bottom of card */}
        <div className="mt-auto">
          <CardStatsSection card={card} />
          
          {/* Feature list with consistent styling - only render if highlights exist */}
          {card.highlights && (
            <ul className="flex flex-col gap-4 mb-7">
              {card.highlights.map((item: string) => (
                <li key={item} className="flex items-start text-base leading-relaxed text-black">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mt-0.5 mr-3.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Check size={12} className="text-white drop-shadow-sm" />
                  </div>
                  <span className="flex-1 font-bold">{item}</span>
                </li>
              ))}
            </ul>
          )}
          
          <CardFooter card={card} index={index} hovered={hovered} accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}

function CardHeader({ card }: { card: CardData }) {
  return (
    <div className="mb-6 sm:mb-7">
      <h3 className="text-2xl font-extrabold text-black leading-tight mt-1 sm:mt-2 sm:text-3xl tracking-wide">
        {card.title}
      </h3>
      
      {card.description && (
        <p className="text-gray-800 text-base mt-4 line-clamp-3 leading-relaxed font-semibold">
          {card.description}
        </p>
      )}
    </div>
  );
}

function CardStatsSection({ card }: { card: CardData }) {
  if (!card.stats) return null;
  
  return (
    <div className="mb-7">
      <div className="bg-gradient-to-br from-[#70f570]/5 to-[#49c628]/10 border border-green-500/10 rounded-lg overflow-hidden shadow-sm backdrop-blur-sm transition-all duration-500">
        <div className={`grid ${card.stats.length > 2 ? 'grid-cols-3' : 'grid-cols-2'} divide-x divide-green-500/5`}>
          {card.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center text-center px-4 py-6 relative overflow-hidden group/stat">
              {/* Hover highlight */}
              <div className="absolute inset-0 bg-green-500/0 group-hover/stat:bg-green-500/5 transition-colors duration-500"></div>
              
              <p className="font-extrabold text-black text-2xl mb-2 relative z-10 group-hover/stat:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="text-sm uppercase tracking-wider font-bold text-gray-700 relative z-10">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardFooter({ card, index, hovered, accentColor }: { card: CardData; index: number; hovered: boolean; accentColor: string }) {
  if (!card.buttonText) return null;
  
  return (
    <div>
      <div className="space-y-3">
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-[#70f570] via-[#59dd3c] to-[#49c628] hover:brightness-105 text-white font-extrabold shadow-[0_8px_20px_rgba(0,0,0,0.1)]
            hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
            hover:translate-y-[-3px] rounded-lg py-4 text-base tracking-wide"
        >
          <Link href={card.buttonHref || '#'}>
            <span className="flex items-center justify-center">
              {card.buttonText}
              <motion.span variants={buttonArrowVariants} initial="initial" animate={hovered ? "hover" : "initial"} className="ml-2">
                <ArrowRight className="h-6 w-6" />
              </motion.span>
            </span>
          </Link>
        </Button>
        
        <p className="text-sm text-center text-gray-700 font-bold tracking-wide">
          {card.id === 'investment' ? 'Part of WeSeedU platform' : 'Included with membership'}
        </p>
      </div>
    </div>
  );
} 
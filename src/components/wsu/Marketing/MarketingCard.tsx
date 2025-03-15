import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CardData, FEATURE_ITEMS } from "./CardSectionData"

export function MarketingCard({ card, index }: { card: CardData; index: number }) {
  const isFeatured = card.featured;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <div
      ref={cardRef}
      key={card.id}
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl bg-black/80 flex flex-col",
        // More responsive padding with mobile-first approach
        isFeatured ? "p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10" : "p-4 xs:p-5 sm:p-6",
        "shadow-[0_0_20px_rgba(139,92,246,0.1)] will-change-transform transform-gpu",
        "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-shadow duration-150",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/5 before:via-transparent before:to-teal-500/5 before:opacity-40 before:z-0",
        // Fast hover transform with better breakpoints
        "hover:-translate-y-1 transition-transform duration-150 ease-out",
        // Dynamic sizing and scaling with more gradual steps
        isFeatured 
          ? "flex-1 sm:scale-105 md:scale-110 md:shadow-[0_0_40px_rgba(139,92,246,0.2)] md:z-10"
          : "flex-1 sm:scale-95 md:scale-90 opacity-90 md:z-0",
        // More responsive positioning for secondary cards
        !isFeatured && "sm:-translate-y-1 md:-translate-y-2",
        card.id === 'investment' && "sm:translate-x-2 md:translate-x-4 lg:translate-x-6",
        card.id === 'security' && "sm:-translate-x-2 md:-translate-x-4 lg:-translate-x-6",
        // Faster initial appearance animation with staggered delay
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        `transition-all duration-500 delay-[${Math.min(index * 75, 150)}ms]`,
        card.className
      )}
    >
      {/* Decorative background elements - responsive sizes */}
      <div className="absolute -top-24 sm:-top-32 -right-24 sm:-right-32 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 sm:-bottom-32 -left-24 sm:-left-32 w-48 sm:w-64 h-48 sm:h-64 bg-teal-500/10 rounded-full blur-3xl z-0"></div>
      
      {/* Edge highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent z-0"></div>
      
      {/* Optimized hover effect with highlight outline - faster transition */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-teal-500/10"></div>
        <div className="absolute inset-0 border border-purple-400/20 rounded-2xl sm:rounded-3xl"></div>
      </div>
      
      {/* Featured card enhancements - responsive positioning */}
      {isFeatured ? (
        <>
          {/* Featured badge with responsive sizing */}
          <div className="absolute -right-1.5 sm:-right-2 -top-1.5 sm:-top-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white text-[10px] xs:text-xs font-medium px-2 xs:px-3 py-0.5 xs:py-1 rounded-full transform rotate-12 z-20 shadow-lg">
            Featured
          </div>
          
          {/* Enhanced outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-teal-500/20 to-purple-500/20 rounded-[20px] sm:rounded-[24px] blur-[3px] z-0 opacity-70"></div>
          
          {/* Corner accent glows - responsive sizes */}
          <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/10 rounded-full blur-xl z-0 animate-glow-float transform-gpu will-change-transform"></div>
          <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-teal-500/10 rounded-full blur-xl z-0 animate-glow-float-delayed transform-gpu will-change-transform"></div>
        </>
      ) : (
        // Add subtle corner accents for non-featured cards
        <>
          <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-purple-500/5 rounded-full blur-xl z-0"></div>
          <div className="absolute -bottom-0 -left-0 w-16 sm:w-24 h-16 sm:h-24 bg-teal-500/5 rounded-full blur-xl z-0"></div>
        </>
      )}
      
      {/* Card content with refined spacing */}
      <div className="relative flex flex-col h-full z-10">
        <CardHeader card={card} isFeatured={isFeatured ?? false} />
        <CardContent card={card} isFeatured={isFeatured ?? false} />
        <CardFooter card={card} isFeatured={isFeatured ?? false} />
      </div>
    </div>
  );
}

function CardHeader({ card, isFeatured }: { card: CardData; isFeatured: boolean }) {
  return (
    <div className={cn(
      isFeatured ? "mb-4 xs:mb-6 sm:mb-8" : "mb-3 sm:mb-4"
    )}>
      <h3 className={cn(
        "font-semibold text-white group-hover:text-purple-300 transition-colors duration-100 leading-tight mt-1 sm:mt-2",
        isFeatured ? "text-lg xs:text-xl sm:text-2xl md:text-3xl" : "text-base xs:text-lg sm:text-xl" 
      )}>
        {card.title}
      </h3>
      
      {card.description && (
        <p className={cn(
          "text-gray-300", 
          isFeatured ? "text-xs xs:text-sm sm:text-base mt-2 xs:mt-3 sm:mt-4" : "text-xs sm:text-sm mt-1.5 sm:mt-2",
          "line-clamp-3" 
        )}>
          {card.description}
        </p>
      )}
    </div>
  );
}

function CardContent({ card, isFeatured }: { card: CardData; isFeatured: boolean }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Stats positioned at correct vertical position based on card type */}
      {isFeatured ? (
        /* Featured card - stats centered vertically */
        <div className="my-auto">
          {card.stats && (
            <div className="bg-black/30 rounded-lg sm:rounded-xl overflow-hidden">
              <div className="flex w-full h-full">
                {card.stats.map((stat, idx) => (
                  <div 
                    key={stat.label} 
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center text-center py-3 sm:py-4 px-2 sm:px-3",
                      idx !== 0 && "border-l border-gray-800/50" // Apply border to all except first
                    )}
                  >
                    <p className="font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent leading-none text-lg xs:text-xl sm:text-2xl mb-1 sm:mb-1.5">
                      {stat.value}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-400 whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Side cards - consistent spacing for both */
        <>
          {/* Using percentage of available space to position stats consistently in both cards */}
          <div className="flex-grow" style={{ minHeight: '10%' }}></div>
          {card.stats && (
            <div className="mb-3 sm:mb-4">
              <div className="grid grid-cols-2 bg-gradient-to-r from-black/40 via-black/30 to-black/40 border border-purple-500/10 rounded-lg sm:rounded-xl py-2 xs:py-3 px-1 divide-x divide-gray-800/30">
                {card.stats.map((stat, idx) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center text-center px-1 xs:px-2 py-1 xs:py-1.5">
                    <p className="font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent leading-none text-base xs:text-lg mb-0.5 xs:mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-300 whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CardFooter({ card, isFeatured }: { card: CardData; isFeatured: boolean }) {
  return (
    <div>
      {/* Feature lists - consistent styling for side cards */}
      {isFeatured ? (
        <ul className="flex flex-col gap-3 xs:gap-4 sm:gap-5 mb-4 xs:mb-5 sm:mb-7 md:mb-8">
          {FEATURE_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2 xs:gap-3 sm:gap-4 text-[11px] xs:text-xs sm:text-sm text-gray-300">
              <div className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-400 mt-0.5">
                <Check size={12} className="sm:hidden" />
                <Check size={14} className="hidden sm:block" />
              </div>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      ) : card.highlights ? (
        <ul className="flex flex-col gap-2 xs:gap-3 mt-4 xs:mt-5 sm:mt-6 mb-5 xs:mb-6 sm:mb-8">
          {card.highlights.map((item) => (
            <li key={item} className="flex items-start text-[10px] xs:text-[11px] leading-tight text-gray-400">
              <span className="flex-shrink-0 h-1 w-1 rounded-full bg-gradient-to-r from-purple-400/50 to-teal-400/50 mt-1.5 mr-2"></span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      
      {/* Image with identical styling for side cards */}
      {card.imageUrl && (
        <div className="rounded-md sm:rounded-lg overflow-hidden transition-shadow duration-150 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] mb-4 xs:mb-5 sm:mb-6">
          <div className="relative overflow-hidden"
          style={{ aspectRatio: "16/9" }}>
            {/* Gradient overlay with higher z-index */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-[5]"></div>
            
            {/* Image with consistent dimensions */}
            <Image 
              src={card.imageUrl} 
              alt={card.title}
              width={800}
              height={450}
              className="w-full h-full object-cover z-[1] group-hover:scale-105 transition-transform duration-300 ease-out transform-gpu will-change-transform"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
              priority={isFeatured}
            />
          </div>
        </div>
      )}
      
      {/* Button and footer with consistent spacing */}
      <div className="space-y-2 sm:space-y-3">
        {card.buttonText && (
          <Button 
            asChild 
            className={cn(
              "w-full text-white relative overflow-hidden group/button transition-shadow duration-150",
              isFeatured 
                ? "py-3 xs:py-4 sm:py-5 md:py-6 text-sm xs:text-base sm:text-lg shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-500 hover:to-teal-500" 
                : "py-2 xs:py-2.5 sm:py-3 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] bg-black hover:bg-purple-900/40 text-xs xs:text-sm"
            )}
            size="default"
          >
            <Link href={card.buttonHref || '#'} prefetch={false}>
              <span className="relative z-10 flex items-center justify-center">
                {card.buttonText} 
                <ArrowRight className={cn(
                  "group-hover/button:translate-x-1 transition-transform duration-150 ease-out",
                  isFeatured ? "ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" : "ml-1 xs:ml-1.5 h-3 w-3 xs:h-3.5 xs:w-3.5"
                )} />
              </span>
              {/* Fast hover effect overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-teal-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-150 ease-out"></span>
            </Link>
          </Button>
        )}
        
        {/* Footer text - consistently styled for side cards */}
        {isFeatured ? (
          <div className="flex items-center justify-center pt-1 sm:pt-2">
            <p className="text-xs sm:text-sm text-gray-400 flex items-center">
              <span className="inline-flex -space-x-2 mr-2 sm:mr-4">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={`inline-block h-7 w-7 rounded-full border border-black bg-gradient-to-r ${i === 0 ? 'from-purple-400 to-purple-500' : i === 1 ? 'from-indigo-400 to-indigo-500' : 'from-teal-400 to-teal-500'}`}></span>
                ))}
              </span>
              <span>Joined by <span className="text-purple-400 font-medium">280+ investors</span></span>
            </p>
          </div>
        ) : (
          <p className="text-[10px] xs:text-xs text-center text-gray-500">
            {card.id === 'investment' ? 'Part of WeSeedU platform' : 'Included with membership'}
          </p>
        )}
      </div>
    </div>
  );
} 
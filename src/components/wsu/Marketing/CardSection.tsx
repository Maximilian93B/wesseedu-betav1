import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CARDS } from "./CardSectionData"
import { MarketingCard } from "./MarketingCard"
import { CardAnimations } from "./CardAnimations"

export function CardSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section 
      ref={sectionRef} 
      className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 min-h-[calc(100vh-4rem)] flex flex-col justify-center relative overflow-hidden"
    >
      {/* Global animations */}
      <CardAnimations />
      
      <div className="container px-4 xs:px-5 sm:px-6 lg:px-8 xl:px-10 mx-auto max-w-7xl flex-1 flex flex-col justify-center">
        {/* Header section with spacing system */}
        <div 
          className={cn(
            "flex flex-col items-center text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 transition-all duration-500 space-y-3 xs:space-y-4 sm:space-y-5",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-block">
            <span className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-1.5 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Platform Testing - Now open
            </span>
          </div>
          
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              A UN backed platform for sustainable investments
            </h2>
            
            <p className="text-sm xs:text-base sm:text-lg text-gray-300 max-w-xl xs:max-w-2xl mx-auto">
              WeSeedU empowers you to fund sustainable solutions for our planet's most pressing challenges while building your financial future.
            </p>
          </div>
          
          {/* Trust indicators with proper spacing */}
          <div className="flex flex-wrap justify-center gap-x-4 xs:gap-x-6 sm:gap-x-8 gap-y-2 xs:gap-y-3 pt-1 xs:pt-2 text-xs sm:text-sm text-gray-400">
            <span className="flex items-center">
              <Check size={12} className="text-green-500 mr-1.5 sm:mr-2" /> Vetted Opportunities
            </span>
            <span className="flex items-center">
              <Check size={12} className="text-green-500 mr-1.5 sm:mr-2" /> Community-driven approach
            </span>
            <span className="flex items-center">
              <Check size={12} className="text-green-500 mr-1.5 sm:mr-2" /> Values-aligned growth
            </span>
          </div>
        </div>

        {/* Card indicators with refined spacing */}
        <div className="flex justify-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 gap-2 xs:gap-3">
          {CARDS.map((card, idx) => (
            <div 
              key={idx} 
              className={cn(
                "h-1 xs:h-1.5 rounded-full transition-opacity duration-150", 
                idx === 0 ? "w-6 xs:w-8 sm:w-10 bg-gradient-to-r from-purple-500 to-teal-500" : "w-1 xs:w-1.5 bg-purple-500/30"
              )} 
            />
          ))}
        </div>

        {/* Card grid with optimized spacing and alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 relative mx-auto max-w-6xl w-full">
          {CARDS.map((card, idx) => (
            <MarketingCard key={card.id} card={card} index={idx} />
          ))}
        </div>
        
        {/* Footer section with consistent spacing */}
        <div className="mt-12 xs:mt-16 sm:mt-20 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            <span className="inline-block px-2 xs:px-3 py-0.5 xs:py-1 bg-purple-500/10 text-purple-400 rounded mr-1.5 xs:mr-2">Limited spots</span>
            Only 50 new investor accounts available this quarter
          </p>
        </div>
      </div>
    </section>
  )
} 
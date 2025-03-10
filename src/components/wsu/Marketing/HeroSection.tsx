"use client"
import { AnimatedTitle } from "@/components/ui/AnimatedTitle"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  const scrollToNextSection = () => {
    // Smooth scroll to the next section
    const cardSection = document.getElementById('card-section');
    if (cardSection) {
      cardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.32; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          will-change: opacity;
        }
        
        @keyframes float-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-float-down {
          animation: float-down 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          will-change: transform;
        }
        
        /* Text wave animation keyframes */
        @keyframes text-wave-highlight {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Base wave-through-text effect */
        .wave-through-text {
          position: relative;
          color: rgba(255, 255, 255, 0.95);
        }
        
        .wave-through-text::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(168, 85, 247, 0.7) 25%,
            rgba(20, 184, 166, 0.7) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: text-wave-highlight 4s linear infinite;
          will-change: background-position;
          pointer-events: none;
        }
      `}</style>
      
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 lg:py-24 relative">
        
        <div className="flex flex-col items-center text-center relative z-20" style={{ isolation: 'isolate' }}>
          {/* Main title with increased spacing and higher z-index */}
          <div 
            className="mb-6 md:mb-8 relative px-8 py-4 rounded-lg"
            style={{ position: 'relative', zIndex: 10 }}
          >
            {/* Enhanced glow effect behind title with sharper definition */}
            <div 
              className="absolute inset-0 -z-10 bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full opacity-85"
              style={{
                width: '120%',
                height: '120%',
                left: '-10%',
                top: '-10%',
                filter: 'blur(4px)',
                boxShadow: 'inset 0 0 15px 5px rgba(168, 85, 247, 0.05)'
              }}
            ></div>
            
            {/* Subtle secondary glow for depth */}
            <div 
              className="absolute inset-0 -z-10 bg-gradient-radial from-purple-600/5 via-transparent to-transparent rounded-full"
              style={{
                width: '140%',
                height: '140%',
                left: '-20%',
                top: '-20%',
                opacity: 0.7,
                filter: 'blur(8px)'
              }}
            ></div>
            
            <AnimatedTitle 
              text="WeSeedU"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight"
              delay={0.05}
              revealType="blur-glow"
              color="blur-glow"
            />
          </div>
          
          {/* Refined description section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="space-y-4 mb-8 md:mb-12 max-w-3xl relative"
          >
            {/* Tagline with improved styling */}
            <div className="flex flex-wrap items-baseline justify-center">
              <p 
                className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed wave-through-text inline"
                data-text="The world's first dedicated platform for "
              >
                The world's first dedicated platform for 
              </p>
              <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent font-semibold ml-1 inline">
                sustainable startups
              </span>
            </div>
          </motion.div>
          
          {/* Call to action buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col sm:flex-row gap-5 mb-12 md:mb-16"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white border-none shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-200 text-lg px-8 py-7 relative overflow-hidden group"
            >
              <Link href="/auth/signup">
                <span className="relative z-10">Start Investing</span>
                <span className="relative z-10 ml-3 transform group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent hover:bg-black/20 text-white border border-purple-500/30 hover:border-purple-500/50 shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 transition-all duration-200 text-lg px-8 py-7 relative overflow-hidden group"
            >
              <Link href="/auth/login">
                <span className="relative z-10">Login</span>
                <span className="relative z-10 ml-3 transform group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Link>
            </Button>
          </motion.div>
          
          {/* Elegant scroll CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="mt-auto"
          >
            <button 
              onClick={scrollToNextSection}
              className="group flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-150 focus:outline-none"
              aria-label="Scroll to explore our platform"
            >
              <span className="mb-4 text-sm uppercase tracking-widest opacity-70">Learn More</span>
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-gray-500 transition-all group-hover:bg-black/30 group-hover:scale-110 duration-150">
                <ChevronDown className="h-5 w-5 animate-float-down" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </>
  )
}

 
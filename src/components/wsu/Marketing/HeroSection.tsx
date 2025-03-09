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
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.32; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes glow-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-12px) scale(1.05); opacity: 0.65; }
        }
        .animate-glow-float {
          animation: glow-float 10s ease-in-out infinite;
        }
        
        @keyframes glow-float-delayed {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(12px) scale(1.05); opacity: 0.65; }
        }
        .animate-glow-float-delayed {
          animation: glow-float-delayed 10s ease-in-out infinite 2.5s;
        }
        
        @keyframes float-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        .animate-float-down {
          animation: float-down 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        
        @keyframes subtle-shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-subtle-shimmer {
          background-size: 200% 100%;
          animation: subtle-shimmer 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 lg:py-24 relative">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 -left-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-purple-900/5 via-transparent to-transparent rounded-full z-0 opacity-60"></div>
        
        <div className="flex flex-col items-center text-center relative z-20" style={{ isolation: 'isolate' }}>
         
          {/* Main title with increased spacing and higher z-index */}
          <div 
            className="mb-12 md:mb-16 relative px-8 py-4 rounded-lg"
            style={{ 
              position: 'relative', 
              zIndex: 9999,
              isolation: 'isolate',
              
            }}
          >
            {/* No glow behind title for maximum clarity */}
            
            <AnimatedTitle 
              text="WeSeedU"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight"
              delay={0.5}
              revealType="fade"
              color="crystal"
            />
          </div>
          
          {/* Combined and enhanced description */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.9, 
              staggerChildren: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="space-y-6 mb-16 md:mb-20 max-w-3xl"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed">
              The world's first dedicated platform for 
              <span className="bg-gradient-to-r from-purple-500 to-emerald-500 bg-clip-text text-transparent font-medium ml-1">
                sustainable startups
              </span>
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              WeSeedU connects visionary founders with impact investors, creating a powerful ecosystem 
              where sustainable innovation thrives. Our platform enables you to discover, fund, and 
              support startups that are building solutions for a better tomorrow.
            </p>
          </motion.div>
          
          {/* Call to action buttons with more space */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.9, 
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col sm:flex-row gap-6 mb-24 md:mb-32"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white border-none shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 text-lg px-8 py-7 relative overflow-hidden group"
            >
              <Link href="/auth/signup">
                <span className="relative z-10">Start Investing</span>
                <span className="relative z-10 ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent hover:bg-black/20 text-white border border-purple-500/30 hover:border-purple-500/50 shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 transition-all duration-300 text-lg px-8 py-7 relative overflow-hidden group"
            >
              <Link href="/auth/login">
                <span className="relative z-10">Login</span>
                <span className="relative z-10 ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Link>
            </Button>
          </motion.div>
          
          {/* Elegant scroll CTA with more space */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.0 }}
            className="mt-auto"
          >
            <button 
              onClick={scrollToNextSection}
              className="group flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none"
              aria-label="Scroll to explore our platform"
            >
              <span className="mb-4 text-sm uppercase tracking-widest opacity-70">Explore</span>
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-gray-500 transition-colors group-hover:bg-black/30 group-hover:scale-110 duration-300">
                <ChevronDown className="h-5 w-5 animate-float-down" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </>
  )
}

 

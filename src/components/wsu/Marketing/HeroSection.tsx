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
          50% { opacity: 0.28; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes glow-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-8px) scale(1.03); opacity: 0.6; }
        }
        .animate-glow-float {
          animation: glow-float 5s ease-in-out infinite;
        }
        
        @keyframes glow-float-delayed {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(8px) scale(1.03); opacity: 0.6; }
        }
        .animate-glow-float-delayed {
          animation: glow-float-delayed 5s ease-in-out infinite 1s;
        }
        
        @keyframes float-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-float-down {
          animation: float-down 1.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        
        @keyframes subtle-shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-subtle-shimmer {
          background-size: 200% 100%;
          animation: subtle-shimmer 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes wave-glow {
          0% {
            transform: translateX(-100%) translateY(15%) scale(0.85);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100%) translateY(-15%) scale(0.85);
            opacity: 0;
          }
        }
        .wave-glow {
          animation: wave-glow 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        @keyframes wave-glow-delayed {
          0% {
            transform: translateX(-100%) translateY(-8%) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100%) translateY(8%) scale(0.8);
            opacity: 0;
          }
        }
        .wave-glow-delayed {
          animation: wave-glow-delayed 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 2s;
        }
        
        /* Text wave animation keyframes */
        @keyframes text-wave-highlight {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Base wave-through-text effect */
        .wave-through-text {
          position: relative;
          color: rgba(255, 255, 255, 0.9);
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
            rgba(168, 85, 247, 0.6) 25%,
            rgba(20, 184, 166, 0.6) 50%,
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
        
        /* Secondary wave effect - different colors and delay */
        .wave-through-text-secondary::before {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(79, 70, 229, 0.5) 25%,
            rgba(16, 185, 129, 0.5) 50%,
            transparent 100%
          );
          animation: text-wave-highlight 4s linear infinite 2s;
        }
        
        /* Single-sweep wave effect */
        .wave-through-text-single-sweep::before {
          animation: text-wave-highlight 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Fix for the sustainable startups span */
        .wave-through-text span.gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          opacity: 1;
          position: relative;
          z-index: 5;
        }
      `}</style>
      
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 lg:py-24 relative">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 -left-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-purple-900/5 via-transparent to-transparent rounded-full z-0 opacity-60"></div>
        
        {/* Enhanced Planet-like radial glow effect with increased visibility */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] z-0 pointer-events-none overflow-visible"
          style={{ 
            transform: 'translate(-50%, -50%)',
            filter: 'blur(2px)',
            mixBlendMode: 'screen'
          }}
        >
          {/* Inner glow - brighter core */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full animate-pulse-slow"
            style={{ 
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(139, 92, 246, 0.15) 30%, rgba(139, 92, 246, 0.05) 60%, transparent 80%)',
              boxShadow: '0 0 80px 40px rgba(147, 51, 234, 0.2)'
            }}
          ></div>
          
          {/* Middle glow layer */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full animate-glow-float"
            style={{ 
              background: 'radial-gradient(circle, transparent 30%, rgba(20, 184, 166, 0.15) 50%, rgba(20, 184, 166, 0.05) 70%, transparent 90%)',
              boxShadow: '0 0 100px 50px rgba(20, 184, 166, 0.1)'
            }}
          ></div>
          
          {/* Outer glow - subtle edge */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170%] h-[170%] rounded-full animate-glow-float-delayed"
            style={{ 
              background: 'radial-gradient(circle, transparent 50%, rgba(79, 70, 229, 0.1) 70%, rgba(79, 70, 229, 0.05) 85%, transparent 95%)',
              boxShadow: '0 0 150px 70px rgba(79, 70, 229, 0.05)'
            }}
          ></div>
          
          {/* Atmospheric haze */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full"
            style={{ 
              background: 'radial-gradient(circle, transparent 60%, rgba(88, 28, 135, 0.08) 80%, rgba(88, 28, 135, 0.05) 90%, transparent 100%)',
              opacity: 0.9
            }}
          ></div>
        </div>
        
        <div className="flex flex-col items-center text-center relative z-20" style={{ isolation: 'isolate' }}>
         
          {/* Main title with increased spacing and higher z-index */}
          <div 
            className="mb-6 md:mb-8 relative px-8 py-4 rounded-lg"
            style={{ 
              position: 'relative', 
              zIndex: 9999,
              isolation: 'isolate',
            }}
          >
            {/* Subtle glow effect behind title */}
            <div 
              className="absolute inset-0 -z-10 bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl opacity-70"
              style={{
                width: '120%',
                height: '120%',
                left: '-10%',
                top: '-10%',
                transform: 'translateZ(0)',
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
          
          {/* Refined description section with enhanced animations */}
          <motion.div 
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.3,
              delay: 0.15,
              staggerChildren: 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="space-y-4 mb-8 md:mb-12 max-w-3xl relative"
          >
            {/* Tagline with improved styling */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.2 }}
              className="flex flex-wrap items-baseline justify-center"
            >
              <p 
                className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed wave-through-text inline"
                data-text="The world's first dedicated platform for "
              >
                The world's first dedicated platform for 
              </p>
              <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent font-semibold ml-1 inline">
                sustainable startups
              </span>
            </motion.div>
            
            
          </motion.div>
          
          {/* Call to action buttons - refined and modernized */}
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.3,
              delay: 0.3,
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
          
          {/* Elegant scroll CTA with more space */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.4 }}
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

 

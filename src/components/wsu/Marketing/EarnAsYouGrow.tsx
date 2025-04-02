import { useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const EarnAsYouGrow = memo(function EarnAsYouGrow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation variants for batch animations
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Enhanced pulse animation with subtle effect
  const pulseVariant = {
    initial: { opacity: 0.9, scale: 1 },
    animate: { 
      opacity: [0.9, 1, 0.9], 
      scale: [1, 1.05, 1],
      transition: { 
        repeat: Infinity, 
        duration: 6,
        ease: "easeInOut"
      }
    }
  };

  // Investment tiers configuration
  const investmentTiers = [
    { amount: "$100,000", label: "ROOT", color: "#49c628", isActive: true },
    { amount: "$200,000", label: "THRIVE", color: "#70f570", isActive: true },
    { amount: "$300,000", label: "IMPACT", color: "#1a5e0a", isActive: false },
  ];

  return (
    <div className="w-full overflow-hidden relative py-6" ref={containerRef}>
      {/* Refined background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-28 md:py-36 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-20 lg:gap-24 min-h-[700px]">
          
          {/* Left side - Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              className="max-w-md space-y-12"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                <span className="text-white">
                  Reach a<br /> milestone,
                </span>
                <br />
                <span className="text-white">earn a reward</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-white/90 text-lg max-w-md leading-relaxed">
                  Your investment journey passes through three growth stages: ROOT, THRIVE, and IMPACT. Each stage represents progress in your sustainable investment portfolio.
                </p>
                
                <p className="text-white/80 text-lg max-w-md leading-relaxed">
                  As you advance through each stage, you'll unlock new features and benefits that enhance your investment experience.
                </p>
              </div>
              
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
              >
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-white hover:bg-slate-50 text-green-700 
                    shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] 
                    transition-all duration-300 ease-out font-medium
                    hover:translate-y-[-3px] rounded-xl px-6 py-6"
                  onClick={() => window.open('/rewards', '_self')}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Rewards Visualization with enhanced shadows and shading */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative mt-12 md:mt-0">
            {/* Subtle background shadow */}
            <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-black/5 blur-3xl"></div>
            
            <div className="relative h-[600px] md:h-[650px] lg:h-[680px] flex items-center justify-center w-full">
              {/* Subtle back-lighting effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] 
                bg-gradient-radial from-white/40 via-transparent to-transparent rounded-full blur-xl"></div>
              
              {/* Main pulsing white glow */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial="initial"
                animate="animate"
                variants={pulseVariant}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] 
                  bg-gradient-radial from-white/50 via-white/25 to-transparent rounded-full blur-3xl"></div>
              </motion.div>
              
              {/* Rewards image with refined shading and shadows */}
              <div className="relative w-full max-w-md mx-auto flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  {/* Directional light effect - subtle highlight from top-left */}
                  <div className="absolute -top-20 -left-20 w-[200px] h-[200px] 
                    bg-gradient-radial from-white/40 to-transparent blur-2xl rounded-full"></div>
                  
                  {/* Main diffused glow behind the image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] 
                    bg-gradient-radial from-white/70 via-white/30 to-transparent blur-2xl rounded-full"></div>
                  
                  {/* Inner glow for definition */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] 
                    bg-gradient-radial from-white/50 to-transparent blur-lg rounded-full"></div>
                  
                  {/* Main image with enhanced shadows */}
                  <div className="relative">
                    {/* Soft inner shadow to add depth */}
                    <div className="absolute inset-0 rounded-full 
                      shadow-[inset_0_5px_15px_rgba(0,0,0,0.15)] opacity-30"></div>
                    
                    <Image
                      src="/treasure.png"
                      alt="Investment rewards"
                      width={480}
                      height={480}
                      className="relative filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
                      onLoad={() => setImageLoaded(true)}
                      priority
                    />
                    
                    {/* Enhanced multi-layered shadow beneath */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-6 
                      bg-black/20 filter blur-md rounded-full transform skew-x-2"></div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-4 
                      bg-black/15 filter blur-lg rounded-full"></div>
                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[70%] h-3 
                      bg-black/10 filter blur-xl rounded-full"></div>
                      
                    {/* Subtle highlight reflection */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-2 
                      bg-gradient-radial from-white/40 to-transparent filter blur-sm rounded-full"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="relative h-28 sm:h-36 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </div>
  );
});

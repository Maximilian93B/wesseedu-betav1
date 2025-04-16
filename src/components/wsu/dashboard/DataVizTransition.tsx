import { useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const DataVizTransition = memo(function DataVizTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation variants for batch animations to reduce CPU/GPU load
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Investment tiers configuration
  const investmentTiers = [
    { amount: "$100,000", label: "ROOT", color: "#0ea5e9", isActive: true },
    { amount: "$200,000", label: "THRIVE", color: "#f97316", isActive: true },
    { amount: "$300,000", label: "IMPACT", color: "#dc2626", isActive: false },
  ];

  return (
    <div className="w-full overflow-hidden relative bg-black" ref={containerRef}>
      {/* Subtle background dots pattern for depth */}
     
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 relative z-10">
        {/* Updated to better handle mobile layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          {/* Left side - Content - mobile optimized */}
          <div className="w-full md:w-1/2 flex items-center justify-center order-2 md:order-1">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              className="max-w-md"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Reach a<br /> milestone,
                </span>
                <br />
                <span className="text-white">earn a reward</span>
              </h2>
              
              <p className="text-gray-300 mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg max-w-md">
                Your investment journey passes through three growth stages: ROOT, THRIVE, and IMPACT. Each stage represents progress in your sustainable investment portfolio.
              </p>
              
              <p className="text-gray-300 mt-3 sm:mt-4 text-base sm:text-lg max-w-md">
                As you advance through each stage, you'll unlock new features and benefits that enhance your investment experience.
              </p>
              
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="mt-8 sm:mt-10"
              >
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                    hover:shadow-[0_6px_20px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out 
                    hover:translate-y-[-2px] rounded-lg border border-gray-700 py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base"
                  onClick={() => window.open('/rewards', '_self')}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Rewards Visualization - optimized for mobile */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative order-1 md:order-2 mb-8 md:mb-0">
            <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] flex items-center justify-center w-full">
              {/* Status card - mobile optimized */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="absolute top-0 left-0 right-0 mx-auto z-30 bg-black/80 backdrop-blur-md border border-gray-800 rounded-xl p-4 sm:p-5 w-full max-w-[260px] sm:max-w-sm shadow-2xl"
              >
                <div className="relative">
                  <p className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">Current stage</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">THRIVE</h3>
                  <div className="mt-2 sm:mt-3 bg-gray-800 rounded-full h-2 sm:h-2.5 w-full overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 h-2 sm:h-2.5 rounded-full w-2/3 shadow-inner"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Rewards image - properly sized for mobile */}
              <div className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-md mx-auto flex items-center justify-center z-10 mt-12 sm:mt-8 md:mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  {/* Main image with enhanced shadow effects */}
                  <div className="relative">
                    {/* Sophisticated layered glow effects */}
                    <div className="absolute -inset-6 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute -inset-16 bg-gradient-radial from-white/15 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute -inset-28 bg-gradient-radial from-white/8 to-transparent rounded-full blur-3xl"></div>
                    
                    {/* Image container with refined reflection */}
                    <div className="relative w-full h-full rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                      <Image
                        src="/eth-surprise.png"
                        alt="Investment rewards - Ethereum tokens"
                        width={350} 
                        height={350}
                        className="filter drop-shadow-[0_5px_20px_rgba(255,255,255,0.3)] w-full h-auto"
                        onLoad={() => setImageLoaded(true)}
                        priority
                      />
                      
                      {/* Subtle shine line across image - top */}
                      <div className="absolute top-[2%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      
                      {/* Refined bottom reflection/shadow */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-gradient-radial from-white/25 to-transparent filter blur-md rounded-full"></div>
                      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[65%] h-6 bg-gradient-radial from-white/15 to-transparent filter blur-xl rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Milestone trackers - improved for mobile */}
              <div className="absolute -bottom-4 sm:-bottom-8 md:-bottom-12 left-0 right-0 z-20 w-full">
                <div className="flex justify-center items-start w-full">
                  <div className="flex flex-row gap-6 sm:gap-12 md:gap-20 lg:gap-32 justify-center items-start px-4 max-w-md mt-8 sm:mt-12">
                    {/* ROOT - left */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col items-center text-center w-1/3"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center shadow-lg mb-2 sm:mb-3 border border-gray-700">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-gray-200" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-0.5 sm:mb-1">ROOT</span>
                      <span className="text-gray-400 text-[10px] sm:text-xs">First stage of growth</span>
                    </motion.div>
                    
                    {/* THRIVE - center */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex flex-col items-center text-center w-1/3"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-2 sm:mb-3 border border-gray-700">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white mb-0.5 sm:mb-1">THRIVE</span>
                      <span className="text-gray-400 text-[10px] sm:text-xs">Growing stage</span>
                    </motion.div>
                    
                    {/* IMPACT - right */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col items-center text-center w-1/3"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-700 flex items-center justify-center mb-2 sm:mb-3 bg-black/60 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500"></div>
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-gray-400 mb-0.5 sm:mb-1">IMPACT</span>
                      <span className="text-[10px] sm:text-xs text-white bg-gray-800/80 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-md mt-1 inline-block shadow-md border border-gray-700">FINAL STAGE</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="relative h-16 sm:h-24 md:h-32 overflow-hidden bg-gradient-to-b from-black to-gray-900">
        {/* Subtle horizontal line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"></div>
      </div>
    </div>
  );
}); 
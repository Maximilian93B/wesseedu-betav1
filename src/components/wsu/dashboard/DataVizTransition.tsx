import { useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const DataVizTransition = memo(function DataVizTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 relative z-10">
        {/* Updated to center items both horizontally and vertically */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 min-h-[700px]">
          {/* Left side - Content - centered vertically and horizontally */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              className="max-w-md"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Reach a<br /> milestone,
                </span>
                <br />
                <span className="text-white">earn a reward</span>
              </h2>
              
              <p className="text-gray-300 mt-10 text-lg max-w-md">
                Your investment journey passes through three growth stages: ROOT, THRIVE, and IMPACT. Each stage represents progress in your sustainable investment portfolio.
              </p>
              
              <p className="text-gray-300 mt-4 text-lg max-w-md">
                As you advance through each stage, you'll unlock new features and benefits that enhance your investment experience.
              </p>
              
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="mt-10"
              >
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                    hover:shadow-[0_6px_20px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out 
                    hover:translate-y-[-2px] rounded-lg border border-gray-700"
                  onClick={() => window.open('/rewards', '_self')}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Rewards Visualization - centered layout */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            <div className="relative h-[650px] md:h-[650px] lg:h-[650px] flex items-center justify-center w-full">
              {/* Status card - properly centered */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="absolute top-0 left-0 right-0 mx-auto z-30 bg-black/80 backdrop-blur-md border border-gray-800 rounded-xl p-5 w-full max-w-sm shadow-2xl"
              >
                <div className="relative">
                  {/* Card top shine effect */}
                 
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Current stage</p>
                  <h3 className="text-3xl font-bold text-white mt-1">THRIVE</h3>
                  <div className="mt-3 bg-gray-800 rounded-full h-2.5 w-full overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 h-2.5 rounded-full w-2/3 shadow-inner"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Rewards image - properly centered with refined positioning */}
              <div className="relative w-full max-w-md mx-auto flex items-center justify-center z-10 mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  {/* Main image with enhanced shadow effects */}
                  <div className="relative mt-20">
                    {/* Sophisticated layered glow effects */}
                    <div className="absolute -inset-6 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute -inset-16 bg-gradient-radial from-white/15 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute -inset-28 bg-gradient-radial from-white/8 to-transparent rounded-full blur-3xl"></div>
                    
                    {/* Image container with refined reflection */}
                    <div className="relative w-full h-full rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                      <Image
                        src="/eth-surprise.png"
                        alt="Investment rewards - Ethereum tokens"
                        width={450} 
                        height={450}
                        className="filter drop-shadow-[0_5px_20px_rgba(255,255,255,0.3)]"
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
              
              {/* Milestone trackers - improved alignment and spacing */}
              <div className="absolute -bottom-12 left-0 right-0 z-20 w-full">
                <div className="flex justify-center items-start w-full">
                  <div className="flex flex-row gap-10 md:gap-20 lg:gap-32 justify-center items-start px-4 max-w-md mt-12">
                    {/* ROOT - left */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col items-center text-center w-1/3"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center shadow-lg mb-3 border border-gray-700">
                        <Check className="h-5 w-5 text-gray-200" />
                      </div>
                      <span className="text-base font-semibold text-white mb-1">ROOT</span>
                      <span className="text-gray-400 text-xs">First stage of growth</span>
                    </motion.div>
                    
                    {/* THRIVE - center */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex flex-col items-center text-center w-1/3"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-3 border border-gray-700">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-base font-semibold text-white mb-1">THRIVE</span>
                      <span className="text-gray-400 text-xs">Growing stage</span>
                    </motion.div>
                    
                    {/* IMPACT - right */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col items-center text-center w-1/3"
                    >
                      <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center mb-3 bg-black/60 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                      </div>
                      <span className="text-base font-semibold text-gray-400 mb-1">IMPACT</span>
                      <span className="text-xs text-white bg-gray-800/80 backdrop-blur-sm px-2 py-0.5 rounded-md mt-1 inline-block shadow-md border border-gray-700">FINAL STAGE</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="relative h-24 sm:h-32 overflow-hidden bg-gradient-to-b from-black to-gray-900">
        {/* Subtle horizontal line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"></div>
      </div>
    </div>
  );
}); 
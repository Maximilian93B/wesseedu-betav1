import { useEffect, useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import type { ThreeWrapperProps, TierInfo } from "./ThreeWrapper";


// Dynamic import of THREE to avoid SSR issues
const ThreeWrapper = dynamic(() => import("./ThreeWrapper"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-t-cyan-500 border-r-emerald-500/40 border-b-emerald-500/20 border-l-emerald-500/60 animate-spin"></div>
    </div>
  )
});

export const DataVizTransition = memo(function DataVizTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [mounted, setMounted] = useState(false);

  // Tiers configuration - matching the colors from the prototype image
  const investmentTiers: TierInfo[] = [
    { amount: "$100,000", label: "ROOT", color: "#0ea5e9", isActive: true },    // Blue
    { amount: "$200,000", label: "THRIVE", color: "#f97316", isActive: true },  // Orange
    { amount: "$300,000", label: "IMPACT", color: "#dc2626", isActive: false }, // Red
  ];

  // Set mounted state on client side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Animation variants for batch animations to reduce CPU/GPU load
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const milestoneVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 0.2 + (custom * 0.1) }
    })
  };

  return (
    <div className="w-full overflow-hidden relative bg-black" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-start gap-16">
          {/* Left side - Content */}
          <div className="w-full md:w-2/5">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  Reach a<br /> milestone,
                </span>
                <br />
                <span className="text-white">earn a reward</span>
              </h2>
              
              <p className="text-zinc-300 mt-10 text-lg max-w-md">
                Your investment journey passes through three growth stages: ROOT, THRIVE, and IMPACT. Each stage represents progress in your sustainable investment portfolio.
              </p>
              
              <p className="text-zinc-300 mt-4 text-lg max-w-md">
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
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500"
                  onClick={() => window.open('/rewards', '_self')}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Visualization */}
          <div className="w-full md:w-3/5 relative">
            <div className="relative h-[600px] md:h-[750px] lg:h-[800px]">
              {/* Status card */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="absolute top-0 right-4 z-30 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-5 w-full max-w-sm shadow-xl"
              >
                <div>
                  <p className="text-zinc-400 text-sm font-medium">Current stage</p>
                  <h3 className="text-3xl font-bold text-white mt-1">THRIVE</h3>
                  <div className="mt-3 bg-zinc-800 rounded-full h-2.5 w-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-600 via-orange-500 to-red-600 h-2.5 rounded-full w-2/3 shadow-inner"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* 3D visualization wrapper */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pt-20">
                <div className="w-full h-full relative">
                  {mounted && isInView && (
                    <ThreeWrapper investmentTiers={investmentTiers} />
                  )}
                </div>
              </div>
              
              {/* Milestone trackers - now laid out horizontally to match the 3D visualization */}
              <div className="absolute bottom-8 left-0 right-0 z-20 w-full">
                <div className="flex flex-row gap-4 md:gap-16 lg:gap-24 justify-center items-start px-4">
                  {/* ROOT - left */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center text-center w-1/3 md:w-auto"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center shadow-md mb-2">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base md:text-lg font-semibold text-white">ROOT</span>
                    <span className="text-zinc-400 text-xs">First stage of growth</span>
                  </motion.div>
                  
                  {/* THRIVE - center */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col items-center text-center w-1/3 md:w-auto"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-md mb-2">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base md:text-lg font-semibold text-white">THRIVE</span>
                    <span className="text-zinc-400 text-xs">Growing stage</span>
                  </motion.div>
                  
                  {/* IMPACT - right */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center text-center w-1/3 md:w-auto"
                  >
                    <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                    </div>
                    <span className="text-base md:text-lg font-semibold text-zinc-500">IMPACT</span>
                    <span className="text-xs text-white bg-zinc-900/80 px-2 py-0.5 rounded-sm mt-1 inline-block shadow-sm">FINAL STAGE</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave transition - simplified animation */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        {/* Reduced particles for better performance */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-emerald-400/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}); 
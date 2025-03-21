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

  // Tiers configuration
  const investmentTiers = [
    { amount: "$100,000", label: "Base", color: "#84cc16", isActive: true },
    { amount: "$200,000", label: "Builder", color: "#10b981", isActive: true },
    { amount: "$300,000", label: "Growth", color: "#14b8a6", isActive: false },
    { amount: "$500,000", label: "Impact", color: "#06b6d4", isActive: false },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-36">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side - Content */}
          <div className="w-full md:w-1/2">
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
                When you reach $200,000 in assets, you get to choose any reward you like from one of our trusted partners. Plus, you can unlock another reward at your next two $100,000 milestones after that.
              </p>
              
              <p className="text-zinc-300 mt-4 text-lg max-w-md">
                Investing is already rewarding — we're here to make it even better.
              </p>
              
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="mt-8"
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
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-[600px] md:h-[700px] lg:h-[750px]">
              {/* Status card */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="absolute top-0 left-0 z-30 bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 w-full"
              >
                <div>
                  <p className="text-zinc-400 text-sm">Your assets</p>
                  <p className="text-3xl font-bold text-white">$400,000</p>
                </div>
              </motion.div>
              
              {/* 3D visualization - only render when in view and mounted */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pt-24">
                {mounted && isInView && (
                  <ThreeWrapper investmentTiers={investmentTiers} />
                )}
              </div>
              
              {/* Milestone tracker - use motion variants for efficient animations */}
              <div className="absolute top-32 left-0 z-20 w-full px-4 space-y-8">
                {/* $400,000 - Current level */}
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={milestoneVariant}
                  custom={0}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">$400,000</span>
                    <span className="text-zinc-400 text-xs">Invest your third reward</span>
                  </div>
                </motion.div>
                
                {/* Line */}
                <div className="w-px h-16 bg-zinc-700 ml-3"></div>
                
                {/* $500,000 */}
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={milestoneVariant}
                  custom={1}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full border border-zinc-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-2xl font-bold text-zinc-500">$500,000</span>
                    <span className="text-xs text-white bg-zinc-800 px-2 py-1 rounded">GENERATION</span>
                  </div>
                </motion.div>
                
                {/* Line */}
                <div className="w-px h-16 bg-zinc-700 ml-3"></div>
                
                {/* Progress bar - full screen width */}
                <div className="w-full h-px bg-zinc-700 my-6"></div>
                
                {/* $100,000 - using single animations for all below */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-zinc-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-2xl font-bold text-zinc-500">$100,000</span>
                      <span className="text-xs text-cyan-300 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-full">PREMIUM</span>
                    </div>
                  </div>
                  
                  {/* Line */}
                  <div className="w-px h-16 bg-zinc-700 ml-3 mt-8"></div>
                  
                  {/* $200,000 */}
                  <div className="flex items-center gap-3 mt-8">
                    <div className="w-6 h-6 rounded-full border border-zinc-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                    </div>
                    <div className="flex-1">
                      <span className="text-2xl font-bold text-zinc-500">$200,000</span>
                    </div>
                  </div>
                </motion.div>
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
"use client"
import { AlertTriangle, ArrowRight, CheckCircle, Globe, Shield, TrendingUp, Users, Zap } from "lucide-react"
import { useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { ConnectingLines } from "./ConnectingLines"
import { ProblemItem } from "./ProblemItem"
import { SolutionItem } from "./SolutionItem"

// Define types for our data structures
interface Problem {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Solution {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  connectedTo: string[];
  solves: string;
}

// Define animation variants outside component for better performance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export function ProblemSolutionFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize problems and solutions data
  const problems = useMemo<Problem[]>(() => [
    {
      id: "no-marketplace",
      step: 1,
      title: "No Dedicated Marketplace",
      description: "Sustainable startups lack specialized platforms to connect with impact investors",
      icon: Globe,
    },
    {
      id: "limited-platforms",
      step: 2,
      title: "Limited Trusted Platforms",
      description: "Investors struggle to find reliable options for pre-public sustainable investments",
      icon: Shield,
    },
    {
      id: "visibility-barriers",
      step: 3,
      title: "Visibility Barriers",
      description: "Impactful startups face challenges in reaching potential investors",
      icon: AlertTriangle,
    },
    {
      id: "verification-difficulty",
      step: 4,
      title: "Verification Difficulty",
      description: "Validating sustainability claims requires specialized expertise",
      icon: CheckCircle,
    },
  ], []);

  const solutions = useMemo<Solution[]>(() => [
    {
      id: "expert-curation",
      step: "A",
      title: "Expert Curation",
      description: "Our team validates sustainability claims using comprehensive ESG metrics",
      icon: Shield,
      connectedTo: ["verification-difficulty", "limited-platforms"],
      solves: "We solve verification challenges by applying rigorous standards and expert review"
    },
    {
      id: "dedicated-platform",
      step: "B",
      title: "Dedicated Platform",
      description: "WeSeedU provides a specialized marketplace exclusively for sustainable startups",
      icon: Globe,
      connectedTo: ["no-marketplace", "visibility-barriers"],
      solves: "We create the missing marketplace that connects vetted startups with impact investors"
    },
    {
      id: "seamless-investment",
      step: "C",
      title: "Seamless Investment",
      description: "Our platform streamlines the investment process with transparent workflows",
      icon: TrendingUp,
      connectedTo: ["limited-platforms", "visibility-barriers"],
      solves: "We make sustainable investing accessible through simplified, transparent processes"
    },
    {
      id: "community-building",
      step: "D",
      title: "Community Building",
      description: "We foster connections between investors, founders, and sustainability experts",
      icon: Users,
      connectedTo: ["visibility-barriers", "verification-difficulty"],
      solves: "We break down barriers by creating a trusted network of sustainability stakeholders"
    },
  ], []);

  // Skip animations if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <section ref={sectionRef} className="relative w-full py-12 md:py-16 overflow-visible">
        {/* Rest of the JSX without animations */}
        {/* ... */}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative w-full py-12 md:py-16 overflow-visible">
      {/* Add CSS for highlight effect */}
      <style jsx global>{`
        .highlight-node .rounded-lg {
          border-color: rgba(20, 184, 166, 0.8) !important;
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.5) !important;
          transform: scale(1.05);
        }
        
        .highlight-node .text-teal-400 {
          color: rgba(94, 234, 212, 1) !important;
        }

        .rounded-lg {
          transition: all 0.3s ease;
        }

        .item-description {
          opacity: 0;
          transform: translateY(-5px);
          transition: all 0.3s ease;
          max-width: 180px;
        }
        
        .highlight-node .item-description {
          opacity: 1;
          transform: translateY(0);
        }
        
        .solution-explanation {
          position: absolute;
          bottom: -24px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 10px;
          line-height: 1.3;
          color: rgba(255, 255, 255, 0.7);
          opacity: 0;
          transform: translateY(5px);
          transition: all 0.3s ease;
          padding: 0 4px;
          background: rgba(10, 26, 59, 0.6);
          backdrop-filter: blur(4px);
          border-radius: 4px;
          padding: 3px 5px;
          border: 1px solid rgba(20, 184, 166, 0.2);
          max-width: 180px;
          margin: 0 auto;
        }

        .highlight-node .solution-explanation {
          opacity: 1;
          transform: translateY(0);
        }
        
        .vertical-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.2), rgba(20, 184, 166, 0.1));
          z-index: 1;
        }
        
        .problems-line {
          left: 50%;
          transform: translateX(-50%);
        }
        
        .solutions-line {
          left: 50%;
          transform: translateX(-50%);
        }
        
        .logo-container {
          position: relative;
          z-index: 20;
        }
        
        .logo-container::before,
        .logo-container::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40px;
          height: 1px;
          background: linear-gradient(to right, rgba(20, 184, 166, 0), rgba(20, 184, 166, 0.3));
        }
        
        .logo-container::before {
          right: 100%;
          margin-right: 10px;
        }
        
        .logo-container::after {
          left: 100%;
          margin-left: 10px;
          background: linear-gradient(to left, rgba(20, 184, 166, 0), rgba(20, 184, 166, 0.3));
        }

        .connection-path {
          transition: stroke 0.3s ease, stroke-width 0.3s ease;
        }
        
        .icon-container {
          position: relative;
          z-index: 10;
        }
      `}</style>

      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-teal-500/10 rounded-full blur-[80px] opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-[60px] opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[70px] opacity-30"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-[700px] mx-auto mb-6 md:mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={0}
        >
          <span className="inline-block text-xs text-white/40 font-medium tracking-wider uppercase mb-2">
            OUR APPROACH TO SUSTAINABLE INVESTMENT
          </span>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 leading-[1.2]">
            <span className="text-white">From </span>
            <span className="text-gradient-primary">Problem </span>
            <span className="text-white">to </span>
            <span className="text-gradient-primary">Solution</span>
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            WeSeedU identifies key challenges in sustainable investing and addresses them with innovative
            solutions, creating a seamless experience for both investors and startups.
          </p>
        </motion.div>

        {/* Problem-Solution flow diagram */}
        <motion.div 
          className="max-w-6xl mx-auto relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Card background with glass effect */}
          <div className="absolute inset-0 -m-4 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 border border-teal-500/20 bg-[#0A1A3B]/40 backdrop-blur-sm rounded-2xl"></div>
          </div>

          {/* Connecting lines */}
          <ConnectingLines problems={problems} solutions={solutions} />

          <div className="relative z-5 p-4 md:p-6 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 overflow-visible min-h-[500px]">
            {/* Problems section */}
            <motion.div 
              className="w-full md:w-[38%] relative flex flex-col items-center md:items-end"
              variants={fadeInUp}
              custom={1}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-4 text-center relative z-10">
                <span className="text-gradient-primary">Problems</span> We Address
              </h3>
              
              {/* Vertical line for problems */}
              <div className="vertical-line problems-line hidden md:block"></div>
              
              <div className="flex flex-col gap-8 md:gap-10 relative w-full max-w-[280px]">
                {problems.map((item, index) => (
                  <ProblemItem
                    key={item.id}
                    {...item}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Center logo section */}
            <motion.div 
              className="flex-shrink-0 relative self-center flex flex-col items-center justify-center z-10"
              variants={fadeInUp}
              custom={3}
            >
              <div className="logo-container bg-[#0A1A3B]/80 backdrop-blur-md p-3 rounded-full border border-teal-500/30 shadow-lg mb-3">
                <div className="w-12 h-12 md:w-14 md:h-14 relative flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="WeSeedU Logo" 
                    width={56} 
                    height={56}
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0A1A3B]/80 backdrop-blur-sm border border-teal-500/40 shadow-md relative z-10 mb-1">
                  <ArrowRight className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] text-white/60 font-medium mb-1 text-center">Bridging the Gap</p>
                <Zap className="w-3 h-3 text-teal-400 animate-pulse" />
              </div>
            </motion.div>

            {/* Solutions section */}
            <motion.div 
              className="w-full md:w-[38%] relative flex flex-col items-center md:items-start"
              variants={fadeInUp}
              custom={2}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-4 text-center relative z-10">
                <span className="text-gradient-primary">Solutions</span> That Work
              </h3>
              
              {/* Vertical line for solutions */}
              <div className="vertical-line solutions-line hidden md:block"></div>
              
              <div className="flex flex-col gap-8 md:gap-10 relative w-full max-w-[280px]">
                {solutions.map((item, index) => (
                  <SolutionItem
                    key={item.id}
                    {...item}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


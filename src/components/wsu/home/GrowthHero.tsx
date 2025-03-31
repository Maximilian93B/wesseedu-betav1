import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

interface GrowthHeroProps {
  onAction?: () => void;
  actionButtonText?: string;
}

export function GrowthHero({ 
  onAction, 
  actionButtonText = "Start Investing Today" 
}: GrowthHeroProps) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Subtle texture pattern for depth */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, #64748b 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Content container */}
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 
                      flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Content with floating-style shadows */}
        <div className="relative md:max-w-[55%] w-full pt-4 pb-16">
          {/* Enhanced bottom shadows for floating effect */}
          <div className="absolute -bottom-16 w-[100%] h-[50px] mx-auto left-0 right-0
                          bg-slate-900/25 blur-xl rounded-full"></div>
          <div className="absolute -bottom-12 w-[90%] h-[35px] mx-auto left-0 right-0
                          bg-slate-900/35 blur-lg rounded-full"></div>
          <div className="absolute -bottom-8 w-[75%] h-[20px] mx-auto left-0 right-0
                          bg-slate-900/45 blur-md rounded-full"></div>
          
          {/* Subtle glow accent */}
          <div className="absolute top-[5%] right-[5%] w-[150px] h-[80px] 
                          bg-blue-100/40 rounded-full blur-xl"></div>
          
          {/* Text content */}
          <div className="relative z-10 text-center md:text-left">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Accent element */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center bg-green-500 px-3 py-1 rounded-full text-xs font-medium
                                 text-white tracking-wider shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></span>
                  FINANCIAL GROWTH
                </span>
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-slate-900"
                variants={itemVariants}
              >
                Let your finances grow with{" "}
                <span className="block mt-2 md:mt-3 relative">
                  WeSeedU
                </span>
              </motion.h1>
              
              {/* Subheading */}
              <motion.p 
                className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed"
                variants={itemVariants}
              >
                Discover sustainable investment opportunities that grow your wealth while making a positive impact on the world.
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center md:justify-start relative z-20"
              >
                <Button
                  onClick={onAction}
                  className="bg-slate-900 text-white font-medium px-8 py-6 rounded-lg text-lg
                             shadow-sm hover:shadow-md
                             hover:bg-slate-800 transition-all duration-300 ease-out hover:translate-y-[-2px] group"
                >
                  {actionButtonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Light reflections */}
            <div className="absolute top-[10%] left-[5%] w-[120px] h-[60px] 
                           bg-white/50 rounded-full blur-md mix-blend-overlay"></div>
          </div>
        </div>
        
        {/* Image Element with subtle floating effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -3, 0]  // Subtle movement range
          }}
          transition={{ 
            duration: 0.6, 
            delay: 0.3,
            y: { 
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }
          }}
          className="mt-12 md:mt-0 flex-shrink-0 relative pt-4 pb-16"
        >
          {/* Enhanced bottom shadows */}
          <div className="absolute -bottom-16 w-[100%] h-[50px] mx-auto left-0 right-0
                          bg-slate-900/25 blur-xl rounded-full"></div>
          <div className="absolute -bottom-12 w-[90%] h-[35px] mx-auto left-0 right-0
                          bg-slate-900/35 blur-lg rounded-full"></div>
          <div className="absolute -bottom-8 w-[75%] h-[20px] mx-auto left-0 right-0
                          bg-slate-900/45 blur-md rounded-full"></div>
                         

          {/* Image */}
          <div className="relative">
            <Image 
              src="/sustainable-development.png"
              alt="Financial growth chart showing stacked coins with golden upward trend"
              width={450}
              height={450}
              priority
              className="relative z-10 drop-shadow-md"
            />
          </div>

        </motion.div>
      </div>
    </section>
  )
} 
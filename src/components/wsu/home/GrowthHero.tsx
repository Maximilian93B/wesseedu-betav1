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
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
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
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image with Next Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/pexels-jahoo-388415.jpg" // Path to your image (place in public/images folder)
          alt="Financial growth background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
          style={{ objectPosition: "center" }}
        />
  
      </div>
      
      {/* Content positioned over the background */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Accent element - matching the screenshot styling */}
          <motion.div 
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full 
              border border-emerald-500/30 bg-emerald-900/20"
            variants={itemVariants}
          >
            <span className="text-sm font-medium text-emerald-400">Financial Freedom</span>
          </motion.div>
          
          {/* Main Heading - using the exact text and styling from screenshot */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight leading-tight"
            variants={itemVariants}
          >
            <span className="text-white">
              Let your finances grow with{" "}
            </span>
            <span className="block mt-2 md:mt-3 text-emerald-400">
              WeSeedU
            </span>
          </motion.h1>
          
          {/* Subheading - matching the screenshot text */}
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/80 mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Discover sustainable investment opportunities that grow your wealth while making a positive impact on the world.
          </motion.p>
          
          {/* CTA Button - matching the screenshot button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Button
              onClick={onAction}
              className="px-8 py-6 bg-emerald-600 hover:bg-emerald-500
                text-white shadow-lg shadow-emerald-800/30
                text-base font-medium rounded-lg transition-all duration-300 group"
            >
              {actionButtonText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 
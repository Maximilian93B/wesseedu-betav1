import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Sprout } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 170, damping: 20 }
  }
}

const pulseVariants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

interface WelcomeStepProps {
  onNext: () => void
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 py-6"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-10"
      >
        <div className="mx-auto w-20 h-20 mb-6 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 to-white/30 rounded-full blur-md"></div>
          <div className="absolute inset-0 bg-green-50/20 rounded-full animate-ping opacity-30 duration-1000 delay-300"></div>
          <div className="p-4 bg-gradient-to-br from-white to-green-50 rounded-full flex items-center justify-center relative shadow-xl">
            <Sprout className="h-9 w-9 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-black mb-3">
          Welcome to <span className="bg-gradient-to-r from-green-600 via-[#49c628] to-[#70f570] text-transparent bg-clip-text">WeSeedU</span>
        </h2>
        <p className="text-black/70 max-w-md mx-auto">
          We're excited to help you set up your sustainable investment portfolio that aligns with your values.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-black/5 shadow-lg"
      >
        <p className="text-black mb-4">
          We'll guide you through a quick setup process to personalize your investment experience. This will only take a few minutes to complete.
        </p>
        <p className="text-black">
          Get ready to discover opportunities that match both your financial goals and environmental values.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          delay: 0.2 
        }}
        className="pt-6"
      >
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400/50 to-white/50 opacity-70 rounded-xl blur-md"></div>
          
          <button 
            onClick={() => {
              console.log("WelcomeStep button clicked");
              if (typeof onNext === 'function') {
                onNext();
              } else {
                console.error("onNext is not a function", onNext);
              }
            }} 
            className="relative w-full bg-white hover:bg-slate-50 
              text-black font-medium border border-black/10
              shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
              transition-all duration-300 ease-out 
              hover:translate-y-[-2px] rounded-xl py-6 px-4 h-auto text-base group z-10
              flex justify-center items-center"
            type="button"
          >
            <span className="relative z-10 flex items-center">
              Let's get started 
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
        
        {/* Feature points with improved styling */}
        <div className="mt-6 space-y-4 bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-black/5 shadow-sm">
          <h3 className="text-black font-medium text-sm">During this setup, we'll:</h3>
          {[
            "Create your personalized investment profile",
            "Understand your sustainable interests",
            "Set up your preferred membership level",
            "Prepare personalized investment opportunities"
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="flex items-start space-x-3 group"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <span className="text-sm text-black">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
} 
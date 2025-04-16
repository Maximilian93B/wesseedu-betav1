import { motion } from "framer-motion"
import { Leaf } from "lucide-react"
import { useState, useEffect } from "react"

// Define animation variants for staggered children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    rotate: [0, 0.5, 0, -0.5, 0],
    transition: {
      y: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse", 
        ease: "easeInOut"
      },
      rotate: {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
}

// Type definition for particle positions
interface Particle {
  initialX: number;
  initialY: number;
  animateX: number;
  animateY: number;
  duration: number;
}

export function LoadingScreen() {
  // Use state to store particle positions, only generated client-side
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Generate random particle positions only on client-side
  useEffect(() => {
    setIsClient(true);
    
    // Generate random positions for particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      initialX: Math.random() * 400 - 200,
      initialY: Math.random() * 400 - 200,
      animateX: Math.random() * 400 - 200,
      animateY: Math.random() * 400 - 200,
      duration: 4 + Math.random() * 3
    }));
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#70f570] to-[#49c628] overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      ></div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '-2s' }}></div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center z-10"
      >
        {/* Animated brand icon */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="mb-10 relative"
        >
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm
            border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Leaf className="h-12 w-12 text-white" />
          </div>
          <div className="absolute inset-0 opacity-60">
            <div className="w-full h-full rounded-full bg-white/5 animate-ping" 
                 style={{ animationDuration: '3s' }}></div>
          </div>
        </motion.div>
        
        {/* Loading text with animations */}
        <motion.p 
          variants={itemVariants}
          className="text-2xl text-white font-medium mb-2 font-display tracking-tight relative"
        >
          <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Loading
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute"
          >...</motion.span>
        </motion.p>
        
        {/* Subtitle text */}
        <motion.p 
          variants={itemVariants}
          className="text-white/80 text-sm md:text-base font-body max-w-xs text-center mb-8"
        >
          Preparing your sustainable investment dashboard
        </motion.p>
        
        {/* Enhanced Progress bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "250px", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative h-2 bg-white/20 rounded-full overflow-hidden w-60 sm:w-80 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
            className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent"
          ></motion.div>
          
          {/* Pulsing dot at the end of progress */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </motion.div>
        
        {/* Dynamic floating particles - Only render on client side to prevent hydration mismatches */}
        {isClient && particles.map((particle, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: particle.initialX,
              y: particle.initialY,
            }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
              x: particle.animateX,
              y: particle.animateY,
            }}
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              delay: i * 0.6,
              repeatType: "loop"
            }}
            className="absolute w-6 h-6 rounded-full bg-white/20"
            style={{ filter: "blur(8px)" }}
          ></motion.div>
        ))}
      </motion.div>
    </div>
  )
} 
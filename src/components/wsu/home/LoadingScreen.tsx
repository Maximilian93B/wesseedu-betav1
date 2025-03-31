import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-700"
      style={{ 
        backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
      }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Spinner with animated opacity and rotation */}
        <div className="relative h-14 w-14">
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              rotate: 360,
              opacity: [0.5, 1, 0.5]
            }} 
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-14 h-14 border-2 border-t-slate-600 border-r-slate-400/60 border-b-slate-400/30 border-l-slate-400/80 rounded-full"></div>
          </motion.div>
        </div>
        
        {/* Loading message */}
        <p className="text-slate-700 font-medium text-sm tracking-wider">
          Preparing your sustainable investment dashboard...
        </p>
        
        {/* Optional subtle shadow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      </motion.div>
    </div>
  )
} 
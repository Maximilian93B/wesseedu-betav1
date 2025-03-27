import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-14 h-14 border-2 border-t-emerald-500 border-r-emerald-400/40 border-b-emerald-400/20 border-l-emerald-400/60 rounded-full animate-spin mb-6"></div>
        <p className="text-emerald-400/80 font-light tracking-wider">Preparing your sustainable investment dashboard...</p>
      </motion.div>
    </div>
  )
} 
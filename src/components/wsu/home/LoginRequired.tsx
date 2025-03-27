import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function LoginRequired() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
      >
        <p className="mb-6 text-xl text-center font-light">You need to be logged in to view this page</p>
        <Button 
          onClick={() => window.location.href = '/auth/login'}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-900/20"
        >
          Go to Login
        </Button>
      </motion.div>
    </div>
  )
} 
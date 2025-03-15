import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface WelcomeStepProps {
  onNext: () => void
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="space-y-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
            WeSeedU
          </span>
        </h2>
        <p className="text-center text-white/70 mb-8">
          Let's get you set up to start your sustainable investment journey
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
          <h3 className="font-medium mb-3 text-white">What to expect:</h3>
          <ul className="space-y-3 text-white/70">
            {[
              "Complete your personal profile",
              "Select your sustainable investment interests",
              "Choose your membership tier",
              "Start exploring sustainable investment opportunities"
            ].map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="flex items-start space-x-3"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white font-bold">{index + 1}</span>
                </div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-4"
      >
        <Button 
          onClick={onNext} 
          className="w-full group relative text-white border-white/20 hover:border-white/40 
            backdrop-blur-sm px-8 py-6 h-auto text-base
            bg-gradient-to-r from-white/10 to-white/5
            hover:from-white/20 hover:to-white/10
            shadow-lg shadow-teal-500/10
            hover:shadow-teal-500/20
            transition-all duration-300 ease-in-out"
          size="lg"
        >
          Let's Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  )
} 
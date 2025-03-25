import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CallToActionProps {
  onNavigate: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function CallToAction({ onNavigate }: CallToActionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-sm my-8"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Section heading */}
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Ready to make sustainable investments?
          </span>
        </motion.h2>
        
        {/* Description */}
        <motion.p 
          className="text-slate-600 mb-14 max-w-2xl mx-auto text-lg leading-relaxed"
          variants={itemVariants}
        >
          Join thousands of forward-thinking investors who are building wealth 
          while supporting businesses committed to a sustainable future.
        </motion.p>
        
        {/* Single, focused call to action button */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          <Button 
            onClick={() => onNavigate('companies')}
            className="px-8 py-6 bg-gradient-to-r from-blue-500 to-emerald-500 
              hover:from-blue-400 hover:to-emerald-400 text-white text-base font-medium 
              rounded-lg shadow-md hover:shadow-lg
              transition-all duration-300 group border-0"
            size="lg"
          >
            <span>Start investing today</span>
            <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
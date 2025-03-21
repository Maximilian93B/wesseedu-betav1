import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

interface HomeHeroProps {
  profile: any;
  onNavigate: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

export function HomeHero({ profile, onNavigate }: HomeHeroProps) {
  return (
    <motion.section 
      className="mb-20 pt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="space-y-5 text-center" variants={itemVariants}>
        <div className="flex justify-center mb-4">
          <motion.span 
            className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium tracking-wider uppercase 
              bg-gradient-to-r from-emerald-500/10 to-emerald-400/20 px-5 py-1.5 rounded-full border border-emerald-400/20
              shadow-inner shadow-emerald-500/5"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.15)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Welcome Back, {profile?.name || profile?.username || profile?.full_name || 'Investor'} <Sparkles className="h-3.5 w-3.5" />
          </motion.span>
        </div>
        <h1 className="relative">
          <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-400/20 
            via-white/5 to-emerald-400/20 animate-pulse"></span>
          <span className="relative text-4xl md:text-5xl lg:text-7xl font-bold 
            bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text 
            text-transparent tracking-tight leading-tight">
            Your Investment <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">Dashboard</span>
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
          Track your portfolio, discover opportunities, and manage your 
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent font-normal"> sustainable investments</span>
        </p>
        
        <motion.div 
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-emerald-500 
              hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-900/20
              text-base font-medium rounded-lg transition-all duration-300"
          >
            View My Dashboard
          </Button>
          <Button
            onClick={() => onNavigate('companies')}
            variant="outline"
            className="px-8 py-6 border-white/10 text-zinc-200 hover:text-white
              hover:bg-zinc-800/50 hover:border-emerald-500/30 text-base font-medium
              rounded-lg transition-all duration-300"
          >
            Explore Investments
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
} 
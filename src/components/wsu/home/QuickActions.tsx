import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Users, Bookmark, ChevronRight } from "lucide-react"

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

interface QuickActionsProps {
  onNavigate: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <motion.section 
      className="mb-0 pb-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        variants={itemVariants} 
        className="text-2xl font-semibold text-white mb-8 flex items-center"
      >
        <span className="border-b-2 border-emerald-500/30 pb-1 mr-2">Quick Actions</span>
        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-md">
          One-click access
        </span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button 
            onClick={() => onNavigate('companies')}
            className="w-full flex items-center justify-center gap-3 h-24 bg-zinc-900/50 border-2 border-white/5 
              group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
              hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
          >
            <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
              group-hover:border-emerald-500/20 transition-all duration-500">
              <Search className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="text-left flex-1">
              <span className="block text-white font-medium text-lg">Explore Companies</span>
              <span className="text-sm text-zinc-500">Find sustainable businesses</span>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
              transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button 
            onClick={() => onNavigate('communities')}
            className="w-full flex items-center justify-center gap-3 h-24 bg-zinc-900/50 border-2 border-white/5 
              group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
              hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
          >
            <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
              group-hover:border-emerald-500/20 transition-all duration-500">
              <Users className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="text-left flex-1">
              <span className="block text-white font-medium text-lg">Join Communities</span>
              <span className="text-sm text-zinc-500">Connect with investors</span>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
              transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button 
            onClick={() => onNavigate('saved')}
            className="w-full flex items-center justify-center gap-3 h-24 bg-zinc-900/50 border-2 border-white/5 
              group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
              hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
          >
            <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
              group-hover:border-emerald-500/20 transition-all duration-500">
              <Bookmark className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="text-left flex-1">
              <span className="block text-white font-medium text-lg">View Watchlist</span>
              <span className="text-sm text-zinc-500">Track favorite companies</span>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
              transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
} 
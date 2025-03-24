import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Users, Bookmark, ChevronRight, PlusCircle, BarChart3, Wallet, Lightbulb } from "lucide-react"

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
  // Handle add funds action
  const handleAddFunds = () => {
    // Future implementation: this would open a modal or navigate to a funds page
    console.log("Add funds action triggered");
    // For now we can navigate to dashboard, this can be updated when the funds page is created
    onNavigate('dashboard');
  };

  return (
    <motion.section 
      className="mb-8 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Visual enhancement elements */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute -top-10 left-1/4 w-32 h-32 bg-emerald-400/20 blur-[80px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-48 h-48 bg-emerald-400/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>
      
      <motion.div 
        className="relative z-10 bg-gradient-to-b from-zinc-900/80 to-black/80 border-2 border-emerald-500/20 rounded-2xl p-8 backdrop-blur-sm shadow-xl shadow-emerald-500/5"
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.1)" }}
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-2xl font-semibold text-white mb-8 flex items-center"
        >
          <span className="border-b-2 border-emerald-500/50 pb-1 mr-2">Quick Actions</span>
          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-md">
            One-click access
          </span>
        </motion.h2>
        
        {/* Modern grid layout with responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Explore Companies */}
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
              className="w-full flex items-center justify-center gap-3 h-20 bg-zinc-900/50 border-2 border-white/5 
                group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
            >
              <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                group-hover:border-emerald-500/20 transition-all duration-500">
                <Search className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-white font-medium text-lg">Explore Companies</span>
                <span className="text-sm text-zinc-500">Find sustainable businesses</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* NEW: Add Funds - Highlighted position for prominence */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.08), 0 10px 10px -5px rgba(16, 185, 129, 0.04)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={handleAddFunds}
              className="w-full flex items-center justify-center gap-3 h-20 bg-emerald-900/20 border-2 border-emerald-500/30 
                group hover:border-emerald-500/50 hover:bg-emerald-900/30 transition-all duration-500 
                hover:shadow-lg hover:shadow-emerald-500/20 rounded-xl"
            >
              <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/30 group-hover:bg-emerald-500/20 
                group-hover:border-emerald-500/30 transition-all duration-500">
                <Wallet className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-white font-medium text-lg">Add Funds</span>
                <span className="text-sm text-emerald-300/70">Deposit for investments</span>
              </div>
              <ChevronRight className="h-5 w-5 text-emerald-400/70 group-hover:text-emerald-400 opacity-50 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* View Analytics */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-zinc-900/50 border-2 border-white/5 
                group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
            >
              <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                group-hover:border-emerald-500/20 transition-all duration-500">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-white font-medium text-lg">View Analytics</span>
                <span className="text-sm text-zinc-500">Track your impact</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Join Communities */}
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
              className="w-full flex items-center justify-center gap-3 h-20 bg-zinc-900/50 border-2 border-white/5 
                group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
            >
              <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                group-hover:border-emerald-500/20 transition-all duration-500">
                <Users className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-white font-medium text-lg">Join Communities</span>
                <span className="text-sm text-zinc-500">Connect with investors</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* View Watchlist */}
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
              className="w-full flex items-center justify-center gap-3 h-20 bg-zinc-900/50 border-2 border-white/5 
                group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
            >
              <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                group-hover:border-emerald-500/20 transition-all duration-500">
                <Bookmark className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-white font-medium text-lg">View Watchlist</span>
                <span className="text-sm text-zinc-500">Track favorite companies</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Get Insights */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-zinc-900/50 border-2 border-white/5 
                group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
            >
              <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                group-hover:border-emerald-500/20 transition-all duration-500">
                <Lightbulb className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-white font-medium text-lg">Get Insights</span>
                <span className="text-sm text-zinc-500">Personalized recommendations</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
} 
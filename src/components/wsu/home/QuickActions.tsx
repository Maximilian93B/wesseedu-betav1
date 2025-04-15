import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Users, Bookmark, ChevronRight, PlusCircle, BarChart3, Wallet, Lightbulb } from "lucide-react"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
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
      className="mb-8 relative isolate"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Green apple gradient background - increased z-index to ensure visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#70f570] to-[#49c628] rounded-xl sm:rounded-2xl -z-1 before:absolute before:inset-0 before:content-[''] before:bg-gradient-to-r before:from-[#70f570] before:to-[#49c628] before:opacity-40 before:rounded-xl before:sm:rounded-2xl"></div>
      
      <motion.div 
        className="relative z-10 rounded-xl sm:rounded-2xl p-8 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.1)] 
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-shadow duration-500 border border-white/20"
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)" }}
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-2xl font-medium text-white mb-8 flex items-center font-display"
        >
          <span className="border-b border-white/30 pb-1 mr-2">Quick Actions</span>
          <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-md border border-white/20">
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
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('companies')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white/90 
                group hover:bg-white transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg"
            >
              <div className="bg-[#70f570]/10 p-3 rounded-md shadow-sm group-hover:bg-[#70f570]/20 
                transition-all duration-300">
                <Search className="h-5 w-5 text-[#1a5e0a]" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-[#1a5e0a] font-medium text-lg font-display">Explore Companies</span>
                <span className="text-sm text-black/70 font-body">Find sustainable businesses</span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#49c628] group-hover:text-[#1a5e0a] opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Add Funds - Subtle highlight */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={handleAddFunds}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white
                group hover:bg-white/90 transition-all duration-300 
                shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] rounded-lg"
            >
              <div className="bg-[#49c628]/20 p-3 rounded-md shadow-sm group-hover:bg-[#49c628]/30 
                transition-all duration-300">
                <Wallet className="h-5 w-5 text-[#1a5e0a]" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-[#1a5e0a] font-medium text-lg font-display">Add Funds</span>
                <span className="text-sm text-black/70 font-body">Deposit for investments</span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#49c628] group-hover:text-[#1a5e0a] opacity-50 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* View Analytics */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white/90 
                group hover:bg-white transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg"
            >
              <div className="bg-[#70f570]/10 p-3 rounded-md shadow-sm group-hover:bg-[#70f570]/20 
                transition-all duration-300">
                <BarChart3 className="h-5 w-5 text-[#1a5e0a]" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-[#1a5e0a] font-medium text-lg font-display">View Analytics</span>
                <span className="text-sm text-black/70 font-body">Track your impact</span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#49c628] group-hover:text-[#1a5e0a] opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Join Communities */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('communities')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white/90 
                group hover:bg-white transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg"
            >
              <div className="bg-[#70f570]/10 p-3 rounded-md shadow-sm group-hover:bg-[#70f570]/20 
                transition-all duration-300">
                <Users className="h-5 w-5 text-[#1a5e0a]" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-[#1a5e0a] font-medium text-lg font-display">Join Communities</span>
                <span className="text-sm text-black/70 font-body">Connect with investors</span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#49c628] group-hover:text-[#1a5e0a] opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* View Watchlist */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('saved')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white/90 
                group hover:bg-white transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg"
            >
              <div className="bg-[#70f570]/10 p-3 rounded-md shadow-sm group-hover:bg-[#70f570]/20 
                transition-all duration-300">
                <Bookmark className="h-5 w-5 text-[#1a5e0a]" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-[#1a5e0a] font-medium text-lg font-display">View Watchlist</span>
                <span className="text-sm text-black/70 font-body">Track favorite companies</span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#49c628] group-hover:text-[#1a5e0a] opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Get Insights */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white/90 
                group hover:bg-white transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg"
            >
              <div className="bg-[#70f570]/10 p-3 rounded-md shadow-sm group-hover:bg-[#70f570]/20 
                transition-all duration-300">
                <Lightbulb className="h-5 w-5 text-[#1a5e0a]" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-[#1a5e0a] font-medium text-lg font-display">Get Insights</span>
                <span className="text-sm text-black/70 font-body">Personalized recommendations</span>
              </div>
              <ChevronRight className="h-5 w-5 text-[#49c628] group-hover:text-[#1a5e0a] opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
} 
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
      {/* Subtle background elements with monochromatic palette */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[800px] h-[500px] bg-slate-100/30 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute -top-10 left-1/4 w-32 h-32 bg-slate-200/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-48 h-48 bg-slate-100/30 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      
      <motion.div 
        className="relative z-10 bg-white/90 rounded-xl p-8 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow duration-500"
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.07)" }}
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-2xl font-medium text-slate-800 mb-8 flex items-center"
        >
          <span className="border-b border-slate-300 pb-1 mr-2">Quick Actions</span>
          <span className="bg-slate-50 text-slate-600 text-xs px-2 py-1 rounded-md">
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
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('companies')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white 
                group hover:bg-slate-50/80 transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-lg"
            >
              <div className="bg-slate-50 p-3 rounded-md shadow-sm group-hover:bg-white 
                transition-all duration-300">
                <Search className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-slate-800 font-medium text-lg">Explore Companies</span>
                <span className="text-sm text-slate-500">Find sustainable businesses</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Add Funds - Subtle highlight */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={handleAddFunds}
              className="w-full flex items-center justify-center gap-3 h-20 bg-slate-900 
                group hover:bg-slate-800 transition-all duration-300 
                shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)] rounded-lg"
            >
              <div className="bg-slate-800 p-3 rounded-md shadow-md group-hover:bg-slate-700 
                transition-all duration-300">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-white font-medium text-lg">Add Funds</span>
                <span className="text-sm text-slate-300">Deposit for investments</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-white opacity-50 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* View Analytics */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white 
                group hover:bg-slate-50/80 transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-lg"
            >
              <div className="bg-slate-50 p-3 rounded-md shadow-sm group-hover:bg-white 
                transition-all duration-300">
                <BarChart3 className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-slate-800 font-medium text-lg">View Analytics</span>
                <span className="text-sm text-slate-500">Track your impact</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Join Communities */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('communities')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white 
                group hover:bg-slate-50/80 transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-lg"
            >
              <div className="bg-slate-50 p-3 rounded-md shadow-sm group-hover:bg-white 
                transition-all duration-300">
                <Users className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-slate-800 font-medium text-lg">Join Communities</span>
                <span className="text-sm text-slate-500">Connect with investors</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* View Watchlist */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('saved')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white 
                group hover:bg-slate-50/80 transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-lg"
            >
              <div className="bg-slate-50 p-3 rounded-md shadow-sm group-hover:bg-white 
                transition-all duration-300">
                <Bookmark className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-slate-800 font-medium text-lg">View Watchlist</span>
                <span className="text-sm text-slate-500">Track favorite companies</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
          
          {/* Get Insights */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center justify-center gap-3 h-20 bg-white 
                group hover:bg-slate-50/80 transition-all duration-300 
                shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-lg"
            >
              <div className="bg-slate-50 p-3 rounded-md shadow-sm group-hover:bg-white 
                transition-all duration-300">
                <Lightbulb className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left flex-1">
                <span className="block text-slate-800 font-medium text-lg">Get Insights</span>
                <span className="text-sm text-slate-500">Personalized recommendations</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 
                transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
} 
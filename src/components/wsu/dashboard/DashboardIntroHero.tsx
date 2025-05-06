import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CurvedTransition } from "@/components/ui/CurvedTransition";


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

// Define the ProfileData interface here
interface ProfileData {
  first_name?: string;
  [key: string]: any; // Allow for other properties
}

interface DashboardIntroHeroProps {
  profile?: ProfileData | null;
  onNavigate?: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

export function DashboardIntroHero({ profile, onNavigate }: DashboardIntroHeroProps) {
  // Handle navigation if provided
  const handleNavigation = (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(black_1px,transparent_0)] bg-[length:20px_20px] opacity-[0.03] z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto py-8 sm:py-10 md:py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center px-4 sm:px-6 md:px-8">
            {/* Left Column - Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-black"
            >
              {/* Welcome badge */}
              <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                <div className="inline-flex items-center px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs font-medium rounded-full text-black border border-black/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                  style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse mr-1.5 sm:mr-2"></span>
                  {profile ? `Welcome back, ${profile.first_name || 'Investor'}` : 'Welcome to WeSeedU'}
                </div>
              </motion.div>
              
              {/* Main heading */}
              <motion.h1 
                variants={itemVariants} 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6 font-display"
              >
                Your WeSeedU <br /> Investment Dashboard
              </motion.h1>
              
              {/* Description */}
              <motion.p variants={itemVariants} className="text-black/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8 font-body">
                This dashboard is your command center for sustainable investing. Track your impact, discover aligned companies, and grow your investments.
              </motion.p>
              
              {/* Trust indicators */}
              <motion.div variants={containerVariants} className="mb-6 sm:mb-8">
                <div className="flex flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3">
                  <motion.span variants={itemVariants} className="flex items-center text-xs sm:text-sm text-black">
                    <div className="flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-white/20 text-black mr-1.5 sm:mr-2 md:mr-3 border border-black/40 shadow-md">
                      <Check size={10} className="sm:hidden" />
                      <Check size={12} className="hidden sm:block" />
                    </div>
                    <span className="font-medium">Personalized Insights</span>
                  </motion.span>
                  
                  <motion.span variants={itemVariants} className="flex items-center text-xs sm:text-sm text-black">
                    <div className="flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-white/20 text-black mr-1.5 sm:mr-2 md:mr-3 border border-black/40 shadow-md">
                      <Check size={10} className="sm:hidden" />
                      <Check size={12} className="hidden sm:block" />
                    </div>
                    <span className="font-medium">Impact Tracking</span>
                  </motion.span>
                  
                  <motion.span variants={itemVariants} className="flex items-center text-xs sm:text-sm text-black">
                    <div className="flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-white/20 text-black mr-1.5 sm:mr-2 md:mr-3 border border-black/40 shadow-md">
                      <Check size={10} className="sm:hidden" />
                      <Check size={12} className="hidden sm:block" />
                    </div>
                    <span className="font-medium">AI-Powered Analysis</span>
                  </motion.span>
                </div>
              </motion.div> 
              
              {/* Action buttons */}
              <motion.div variants={containerVariants} className="flex flex-wrap gap-3 sm:gap-4">
                <motion.div variants={itemVariants} className="w-full sm:w-auto">
                  <Button
                    onClick={() => handleNavigation('dashboard')}
                    className="bg-white text-slate-800 hover:bg-white/95 hover:text-green-800 border-none shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] rounded-full px-5 sm:px-7 py-2.5 sm:py-3 font-semibold transition-all duration-300 group w-full sm:w-auto h-auto text-sm sm:text-base font-helvetica"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      View Dashboard
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div variants={itemVariants} className="w-full sm:w-auto">
                  <Button
                    onClick={() => handleNavigation('companies')}
                    variant="outline"
                    className="bg-transparent hover:bg-white/15 text-black border border-black/40 hover:border-black/60 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] rounded-full px-5 sm:px-7 py-2.5 sm:py-3 font-medium transition-all duration-300 backdrop-blur-sm w-full sm:w-auto h-auto text-sm sm:text-base font-helvetica"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Explore Companies
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Scroll indicator */}
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1.2 } }}
                className="mt-8 sm:mt-10 md:mt-16 hidden md:flex flex-col items-center"
              >
                <span className="text-black/70 text-xs mb-2">Scroll to explore</span>
                <ChevronDown className="h-5 w-5 text-black/70 animate-bounce" />
              </motion.div>
            </motion.div>
            
            {/* Right Column - Dashboard Preview */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex items-center justify-center mt-4 sm:mt-0"
            >
              <motion.div variants={itemVariants} className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto transform scale-100 sm:scale-105">
                {/* Dashboard visualization */}
                <div className="relative z-10 bg-white rounded-xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.25)] border border-white/80 backdrop-blur-xl">
                  <div className="bg-gradient-to-b from-slate-50 to-white p-2 sm:p-3 border-b border-slate-200/80">
                    <div className="flex items-center">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="ml-3 sm:ml-4 text-xs text-slate-500 font-medium">WeSeedU Dashboard</div>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4">
                    <Image
                      src="/dashboard-preview.png"
                      alt="WeSeedU Dashboard"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-md"
                      priority
                    />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] rounded-full bg-gradient-to-r from-[#70f570]/20 to-[#49c628]/20 blur-xl"></div>
                
                {/* Stats card overlapping dashboard */}
                <motion.div
                  variants={itemVariants}
                  className="absolute -bottom-6 -right-6 sm:-bottom-12 sm:-right-12 md:-bottom-16 md:-right-16 bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-xl border border-slate-200/80 w-40 sm:w-48 md:w-56 z-20"
                >
                  <h4 className="text-xs sm:text-sm md:text-base font-semibold text-slate-800 mb-2 sm:mb-3">Your Impact</h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                        <span className="text-slate-600">Portfolio Score</span>
                        <span className="font-semibold text-green-600">8.5/10</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">
                        <span className="text-slate-600">Sustainability</span>
                        <span className="font-semibold text-green-600">92%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Curved transition to white section - positioned outside the section for full width */}
      <div className="w-full">
        <CurvedTransition fillColor="white" curveType="arc" className="w-full" />
      </div>
    </>
  );
} 
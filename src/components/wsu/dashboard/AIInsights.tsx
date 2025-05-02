import { motion } from "framer-motion";
import { Braces, Server, Cpu, Database, Brain, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  }
};

const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse", 
      ease: "easeInOut"
    }
  }
};

export function AIInsights() {
  const aiCapabilities = [
    {
      title: "Data Collection",
      description: "Our AI continuously gathers sustainable investment data from trusted public sources",
      icon: <Database className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      title: "ESG Analysis",
      description: "Algorithms analyze environmental, social, and governance factors for each company",
      icon: <Braces className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      title: "Pattern Recognition",
      description: "Machine learning identifies investment patterns and sustainability trends",
      icon: <Brain className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      title: "Personalized Insights",
      description: "AI matches your values with companies that share your sustainability priorities",
      icon: <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Green apple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#70f570] to-[#49c628] z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-white order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 sm:mb-6 font-display">
                AI-Powered Sustainable Investing
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed font-body">
                Behind WeSeedU&apos;s intuitive dashboard is a powerful AI engine designed to help you make informed sustainable investment decisions.
              </p>
            </motion.div>
            
            <motion.div variants={containerVariants} className="space-y-3 sm:space-y-4 md:space-y-5">
              {aiCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 md:px-5 py-3 sm:py-4 border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.05)]"
                >
                  <div className="mr-3 sm:mr-4 bg-white/20 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                    {capability.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 font-display">{capability.title}</h3>
                    <p className="text-white/80 text-xs sm:text-sm font-body">{capability.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-6 sm:mt-8 md:mt-10">
              <Button asChild className="bg-white text-slate-800 hover:bg-white/95 hover:text-green-800 border-none shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] rounded-full px-5 sm:px-7 py-2.5 sm:py-3 font-semibold transition-all duration-300 group text-xs sm:text-sm h-auto font-helvetica">
                <Link href="/dashboard/overview">
                  <span className="flex items-center justify-center">
                    View Your Insights
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transform -translate-x-0.5 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Content - AI Visualization with integrated card and prominent bot */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex justify-center items-center relative h-full min-h-[300px] sm:min-h-[350px] md:min-h-[420px] order-1 lg:order-2"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Prominent AI Bot with integrated card design */}
              <div className="relative flex items-center justify-center">
                {/* The Card - enhanced with better styling */}
                <motion.div
                  variants={itemVariants}
                  className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden border border-white/90 w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px] ml-12 sm:ml-16 md:ml-24 lg:ml-32"
                >
                  <div className="p-3 sm:p-4 md:p-5">
                    <div className="flex items-center mb-2.5">
                      <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-2">
                        <Server className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 font-display">AI Insight Analysis</h3>
                    </div>
                    
                    {/* Enhanced visualization content */}
                    <div className="space-y-2 sm:space-y-3">
                      {/* Company analysis visualization - enhanced */}
                      <div className="bg-slate-50 rounded-lg p-2 sm:p-2.5 border border-slate-200/80 shadow-sm">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] sm:text-xs font-medium text-slate-800">Company Sustainability Analysis</span>
                          <Server className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
                        </div>
                        
                        <div className="space-y-1.5 sm:space-y-2">
                          {/* Environmental score - enhanced */}
                          <div>
                            <div className="flex justify-between text-[8px] sm:text-[10px] mb-0.5">
                              <span className="text-slate-600">Environmental Score</span>
                              <span className="font-medium text-slate-800">85%</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: "85%" }}></div>
                            </div>
                          </div>
                          
                          {/* Social score - enhanced */}
                          <div>
                            <div className="flex justify-between text-[8px] sm:text-[10px] mb-0.5">
                              <span className="text-slate-600">Social Score</span>
                              <span className="font-medium text-slate-800">72%</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: "72%" }}></div>
                            </div>
                          </div>
                          
                          {/* Governance score - enhanced */}
                          <div>
                            <div className="flex justify-between text-[8px] sm:text-[10px] mb-0.5">
                              <span className="text-slate-600">Governance Score</span>
                              <span className="font-medium text-slate-800">91%</span>
                            </div>
                            <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: "91%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI recommendation - enhanced */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100/70 rounded-lg p-2 sm:p-2.5 border border-green-100 shadow-sm">
                        <div className="flex items-center mb-1">
                          <div className="bg-green-100 p-0.5 sm:p-1 rounded-full mr-1 sm:mr-1.5">
                            <Brain className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-green-600" />
                          </div>
                          <span className="text-[8px] sm:text-[10px] font-medium text-green-800">AI Recommendation</span>
                        </div>
                        <p className="text-[8px] sm:text-[10px] text-green-700 leading-tight">This company aligns with your environmental values and has strong growth potential in renewable energy markets.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Premium AI Bot Image - larger size while maintaining composition */}
                <motion.div
                  className="absolute -left-14 sm:-left-20 md:-left-28 lg:-left-40 bottom-[-60px] sm:bottom-[-100px] md:bottom-[-160px] lg:bottom-[-200px] z-20"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.4, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  <Image 
                    src="/ai-bot2.png" 
                    alt="AI Assistant" 
                    width={300}
                    height={380}
                    className="w-[180px] sm:w-[240px] md:w-[350px] lg:w-[400px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                    priority
                  />
                </motion.div>
              </div>
              
              {/* Subtle shadow effect to ground the elements */}
              <div className="absolute -bottom-10 left-0 right-0 h-10 sm:h-20 bg-black/10 blur-xl rounded-full mx-8 z-0"></div>
            </div>
                  
            {/* Floating animation elements - adjusted for responsive positioning */}
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/80"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 2.5,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            <motion.div 
              className="absolute top-1/3 left-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/80"
              animate={{ 
                y: [0, -8, 0],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            {/* Additional floating particles for visual interest on mobile */}
            <motion.div 
              className="absolute top-1/2 right-1/3 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/80"
              animate={{ 
                y: [0, -6, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 1.8,
                delay: 0.3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
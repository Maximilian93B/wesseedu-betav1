import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 25 }
  }
}

export function HowItWorks() {
  // How it works steps
  const howItWorksSteps = [
    {
      number: "01",
      title: "Define Your Values",
      description: "Identify the sustainability goals and causes that matter most to you"
    },
    {
      number: "02",
      title: "Discover Aligned Companies",
      description: "Find businesses that match your values and environmental priorities"
    },
    {
      number: "03",
      title: "Invest With Purpose",
      description: "Put your money to work in companies making a positive impact"
    },
    {
      number: "04",
      title: "Track Your Impact",
      description: "Monitor both financial returns and environmental/social contributions"
    },
    {
      number: "05",
      title: "Earn Rewards",
      description: "Get incentives and benefits for your sustainable investment choices"
    }
  ]

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUpVariant}
      className="mb-16 sm:mb-20 md:mb-24 relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-[0_8px_25px_rgb(0,0,0,0.03)]"
      style={{ 
        backgroundImage: "linear-gradient(to right, #ffffff, #f8f8ff, #f0f1ff, #e6eaff, #dde4ff)" 
      }}
    >
      {/* Background subtle dot texture */}
      <div className="absolute inset-0 opacity-[0.01]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, #64748b 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Top header section */}
      <div className="relative z-10 p-6 sm:p-8 md:p-12 pb-0 sm:pb-0">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-xl mx-auto text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-5 relative inline-block">
            How WeSeedU Works
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-[2px] bg-gradient-to-r from-slate-400/30 via-slate-500 to-slate-400/30"></span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">Follow these steps to maximize your sustainable investment journey.</p>
        </motion.div>
      </div>

      {/* Steps grid section */}
      <div className="relative z-10 px-4 sm:px-6 md:px-12 pb-10 sm:pb-12">
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
        >
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200/80 
                shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] 
                overflow-hidden relative group"
            >
              {/* Top accent gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400/30 via-slate-500/50 to-slate-400/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              {/* Step number indicator */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full 
                bg-slate-800/90 text-white text-xs sm:text-sm font-medium shadow-lg transform rotate-0 group-hover:rotate-3 transition-all duration-300">
                {step.number}
              </div>
              
              <div className="p-5 sm:p-7 pt-6 sm:pt-8">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center">
                  {step.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-3 sm:mb-4">{step.description}</p>
                
                {/* Progress indicator */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 text-xs">
                  <div className="p-0.5 sm:p-1 rounded-full bg-slate-100 group-hover:bg-emerald-50 transition-colors duration-300">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <span className="font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    Progress tracking
                  </span>
                </div>
              </div>
              
              {/* Bottom connector line */}
              {(index < howItWorksSteps.length - 1 && index % 3 !== 2) && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-6 h-[1px] bg-slate-300/70 transform translate-x-6"></div>
              )}
              
              {/* Down connector line for mobile and tablet */}
              {(index < howItWorksSteps.length - 1) && (
                <div className="lg:hidden absolute left-1/2 bottom-0 w-[1px] h-6 bg-slate-300/70 transform translate-y-6"></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom action hint */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 text-center"
        >
          <a 
            href="#get-started" 
            className="inline-flex items-center gap-1.5 sm:gap-2 text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm 
              px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white shadow-sm hover:shadow-md border border-slate-200/80 
              transition-all duration-300 group"
          >
            Get started today
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
} 
import { motion } from "framer-motion"

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function HowItWorks() {
  // How it works steps
  const howItWorksSteps = [
    {
      number: "01",
      title: "Monitor Your Portfolio",
      description: "Track the performance of your current sustainable investments"
    },
    {
      number: "02",
      title: "Explore New Opportunities",
      description: "Discover additional companies that match your sustainability goals"
    },
    {
      number: "03",
      title: "Manage Your Investments",
      description: "Update your portfolio based on performance and impact metrics"
    },
    {
      number: "04",
      title: "Connect With Community",
      description: "Share insights and strategies with like-minded sustainable investors"
    }
  ]

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUpVariant}
      className="mb-20"
    >
      <h2 className="text-2xl font-semibold text-zinc-900 mb-10 flex items-center">
        <span className="border-b-2 border-emerald-600 pb-1">How WeSeedU Works</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {howItWorksSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-b from-white to-zinc-50 border border-zinc-200 rounded-xl p-7 
              hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-500 
              relative overflow-hidden group"
            whileHover={{ y: -5 }}
          >
            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 text-8xl font-bold text-emerald-500/10 group-hover:text-emerald-500/20
              transition-all duration-700">{step.number}</div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-50 rounded-full opacity-0 
              group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
            
            {/* Step indicator */}
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700
              font-semibold mb-4 relative z-10">{index + 1}</div>
            
            <h3 className="text-lg font-medium text-zinc-900 mb-3 relative z-10">{step.title}</h3>
            <p className="text-sm text-zinc-600 relative z-10">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
} 
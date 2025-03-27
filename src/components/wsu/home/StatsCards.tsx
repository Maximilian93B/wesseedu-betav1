"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Award, Globe } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

const stats = [
  {
    icon: <Users className="h-6 w-6 text-slate-600" />,
    value: "12,000+",
    label: "Active Investors",
    description: "Join our growing community"
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-slate-600" />,
    value: "$142M",
    label: "Total Investments",
    description: "Making an impact together"
  },
  {
    icon: <Award className="h-6 w-6 text-slate-600" />,
    value: "98%",
    label: "Client Satisfaction",
    description: "Trusted by investors"
  },
  {
    icon: <Globe className="h-6 w-6 text-slate-600" />,
    value: "60+",
    label: "Countries Served",
    description: "Global investment reach"
  }
]

export function StatsCards() {
  return (
    <div className="bg-slate-50 py-20 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, #64748b 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 
                  shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                  transition-all duration-500 hover:translate-y-[-5px] relative"
              >
                {/* Card highlight at top */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/20 via-slate-300/40 to-slate-300/20"></div>
                
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-slate-100 mr-3">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm uppercase tracking-wide font-semibold text-slate-700 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
import { motion } from "framer-motion"
import { DollarSign, Leaf, Globe, TrendingDown } from "lucide-react"

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

export function PlatformImpact() { 
  // Platform metrics for the impact section
  const platformMetrics = [
    {
      title: "Total Sustainable Investments",
      value: "$142M+",
      icon: <DollarSign className="h-6 w-6 text-slate-600" />,
      change: "+18% this year"
    },
    {
      title: "Carbon Footprint Reduced",
      value: "87K tons",
      icon: <Leaf className="h-6 w-6 text-slate-600" />,
      change: "+12% this quarter" 
    },
    {
      title: "Companies Supported",
      value: "214+",
      icon: <Globe className="h-6 w-6 text-slate-600" />,
      change: "+32 in 2023"
    },
    {
      title: "Emissions Averted",
      value: "54K tons",
      icon: <TrendingDown className="h-6 w-6 text-slate-600" />,
      change: "+21% this year"
    }
  ]

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUpVariant}
      className="mb-0"
    >
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
        <span className="border-b-2 border-slate-500 pb-1">Our Collective Impact</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformMetrics.map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-500"
          >
            <div className="flex flex-col mb-4">
              <div className="p-2.5 bg-slate-100 rounded-lg inline-flex w-fit border border-slate-200 mb-3">
                {metric.icon}
              </div>
              <h3 className="text-sm font-medium text-slate-700">{metric.title}</h3>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{metric.value}</p>
              <span className="text-xs text-slate-600">{metric.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
} 
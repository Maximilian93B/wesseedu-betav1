import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BarChart } from "lucide-react"

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

interface StatsCardsProps {
  profile: any;
}

export function StatsCards({ profile }: StatsCardsProps) {
  // Prepare stats from profile data with default values if data is missing
  const stats = [
    {
      title: "Your Investment",
      value: `$${profile?.total_investments?.toLocaleString() || '0'}`,
      icon: <TrendingUp className="h-10 w-10 text-emerald-400" />,
      detail: "Total portfolio value"
    },
    {
      title: "Impact Score",
      value: `${profile?.impact_score || '0'}/10`,
      icon: <BarChart className="h-10 w-10 text-emerald-400" />,
      detail: "Your sustainability rating"
    },
  ]

  return (
    <motion.section 
      className="mb-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Card className="bg-zinc-900/50 border-2 border-white/5 backdrop-blur-sm
              hover:border-emerald-500/30 group transition-all duration-500 
              hover:shadow-xl hover:shadow-emerald-500/10 overflow-hidden">
              <CardHeader className="pb-2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <CardTitle className="text-zinc-400 text-sm font-normal">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">{stat.value}</span>
                    <p className="text-xs text-zinc-500">{stat.detail}</p>
                  </div>
                  <div className="bg-zinc-800/50 p-3.5 rounded-xl border border-white/5 group-hover:bg-emerald-900/20 
                    group-hover:border-emerald-500/20 transition-all duration-500">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
} 
"use client"

import { Shield, CheckCircle, BarChart2, FileCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function VettingProcess() {
  const steps = [
    {
      icon: <Shield className="h-12 w-12 text-teal-400" />,
      title: "Due Diligence",
      description:
        "Comprehensive financial and operational assessment by leading accounting firms to verify business fundamentals.",
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-teal-400" />,
      title: "Performance Analysis",
      description: "In-depth evaluation of business metrics, growth potential, and financial health by industry experts.",
    },
    {
      icon: <FileCheck className="h-12 w-12 text-teal-400" />,
      title: "Compliance Review",
      description: "Thorough verification of regulatory compliance and corporate governance to ensure operational integrity.",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-teal-400" />,
      title: "Quality Assurance",
      description: "Final verification ensuring all listed opportunities meet our rigorous standards for transparency and potential.",
    },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 lg:space-y-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.2] tracking-tight mx-auto max-w-4xl">
            Rigorous Vetting by{" "}
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 text-transparent bg-clip-text animate-flow">
              Industry Experts
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-white mx-auto max-w-3xl leading-relaxed">
            Every investment opportunity on WeSeedU undergoes comprehensive verification by leading industry experts.
            We ensure transparency and potential in every listing through our thorough evaluation process.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-white/5 backdrop-blur-sm 
                border border-white/10 hover:border-teal-500/30 
                transition-all duration-300 hover:bg-white/10 h-full"
              >
                <CardContent className="flex flex-col h-full p-5 lg:p-6">
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="p-3 rounded-xl bg-teal-500/10 group-hover:bg-teal-500/20 
                        transition-colors duration-300"
                      >
                        {step.icon}
                      </div>
                    </motion.div>

                    <h3 className="text-lg text-white group-hover:text-teal-400 
                      transition-colors duration-300 text-center font-semibold"
                    >
                      {step.title}
                    </h3>
                  </div>

                  <div className="mt-4 flex-1 flex items-center">
                    <p className="text-sm text-white leading-relaxed text-center">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


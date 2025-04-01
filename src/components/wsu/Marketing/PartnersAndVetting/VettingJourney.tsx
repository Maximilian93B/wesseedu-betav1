"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, ArrowRight, Building, FileText, Users, TrendingUp } from "lucide-react"

export function VettingJourney() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };
  
  // Journey steps
  const journeySteps = [
    {
      title: "Company Application",
      description: "Sustainable companies apply for listing on our platform.",
      icon: <Building className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Document Submission",
      description: "ESG reports, financial statements, and business plans are submitted.",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "Big Four Vetting",
      description: "One of the Big Four accounting firms conducts rigorous vetting.",
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      title: "Platform Approval",
      description: "Approved companies are listed for investment on our platform.",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-green-50 text-green-600 border-green-100"
    }
  ];

  return (
    <div className="py-12 bg-white/95 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-green-800 mb-3">The Vetting Journey</h3>
          <p className="text-green-700/80 max-w-2xl mx-auto">
            Follow a company's journey from application to approval through our rigorous vetting process, 
            ensuring only the most sustainable and promising opportunities reach our investors.
          </p>
        </div>
        
        {/* Journey visualization */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative"
        >
          {/* Path connection - the journey line */}
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-green-100 hidden md:block"></div>
          
          {/* Steps */}
          <div className="space-y-10 relative">
            {journeySteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex flex-col md:flex-row items-start gap-6 relative"
              >
                {/* Step icon */}
                <div className={`w-16 h-16 rounded-full ${step.color} flex-shrink-0 flex items-center justify-center shadow-md border relative z-10`}>
                  {step.icon}
                  {/* Connector to next step */}
                  {index < journeySteps.length - 1 && (
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 h-8 w-1 bg-green-100 hidden md:block"></div>
                  )}
                </div>
                
                {/* Step content */}
                <div className="md:pt-2">
                  <h4 className="text-lg font-medium text-green-800 mb-2 flex items-center">
                    {step.title}
                    {index === journeySteps.length - 1 && (
                      <span className="ml-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                      </span>
                    )}
                  </h4>
                  <p className="text-green-700/70">
                    {step.description}
                  </p>
                  
                  {/* Company progress visualization for the third step - Big Four vetting */}
                  {index === 2 && (
                    <div className="mt-4 bg-white/80 rounded-lg border border-purple-100 p-4 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Financial', 'Operational', 'ESG Impact', 'Governance'].map((area, idx) => (
                        <div key={idx} className="text-center">
                          <div className="mx-auto w-full h-2 bg-purple-100 rounded-full mb-2 overflow-hidden">
                            <motion.div 
                              className="h-full bg-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${75 + idx * 5}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + idx * 0.2, duration: 1 }}
                            />
                          </div>
                          <p className="text-xs text-purple-700 font-medium">{area}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Final result visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center bg-green-50 px-4 py-2 rounded-full text-green-700 font-medium border border-green-100 shadow-sm">
            <CheckCircle className="h-5 w-5 mr-2" />
            Ready for Sustainable Investment
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
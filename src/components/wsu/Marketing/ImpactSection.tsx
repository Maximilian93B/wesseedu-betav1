"use client"

import { AnimatedTagline } from "@/components/ui/AnimatedTagline"
import { motion } from "framer-motion"

export function ImpactSection() {
  // Impact phrases organized by category
  const impactCategories = [
    {
      header: "Environmental Impact",
      phrases: [
        "Accelerating solutions for climate challenges",
        "Creating positive environmental change",
        "Reducing carbon footprints across industries"
      ]
    },
    {
      header: "Social Innovation",
      phrases: [
        "Building a more equitable future",
        "Empowering sustainable startups",
        "Supporting underrepresented founders"
      ]
    },
    {
      header: "Investment Revolution",
      phrases: [
        "Connecting visionary founders with impact investors",
        "Transforming how we invest in our planet",
        "Measuring real-world impact alongside financial returns"
      ]
    }
  ]

  return (
    <section className="py-32 sm:py-40 md:py-48 relative overflow-hidden">
      {/* Subtle gradient overlay to enhance text readability over the cosmic background */}
      <div className="absolute inset-0 bg-gradient-radial from-black/30 to-transparent z-0"></div>
      
      {/* Main content container with increased horizontal padding */}
      <div className="container mx-auto px-8 sm:px-12 md:px-16">
        {/* Main header with more vertical space */}
        <motion.div 
          className="mb-40 sm:mb-48 md:mb-56 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatedTagline 
            text="Creating Limitless Impact"
            highlightWords={["Limitless", "Impact"]}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            delay={0.2}
          />
        </motion.div>
        
        {/* Dynamic multi-section layout with increased spacing */}
        <div className="space-y-48 sm:space-y-56 md:space-y-64">
          {/* First category - Left aligned with more breathing room */}
          <div className="relative">
            {/* Decorative elements positioned further away */}
            <motion.div 
              className="absolute -left-32 top-1/3 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start">
              {/* Category header with more space */}
              <motion.div 
                className="md:col-span-5 md:sticky md:top-32 pr-0 md:pr-8 lg:pr-12"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatedTagline 
                  text={impactCategories[0].header}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-left"
                  delay={0.3}
                />
              </motion.div>
              
              {/* Category phrases with increased spacing */}
              <div className="md:col-span-7">
                <motion.div
                  className="flex flex-col items-start space-y-14 sm:space-y-16 md:space-y-20"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.25, delayChildren: 0.5 }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-150px" }}
                >
                  {impactCategories[0].phrases.map((phrase, index) => (
                    <motion.div
                      key={index}
                      className="relative text-left pl-4 border-l-2 border-purple-500/20"
                      variants={{
                        hidden: { opacity: 0, x: 30, filter: "blur(8px)" },
                        visible: {
                          opacity: 1, 
                          x: 0, 
                          filter: "blur(0px)",
                          transition: {
                            type: "spring",
                            damping: 20,
                            stiffness: 100,
                            duration: 1.2
                          }
                        }
                      }}
                    >
                      <span className="text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                        {phrase}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Second category - Right aligned with more breathing room */}
          <div className="relative">
            {/* Decorative elements positioned further away */}
            <motion.div 
              className="absolute -right-32 top-1/3 w-56 h-56 bg-teal-500/5 rounded-full blur-3xl z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start">
              {/* Category phrases with increased spacing */}
              <div className="md:col-span-7 md:order-1 md:order-first">
                <motion.div
                  className="flex flex-col items-start space-y-14 sm:space-y-16 md:space-y-20"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.25, delayChildren: 0.5 }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-150px" }}
                >
                  {impactCategories[1].phrases.map((phrase, index) => (
                    <motion.div
                      key={index}
                      className="relative text-left pl-4 border-l-2 border-teal-500/20"
                      variants={{
                        hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
                        visible: {
                          opacity: 1, 
                          x: 0, 
                          filter: "blur(0px)",
                          transition: {
                            type: "spring",
                            damping: 18,
                            stiffness: 150
                          }
                        }
                      }}
                    >
                      <span className="text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                        {phrase}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Category header with more space */}
              <motion.div 
                className="md:col-span-5 md:sticky md:top-32 md:order-2 md:order-last pl-0 md:pl-8 lg:pl-12"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8 }}
              >
                <AnimatedTagline 
                  text={impactCategories[1].header}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-right md:text-right"
                  delay={0.3}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Third category - Center aligned with more breathing room */}
          <div className="relative">
            {/* Decorative elements with larger size */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 top-1/3 w-80 h-80 bg-gradient-radial from-purple-500/5 to-teal-500/5 rounded-full blur-3xl z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            
            <div className="flex flex-col items-center">
              {/* Category header with more space */}
              <motion.div 
                className="mb-20 sm:mb-24 text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8 }}
              >
                <AnimatedTagline 
                  text={impactCategories[2].header}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold"
                  delay={0.3}
                />
              </motion.div>
              
              {/* Category phrases with increased spacing */}
              <motion.div
                className="flex flex-col items-center space-y-14 sm:space-y-16 md:space-y-20 max-w-3xl"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.25, delayChildren: 0.5 }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
              >
                {impactCategories[2].phrases.map((phrase, index) => (
                  <motion.div
                    key={index}
                    className="relative text-center px-8 py-4 border-t border-b border-purple-500/10"
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                      visible: {
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)",
                        transition: {
                          type: "spring",
                          damping: 18,
                          stiffness: 150
                        }
                      }
                    }}
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-purple-400 via-white to-teal-400 bg-clip-text text-transparent">
                      {phrase}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Final statement with more space */}
        <motion.div 
          className="mt-48 sm:mt-56 md:mt-64 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="inline-block px-4 py-6">
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent mb-4">
              The future of impact investing is here.
            </p>
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
"use client"

import { AnimatedTagline } from "@/components/ui/AnimatedTagline"
import { motion } from "framer-motion"

export function ImpactSection() {
  // Impact phrases organized by category
  const impactCategories = [
    {
      header: "Environmental Impact",
      highlightWord: "Environmental",
      phrases: [
        "Accelerating solutions for climate challenges",
        "Creating positive environmental change",
        "Reducing carbon footprints across industries"
      ]
    },
    {
      header: "Social Innovation",
      highlightWord: "Social",
      phrases: [
        "Building a more equitable future",
        "Empowering sustainable startups",
        "Supporting underrepresented founders"
      ]
    },
    {
      header: "Investment Revolution",
      highlightWord: "Investment",
      phrases: [
        "Connecting visionary founders with impact investors",
        "Transforming how we invest in our planet",
        "Measuring real-world impact alongside financial returns"
      ]
    }
  ]

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          will-change: opacity;
        }
        
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        .animate-float-subtle {
          animation: float-subtle 4s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      <section className="py-32 sm:py-40 md:py-48 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0 pointer-events-none"></div>
        
        {/* Main content container with clean layout */}
        <div className="container mx-auto px-8 sm:px-12 md:px-16">
          {/* Main header with elegant glow effect */}
          <motion.div 
            className="mb-40 sm:mb-48 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle glow effect with reduced opacity */}
            <div 
              className="absolute -inset-10 opacity-20 animate-pulse-subtle"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                filter: 'blur(15px)',
                zIndex: -1
              }}
            ></div>
            
            <AnimatedTagline 
              text="Creating Limitless Impact"
              highlightWords={["Limitless", "Impact"]}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              delay={0.2}
            />
          </motion.div>
          
          {/* Dynamic multi-section layout with increased spacing */}
          <div className="space-y-40 sm:space-y-48">
            {/* First category - Left aligned */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                {/* Category header */}
                <motion.div 
                  className="md:col-span-5 md:sticky md:top-32 pr-0 md:pr-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], mass: 0.8 }}
                >
                  <div className="relative">
                    {/* Very subtle light effect */}
                    <div 
                      className="absolute -inset-8 opacity-20 animate-pulse-subtle"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                        filter: 'blur(15px)',
                        zIndex: -1
                      }}
                    ></div>
                    
                    <AnimatedTagline 
                      text={impactCategories[0].header}
                      highlightWords={[impactCategories[0].highlightWord]}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-left"
                      delay={0.3}
                    />
                  </div>
                </motion.div>
                
                {/* Category phrases */}
                <div className="md:col-span-7">
                  <motion.div
                    className="flex flex-col items-start space-y-12 sm:space-y-14"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                      }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {impactCategories[0].phrases.map((phrase, index) => (
                      <motion.div
                        key={index}
                        className="relative text-left pl-4 border-l border-white/30 group hover:border-white/50 transition-colors duration-300"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: {
                            opacity: 1, 
                            x: 0,
                            transition: {
                              type: "spring",
                              damping: 22,
                              stiffness: 150,
                              mass: 0.8
                            }
                          }
                        }}
                      >
                        <span className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                          {phrase}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Second category - Right aligned */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                {/* Category phrases */}
                <div className="md:col-span-7 md:order-1 md:order-first">
                  <motion.div
                    className="flex flex-col items-start space-y-12 sm:space-y-14"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                      }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {impactCategories[1].phrases.map((phrase, index) => (
                      <motion.div
                        key={index}
                        className="relative text-left pl-4 border-l border-white/30 group hover:border-white/50 transition-colors duration-300"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: {
                            opacity: 1, 
                            x: 0,
                            transition: {
                              type: "spring",
                              damping: 22,
                              stiffness: 150,
                              mass: 0.8
                            }
                          }
                        }}
                      >
                        <span className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                          {phrase}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                
                {/* Category header */}
                <motion.div 
                  className="md:col-span-5 md:sticky md:top-32 md:order-2 md:order-last pl-0 md:pl-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], mass: 0.8 }}
                >
                  <div className="relative">
                    {/* Very subtle light effect */}
                    <div 
                      className="absolute -inset-8 opacity-20 animate-pulse-subtle"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                        filter: 'blur(15px)',
                        zIndex: -1
                      }}
                    ></div>
                    
                    <AnimatedTagline 
                      text={impactCategories[1].header}
                      highlightWords={[impactCategories[1].highlightWord]}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-right md:text-right"
                      delay={0.3}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Third category - Center aligned */}
            <div className="relative">
              <div className="flex flex-col items-center">
                {/* Category header with subtle glow */}
                <motion.div 
                  className="mb-16 sm:mb-20 text-center relative"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], mass: 0.8 }}
                >
                  {/* Very subtle light effect */}
                  <div 
                    className="absolute -inset-8 opacity-20 animate-pulse-subtle"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                      filter: 'blur(15px)',
                      zIndex: -1
                    }}
                  ></div>
                  
                  <AnimatedTagline 
                    text={impactCategories[2].header}
                    highlightWords={[impactCategories[2].highlightWord]}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold"
                    delay={0.3}
                  />
                </motion.div>
                
                {/* Category phrases with elegant hover effects */}
                <motion.div
                  className="flex flex-col items-center space-y-12 sm:space-y-14 max-w-3xl"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {impactCategories[2].phrases.map((phrase, index) => (
                    <motion.div
                      key={index}
                      className="relative text-center px-6 py-3 group"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1, 
                          y: 0,
                          transition: {
                            type: "spring",
                            damping: 22,
                            stiffness: 150,
                            mass: 0.8
                          }
                        }
                      }}
                    >
                      {/* Subtle highlight on hover */}
                      <div 
                        className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-md -z-10"
                      ></div>
                      
                      <span className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                        {phrase}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Final statement with elegant floating animation */}
          <motion.div 
            className="mt-40 sm:mt-48 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="inline-block px-8 py-8 relative">
              {/* Subtle glow effect */}
              <div 
                className="absolute -inset-10 opacity-20 animate-pulse-subtle"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                  zIndex: -1
                }}
              ></div>
              
              <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-white animate-float-subtle">
                The future of impact investing is here.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
} 
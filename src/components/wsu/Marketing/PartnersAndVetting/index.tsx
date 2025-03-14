"use client"

import Link from "next/link"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VETTING_STEPS } from "./data"
import { VettingCard } from "./VettingCard"
import { PartnersShowcase } from "./PartnersShowcase"
import "./animations.css"

export function PartnersAndVetting() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Add subtle parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, 1, 1, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.5, 1, 0.8]);
  
  // Set up animated variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        delay: custom * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };
  
  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden py-20 xs:py-24 sm:py-28 md:py-32 lg:py-36 min-h-[calc(100vh-4rem)]"
    >
      {/* Decorative cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cosmic gradient orbs - positioned absolutely but will appear to move with parallax */}
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="absolute -top-[30%] -right-[20%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
        ></motion.div>
        <motion.div 
          style={{ y: y2, opacity: opacity2, animationDelay: '2s' }}
          className="absolute -bottom-[20%] -left-[30%] w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl animate-pulse-slow"
        ></motion.div>
        
        {/* Cosmic grid pattern */}
        <div className="absolute inset-0 opacity-10 animate-subtle-rotate" 
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(139,92,246,0.15) 1px, transparent 1px), radial-gradient(circle at center, rgba(45,212,191,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 120px 120px',
            backgroundPosition: 'center'
          }}>
        </div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 xl:px-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={0}
          className="mb-16 xs:mb-20 sm:mb-24 md:mb-28 text-center"
        >
          <div className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-1.5 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
            Global Partnerships
          </div>
          
          <h2 className="mb-4 xs:mb-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Our Partners & <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">Vetting Process</span>
              <span className="absolute inset-x-0 bottom-0 h-[0.15em] bg-gradient-to-r from-purple-500/30 to-teal-500/30 rounded-full blur-[2px]"></span>
            </span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-sm xs:text-base sm:text-lg text-gray-300">
            We collaborate with leading organizations and employ a rigorous vetting process to ensure only the most promising sustainable startups make it to our platform.
          </p>
        </motion.div>

        {/* Partners section */}
        <div className="mb-24 xs:mb-28 sm:mb-32 md:mb-36 lg:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-0 gap-y-12 sm:gap-y-16 md:gap-y-20">
            {/* Partners Header - Left column */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={1}
              className="flex flex-col items-start max-w-lg lg:col-span-4"
            >
              <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 xs:mb-8 text-xs text-purple-400 font-medium border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                <span>Our Global Partners</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </div>

              <h2 
                id="partners-heading" 
                className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 xs:mb-6 sm:mb-8 tracking-tight leading-tight"
              >
                Trusted by <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">Global Leaders</span>
                  <span className="absolute inset-x-0 bottom-0 h-[0.15em] bg-gradient-to-r from-purple-500/30 to-teal-500/30 rounded-full blur-[2px]"></span>
                </span> in Sustainability
              </h2>

              <p className="text-white/70 text-sm xs:text-base sm:text-lg leading-relaxed">
                From international organizations to sustainable investment funds, we collaborate with partners who share
                our vision of a more sustainable future.
              </p>
              
              {/* Partner cards on mobile */}
              <div className="lg:hidden w-full mt-10 xs:mt-12 sm:mt-16">
                <PartnersShowcase isMobile={true} />
              </div>
            </motion.div>

            {/* Partners Cards - Right column - Desktop only */}
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={2}
              className="pt-6 hidden lg:block lg:col-span-8 lg:-mr-10 xl:-mr-12 overflow-visible"
            >
              <PartnersShowcase isMobile={false} />
            </motion.div>
          </div>
        </div>

        {/* Vetting Process section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-24 gap-y-12 sm:gap-y-16 md:gap-y-20">
            {/* Vetting Cards - Left column */}
            <div className="pt-6 order-2 lg:order-1">
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                custom={3}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8"
              >
                {VETTING_STEPS.slice(0, 2).map((step, index) => (
                  <div key={index} className="h-full">
                    <VettingCard step={step} index={index} />
                  </div>
                ))}
              </motion.div>
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                custom={4}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 mt-4 xs:mt-6 sm:mt-8"
              >
                {VETTING_STEPS.slice(2, 4).map((step, index) => (
                  <div key={index + 2} className="h-full">
                    <VettingCard step={step} index={index + 2} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Vetting Process Header - Right column */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={2}
              className="order-1 lg:order-2"
            >
              <div className="flex flex-col items-start lg:items-end text-left lg:text-right max-w-lg ml-auto">
                <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 xs:mb-8 text-xs text-purple-400 font-medium border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                  <span>Our Vetting Process</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>

                <h2 
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 xs:mb-6 sm:mb-8 tracking-tight leading-tight"
                >
                  Rigorous Vetting by{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">
                      Industry Experts
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-[0.15em] bg-gradient-to-r from-purple-500/30 to-teal-500/30 rounded-full blur-[2px]"></span>
                  </span>
                </h2>

                <p className="text-white/70 text-sm xs:text-base sm:text-lg leading-relaxed">
                  Every investment opportunity on WeSeedU undergoes comprehensive verification by leading accounting firms.
                  We ensure transparency and potential in every listing through our thorough evaluation process.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA section with enhanced button styling */}
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={5}
        className="flex justify-center mt-16 xs:mt-20 sm:mt-24"
      >
        <Button
          className="relative overflow-hidden text-white border border-purple-500/30 
            bg-black hover:bg-purple-900/20 
            transition-all duration-500 py-4 xs:py-6 px-6 xs:px-8 h-auto text-sm xs:text-base group
            shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          asChild
        >
          <Link href="/partners">
            {/* Button hover effect - subtle gradient slide */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 group-hover:animate-gradient-x transition-opacity duration-300"></span>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center">
              Learn more about our partners
              <ArrowRight className="ml-2 xs:ml-3 h-3 xs:h-4 w-3 xs:w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </Button>
      </motion.div>
      
      {/* Add decorative elements at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] opacity-20 bg-gradient-to-t from-purple-500/10 to-transparent rounded-t-full blur-3xl"></div>
    </div>
  )
} 
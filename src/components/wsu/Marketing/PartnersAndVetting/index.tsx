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
  
  // Subtle parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 0.8]);
  
  // Set up animated variants with simplified transitions
  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: custom * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 min-h-[80vh]"
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          style={{ y: y2, opacity: opacity2 }}
          className="absolute -bottom-[10%] -left-[20%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl"
        ></motion.div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Simplified */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={0}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <div className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Global Partnerships
          </div>
          
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Our Partners & <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">Vetting Process</span>
            </span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-base text-gray-300">
            We collaborate with leading organizations and employ a rigorous vetting process to ensure only the most promising sustainable startups make it to our platform.
          </p>
        </motion.div>

        {/* Partners section - Simplified layout */}
        <div className="mb-20 sm:mb-24 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
            {/* Partners Header - Left column */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={1}
              className="flex flex-col items-start max-w-lg lg:col-span-5"
            >
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-1.5 mb-4 text-xs text-purple-400 font-medium border border-purple-500/20">
                <span>Our Global Partners</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </div>

              <h2 
                id="partners-heading" 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
              >
                Trusted by <span className="bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">Global Leaders</span> in Sustainability
              </h2>

              <p className="text-white/70 text-base leading-relaxed">
                From international organizations to sustainable investment funds, we collaborate with partners who share
                our vision of a more sustainable future.
              </p>
              
              {/* Partner cards on mobile */}
              <div className="lg:hidden w-full mt-8">
                <PartnersShowcase isMobile={true} />
              </div>
            </motion.div>

            {/* Partners Cards - Right column - Desktop only */}
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={2}
              className="pt-4 hidden lg:flex lg:items-center lg:col-span-7"
            >
              <PartnersShowcase isMobile={false} />
            </motion.div>
          </div>
        </div>

        {/* Vetting Process section - Simplified layout */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
            {/* Vetting Cards - Left column */}
            <div className="pt-4 order-2 lg:order-1">
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                custom={3}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {VETTING_STEPS.map((step, index) => (
                  <div key={index} className="h-full">
                    <VettingCard step={step} index={index} />
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
                <div className="inline-flex items-center space-x-2 rounded-full px-4 py-1.5 mb-4 text-xs text-purple-400 font-medium border border-purple-500/20">
                  <span>Our Vetting Process</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>

                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                  Rigorous Vetting by{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">
                    Industry Experts
                  </span>
                </h2>

                <p className="text-white/70 text-base leading-relaxed">
                  Every investment opportunity on WeSeedU undergoes comprehensive verification by leading accounting firms.
                  We ensure transparency and potential in every listing through our thorough evaluation process.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA section with simplified button styling */}
      <motion.div 
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={5}
        className="flex justify-center mt-12 sm:mt-16"
      >
        <Button
          className="relative overflow-hidden text-white border border-purple-500/20 
            bg-black hover:bg-purple-900/10 
            transition-all duration-300 py-3 px-6 h-auto text-sm group"
          asChild
        >
          <Link href="/partners">
            <span className="relative z-10 flex items-center">
              Learn more about our partners
              <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </Button>
      </motion.div>
    </div>
  )
} 
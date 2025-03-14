"use client"

import { ArrowRight, Shield, CheckCircle, BarChart2, FileCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

// Define animation variants in one place to avoid duplication
const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: custom * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  }
}

// Define static data outside the component
const PARTNERS = [
  {
    name: "United Nations",
    logo: "/images/Flag_of_the_United_Nations.svg",
    description: "Working together for global sustainability goals",
    link: "/partners/united-nations"
  },
  {
    name: "Global Sustainability Fund",
    logo: "/images/logo-gsf.svg",
    description: "Pioneering sustainable investment strategies",
    link: "/partners/gsf"
  },
  {
    name: "World Bank",
    logo: "/images/logo-world-bank.svg",
    description: "Supporting economic development worldwide",
    link: "/partners/world-bank"
  }
];

const VETTING_STEPS = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Initial Screening",
    description: "Companies are evaluated against our sustainability criteria and UN SDGs alignment."
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Financial Analysis",
    description: "Our team conducts thorough financial assessment and growth potential evaluation."
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Due Diligence",
    description: "Comprehensive verification of business model, team, and sustainability claims."
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Final Approval",
    description: "Selected companies are approved by our investment committee for platform listing."
  }
];

// Simplified card component with subtle effects
function Card({ 
  children, 
  className,
  hoverEffect = true
}: { 
  children: React.ReactNode; 
  className?: string;
  hoverEffect?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.9, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "-5% 0%" }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-black/70 backdrop-blur-sm p-8 transition-all duration-300",
        hoverEffect ? "hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]" : "",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/50 z-0"></div>
    </motion.div>
  );
}

// Partner card component
function PartnerCard({ partner }: { partner: typeof PARTNERS[0] }) {
  return (
    <Card className="flex flex-col items-center text-center h-full">
      {/* Logo */}
      <div className="mb-8 w-24 h-24 sm:w-28 sm:h-28 relative">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 96px, 112px"
        />
      </div>
      
      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
        {partner.name}
      </h3>
      <p className="text-base text-gray-300 mb-6 leading-relaxed">
        {partner.description}
      </p>
      
      {/* Link */}
      {partner.link && (
        <Link
          href={partner.link}
          className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 mt-auto group"
        >
          Learn more 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      )}
    </Card>
  );
}

// Vetting step card component
function VettingCard({ step, index }: { step: typeof VETTING_STEPS[0]; index: number }) {
  return (
    <Card>
      <div className="flex flex-col h-full">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-purple-500/5 text-purple-400">
          {step.icon}
        </div>
        
        <div>
          <h3 className="mb-4 text-lg sm:text-xl font-bold text-white">
            {index + 1}. {step.title}
          </h3>
          <p className="text-base text-gray-300 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </Card>
  );
}

// Partners section component with grid layout
function PartnersGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PARTNERS.map((partner) => (
        <div key={partner.name}>
          <PartnerCard partner={partner} />
        </div>
      ))}
    </div>
  );
}

// Simple keyframes for background effects
const GlobalStyleKeyframes = () => (
  <style jsx global>{`
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.05; }
      50% { opacity: 0.1; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `}</style>
);

export function PartnersAndVetting() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Add subtle parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, 1, 1, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.5, 1, 0.8]);
  
  return (
    <>
      <GlobalStyleKeyframes />
      
      {/* Subtle background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="absolute -top-[30%] -right-[20%] w-[400px] h-[400px] bg-purple-900/3 rounded-full blur-3xl animate-pulse-slow"
        ></motion.div>
        <motion.div 
          style={{ y: y2, opacity: opacity2 }}
          className="absolute -bottom-[20%] -left-[30%] w-[500px] h-[500px] bg-purple-800/3 rounded-full blur-3xl animate-pulse-slow"
        ></motion.div>
      </div>
      
      {/* Main section */}
      <div 
        ref={sectionRef}
        className="relative overflow-hidden py-32 lg:py-40 min-h-[90vh]"
      >
        <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={ANIMATION_VARIANTS.fadeInUp}
            custom={0}
            className="mb-28 text-center"
          >
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-full bg-purple-500/5 text-purple-400 border border-purple-500/10">
                Global Partnerships
              </span>
            </div>
            
            <h2 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Our Partners & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Vetting Process</span>
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-gray-300 leading-relaxed">
              We collaborate with leading organizations and employ a rigorous vetting process to ensure only the most promising sustainable startups make it to our platform.
            </p>
          </motion.div>

          {/* Partners section */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Partners Header - Left column */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={ANIMATION_VARIANTS.fadeInUp}
                custom={1}
                className="flex flex-col items-start justify-center lg:col-span-4"
              >
                <h2 
                  id="partners-heading" 
                  className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight leading-tight"
                >
                  Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Global Leaders</span>
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed mb-10">
                  From international organizations to sustainable investment funds, we collaborate with partners who share
                  our vision of a more sustainable future.
                </p>
              </motion.div>

              {/* Partners Cards - Right column */}
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={ANIMATION_VARIANTS.fadeInUp}
                custom={2}
                className="lg:col-span-8"
              >
                <PartnersGrid />
              </motion.div>
            </div>
          </div>

          {/* Vetting Process section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
              {/* Vetting Cards - Left column */}
              <div className="order-2 lg:order-1">
                <motion.div 
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={ANIMATION_VARIANTS.fadeInUp}
                  custom={3}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8"
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
                  variants={ANIMATION_VARIANTS.fadeInUp}
                  custom={4}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8"
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
                variants={ANIMATION_VARIANTS.fadeInUp}
                custom={2}
                className="order-1 lg:order-2"
              >
                <div className="flex flex-col items-start lg:items-end text-left lg:text-right max-w-lg ml-auto pt-6">
                  <h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight leading-tight"
                  >
                    Rigorous Vetting by{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      Industry Experts
                    </span>
                  </h2>

                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Every investment opportunity on WeSeedU undergoes comprehensive verification by leading accounting firms.
                    We ensure transparency and potential in every listing through our thorough evaluation process.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={ANIMATION_VARIANTS.fadeInUp}
          custom={5}
          className="flex justify-center mt-24"
        >
          <Button
            className="text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
              transition-all duration-300 py-5 px-10 h-auto text-base font-semibold rounded-md"
            asChild
          >
            <Link href="/partners">
              <span className="flex items-center">
                Learn more about our partners
                <ArrowRight className="ml-3 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  )
} 
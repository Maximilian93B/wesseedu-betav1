"use client"

import { ArrowRight, Shield, CheckCircle, BarChart2, FileCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function PartnersAndVetting() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Enhanced parallax effect for limitless space feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // More dramatic parallax values for depth perception
  const offsetY1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const offsetY2 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const offsetY3 = useTransform(scrollYProgress, [0, 1], [0, -60])
  
  // Horizontal parallax for added dimension
  const offsetX1 = useTransform(scrollYProgress, [0, 1], [0, -15])
  const offsetX2 = useTransform(scrollYProgress, [0, 1], [0, 15])

  // Scale and opacity effects for depth
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  // Only keeping the first three partners
  const partners = [
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
      logo: "/placeholder.svg?height=40&width=120",
      description: "Supporting sustainable development worldwide",
    }
  ]

  // Vetting process steps from the VettingProcess component
  const vettingSteps = [
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
    <section 
      ref={containerRef} 
      className="relative bg-black py-36 md:py-48 overflow-hidden perspective-1000"
      aria-labelledby="partners-heading"
    >
      {/* Cosmic background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80"></div>
      
      {/* Star field effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
      </div>
      
      {/* Floating orbs/planets */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-teal-500/10 to-blue-500/5 blur-3xl -z-10"
        style={{ 
          y: offsetY1, 
          x: offsetX1,
          scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tl from-blue-500/10 to-purple-500/5 blur-3xl -z-10"
        style={{ 
          y: offsetY3, 
          x: offsetX2,
          scale: useTransform(scrollYProgress, [0, 1], [1.2, 0.9])
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute top-2/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-teal-500/5 to-emerald-500/5 blur-2xl -z-10"
        style={{ 
          y: offsetY2,
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.3])
        }}
      ></motion.div>

      <div className="relative max-w-7xl mx-auto px-8 sm:px-10 lg:px-16">
        {/* Partners section with cosmic depth */}
        <div className="mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-20">
            {/* Partners Header - Left column */}
            <ScrollReveal
              animation="fade-up"
              duration={0.9}
            >
              <motion.div 
                className="flex flex-col items-start max-w-lg"
                style={{ scale: scale1, opacity: opacity1 }}
              >
                <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 text-xs text-teal-400 font-medium border border-white/10">
                  <span>Our Global Partners</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>

                <h2 
                  id="partners-heading" 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight"
                >
                  Trusted by <span className="bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text">Global Leaders</span> in Sustainability
                </h2>

                <p className="text-white/70 text-lg leading-relaxed">
                  From international organizations to sustainable investment funds, we collaborate with partners who share
                  our vision of a more sustainable future.
                </p>
              </motion.div>
            </ScrollReveal>

            {/* Partners Cards - Right column with floating effect */}
            <div className="pt-6">
              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-3 gap-8">
                {partners.map((partner, index) => (
                  <ScrollReveal
                    key={partner.name}
                    className="h-full"
                    animation="fade-up"
                    delay={index * 0.15}
                    duration={0.9}
                  >
                    <motion.div 
                      style={{ 
                        y: index % 3 === 0 ? offsetY1 : index % 3 === 1 ? offsetY2 : offsetY3,
                        x: index % 2 === 0 ? offsetX1 : offsetX2,
                      }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <PartnerCard 
                        partner={partner} 
                        index={index} 
                        isActive={activeIndex === index}
                        onHover={setActiveIndex}
                      />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Mobile layout - Scrollable cards */}
              <div className="md:hidden">
                <MobilePartnersScroll 
                  partners={partners} 
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Vetting Process section with cosmic depth */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-20">
            {/* Vetting Cards - Left column with floating effect */}
            <div className="pt-6 order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {vettingSteps.slice(0, 2).map((step, index) => (
                  <ScrollReveal
                    key={index}
                    animation="fade-up"
                    delay={index * 0.15}
                    duration={0.9}
                  >
                    <motion.div 
                      style={{ 
                        y: index % 2 === 0 ? offsetY2 : offsetY1,
                        x: index % 2 === 0 ? offsetX1 : offsetX2,
                      }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <VettingCard step={step} index={index} />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                {vettingSteps.slice(2, 4).map((step, index) => (
                  <ScrollReveal
                    key={index + 2}
                    animation="fade-up"
                    delay={(index + 2) * 0.15}
                    duration={0.9}
                  >
                    <motion.div 
                      style={{ 
                        y: index % 2 === 0 ? offsetY3 : offsetY2,
                        x: index % 2 === 0 ? offsetX2 : offsetX1,
                      }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <VettingCard step={step} index={index + 2} />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Vetting Process Header - Right column */}
            <ScrollReveal
              animation="fade-up"
              duration={0.9}
              className="order-1 lg:order-2"
            >
              <motion.div 
                className="flex flex-col items-end text-right max-w-lg ml-auto"
                style={{ scale: scale1, opacity: opacity1 }}
              >
                <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 text-xs text-teal-400 font-medium border border-white/10">
                  <span>Our Vetting Process</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>

                <h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight"
                >
                  Rigorous Vetting by{" "}
                  <span className="bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text">
                    Industry Experts
                  </span>
                </h2>

                <p className="text-white/70 text-lg leading-relaxed">
                  Every investment opportunity on WeSeedU undergoes comprehensive verification by leading accounting firms.
                  We ensure transparency and potential in every listing through our thorough evaluation process.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
        {/* CTA section - Centered with glow effect */}
        <div className="flex justify-center mt-24">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Button
                variant="outline"
                className="text-white border-white/10 hover:border-teal-500/50 
                  bg-white/5 hover:bg-white/10 backdrop-blur-sm
                  transition-all duration-300 py-6 px-8 h-auto text-base group
                  shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_25px_rgba(20,184,166,0.2)]"
                asChild
              >
                <Link href="/partners">
                  Learn more about our partners
                  <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
    </section>
  )
}

// Extracted VettingCard component for cleaner code
interface VettingStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function VettingCard({ step, index }: { step: VettingStepProps; index: number }) {
  return (
    <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-md 
      border border-white/10 hover:border-teal-500/30 
      transition-all duration-300 hover:bg-black/50 h-full
      shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]"
    >
      <CardContent className="flex flex-col h-full p-6 lg:p-8">
        <div className="flex flex-col items-center mb-5">
          <motion.div
            className="mb-5"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/20 to-blue-500/10 group-hover:from-teal-500/30 group-hover:to-blue-500/20
              transition-colors duration-300 shadow-[0_0_15px_rgba(20,184,166,0.2)]"
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

        <p className="text-sm text-white/80 leading-relaxed text-center">{step.description}</p>
      </CardContent>
    </Card>
  )
}

// Mobile Partners Scroll component
function MobilePartnersScroll({ 
  partners, 
  activeIndex, 
  setActiveIndex 
}: {
  partners: PartnerType[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}) {
  return (
    <div className="flex overflow-x-auto pb-8 -mx-8 px-8 space-x-6 snap-x snap-mandatory scrollbar-hide">
      {partners.map((partner, index) => (
        <ScrollReveal
          key={partner.name}
          className="flex-shrink-0 w-[85%] snap-center"
          animation="fade-up"
          delay={index * 0.15}
          duration={0.9}
        >
          <motion.div 
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <PartnerCard 
              partner={partner} 
              index={index} 
              isActive={activeIndex === index}
              onHover={setActiveIndex}
            />
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
}

interface PartnerType {
  name: string;
  logo: string;
  description: string;
  link?: string;
}

interface PartnerCardProps {
  partner: PartnerType;
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

function PartnerCard({ partner, index, isActive, onHover }: PartnerCardProps) {
  const CardWrapper = partner.link ? Link : 'div';
  
  return (
    <CardWrapper
      href={partner.link || '#'}
      {...(partner.link ? {} : {})}
    >
      <Card
        className={`h-[240px] bg-black/40 backdrop-blur-md border-white/10 
          ${isActive ? "border-teal-500/40 bg-black/50 shadow-[0_0_25px_rgba(20,184,166,0.15)]" : "hover:border-teal-500/20 hover:bg-black/50 hover:shadow-[0_0_25px_rgba(20,184,166,0.1)]"}
          transition-all duration-300 overflow-hidden cursor-pointer
          shadow-[0_0_15px_rgba(0,0,0,0.5)]
        `}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(index)}
        onBlur={() => onHover(null)}
      >
        <CardContent className="p-8 h-full flex flex-col">
          <div className="relative h-12 mb-6 flex items-center">
            <div className="relative h-10 w-36">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} Logo`}
                fill
                className={`object-contain transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 3}
              />
            </div>
          </div>

          <div className="space-y-3 flex-grow">
            <h3 className="text-white font-medium text-lg">{partner.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{partner.description}</p>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  )
} 
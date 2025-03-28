"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function Partners() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Optimized scroll-based parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // More distinct parallax values for better visual effect
  const offsetY1 = useTransform(scrollYProgress, [0, 1], [0, -15])
  const offsetY2 = useTransform(scrollYProgress, [0, 1], [0, -25])
  const offsetY3 = useTransform(scrollYProgress, [0, 1], [0, -35])

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
    },
    {
      name: "Green Climate Fund",
      logo: "/placeholder.svg?height=40&width=120",
      description: "Financing climate action initiatives",
    },
    {
      name: "Sustainable Energy for All",
      logo: "/placeholder.svg?height=40&width=120",
      description: "Accelerating clean energy transition",
    },
    {
      name: "Climate Investment Funds",
      logo: "/placeholder.svg?height=40&width=120",
      description: "Driving transformative climate solutions",
    },
  ]

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black/70 py-32 md:py-40 overflow-hidden"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header section */}
        <ScrollReveal
          className="mb-24 md:mb-32"
          animation="fade-up"
          duration={0.7}
        >
          <div className="flex flex-col items-start max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-1.5 mb-10 text-xs text-teal-400 font-medium">
              <span>Our Global Partners</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </div>

            <h2 
              id="partners-heading" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight"
            >
              Trusted by <span className="text-teal-400">Global Leaders</span> in Sustainability
            </h2>

            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              From international organizations to sustainable investment funds, we collaborate with partners who share
              our vision.
            </p>
          </div>
        </ScrollReveal>

        {/* Partners grid section */}
        <div className="relative">
          {/* Desktop layout - Extracted to a separate component for clarity */}
          <DesktopPartnersGrid 
            partners={partners} 
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            offsetY1={offsetY1}
            offsetY2={offsetY2}
            offsetY3={offsetY3}
          />

          {/* Mobile layout - Scrollable cards */}
          <div className="md:hidden">
            <MobilePartnersScroll 
              partners={partners} 
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-24 md:mt-32 flex justify-start">
          <Button
            variant="outline"
            className="text-white border-white/10 hover:border-white/20 
              bg-white/5 hover:bg-white/10
              transition-all duration-300 py-6 px-8 h-auto text-base group"
            asChild
          >
            <Link href="/partners">
              Learn more about our partners
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

interface PartnersGridProps {
  partners: PartnerType[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  offsetY1: MotionValue<number>;
  offsetY2: MotionValue<number>;
  offsetY3: MotionValue<number>;
}

interface PartnerType {
  name: string;
  logo: string;
  description: string;
  link?: string;
}

function DesktopPartnersGrid({ 
  partners, 
  activeIndex, 
  setActiveIndex,
  offsetY1,
  offsetY2,
  offsetY3
}: PartnersGridProps) {
  return (
    <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
      {partners.map((partner, index) => {
        // Determine which parallax effect to use based on index
        const yOffset = index % 3 === 0 ? offsetY1 : index % 3 === 1 ? offsetY2 : offsetY3;
        
        return (
          <ScrollReveal
            key={partner.name}
            className="h-full"
            animation="fade-up"
            delay={index * 0.1}
            duration={0.7}
          >
            <motion.div style={{ y: yOffset }}>
              <PartnerCard 
                partner={partner} 
                index={index} 
                isActive={activeIndex === index}
                onHover={setActiveIndex}
              />
            </motion.div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

function MobilePartnersScroll({ 
  partners, 
  activeIndex, 
  setActiveIndex 
}: Omit<PartnersGridProps, 'offsetY1' | 'offsetY2' | 'offsetY3'>) {
  return (
    <div className="flex overflow-x-auto pb-8 -mx-6 px-6 space-x-5 snap-x snap-mandatory scrollbar-hide">
      {partners.map((partner, index) => (
        <ScrollReveal
          key={partner.name}
          className="flex-shrink-0 w-[85%] snap-center"
          animation="fade-up"
          delay={index * 0.1}
          duration={0.7}
        >
          <PartnerCard 
            partner={partner} 
            index={index} 
            isActive={activeIndex === index}
            onHover={setActiveIndex}
          />
        </ScrollReveal>
      ))}
    </div>
  );
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
        className={`h-[220px] bg-white/[0.02] border-white/5 
          ${isActive ? "border-teal-500/40 bg-white/[0.04]" : "hover:border-teal-500/20 hover:bg-white/[0.03]"}
          transition-all duration-300 overflow-hidden cursor-pointer
        `}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(index)}
        onBlur={() => onHover(null)}
      >
        <CardContent className="p-8 h-full flex flex-col">
          <div className="relative h-12 mb-6 flex items-center">
            <div className="relative h-8 w-32">
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

          <div className="space-y-2 flex-grow">
            <h3 className="text-white font-medium text-lg">{partner.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{partner.description}</p>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}


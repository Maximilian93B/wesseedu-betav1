"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ParticleSphereBackground from "./ParticleSphereBackground"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen">
      <ParticleSphereBackground />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl space-y-8 py-20 mt-20">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight 
                     inline-flex items-center px-6 py-3 rounded-full 
                     bg-[#0A1A3B]/30 backdrop-blur-sm
                     border border-[#14B8A6]/20 
                     hover:border-[#14B8A6]/40 hover:bg-[#0A1A3B]/40 
                     transform transition-all duration-700 ease-out
                     shadow-lg shadow-[#14B8A6]/10 hover:shadow-[#14B8A6]/20"
          whileHover={{ scale: 1.02 }}
        >
          <span className="bg-gradient-to-r from-[#14B8A6]/80 via-[#14B8A6]/60 to-[#14B8A6]/80 text-transparent bg-clip-text group-hover:animate-gradient bg-[length:200%_auto] inline-block">
            We
          </span>
          <span className="bg-gradient-to-r from-white/80 via-white/60 to-white/80 text-transparent bg-clip-text group-hover:animate-gradient bg-[length:200%_auto] inline-block">
            Seed
          </span>
          <span className="bg-gradient-to-r from-[#14B8A6]/80 via-[#A78BFA]/60 to-[#14B8A6]/80 text-transparent bg-clip-text group-hover:animate-gradient bg-[length:200%_auto] inline-block">
            U
          </span>
        </motion.h2>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Pioneering the Future of{" "}
            <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
              Purposeful Investing
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white leading-relaxed">
            WeSeedU connects investors with exclusive opportunities to support top-tier sustainable companies that
            drive impactful innovation. Each company is carefully vetted and selected by WeSeedU, the Global
            Sustainability Fund (GSF), and the United Nations (UN).
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              className="group relative text-white border-white/20 hover:border-white/40 
                backdrop-blur-sm px-8 py-3 h-auto text-base
                bg-gradient-to-r from-white/10 to-white/5
                hover:from-white/20 hover:to-white/10
                shadow-lg shadow-teal-500/10
                hover:shadow-teal-500/20
                transition-all duration-300 ease-in-out"
              asChild
            >
              <Link href="/about">
                Learn More
                <ArrowRight className="ml-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
             variant="outline" 
             className="group relative text-white border-white/20 hover:border-white/40 
               backdrop-blur-sm px-8 py-3 h-auto text-base
               bg-gradient-to-r from-white/10 to-white/5
               hover:from-white/20 hover:to-white/10
               shadow-lg shadow-teal-500/10
               hover:shadow-teal-500/20
               transition-all duration-300 ease-in-out"
              asChild
            >
              <Link href="/auth/signup">
                Start Investing
                <ArrowRight className="ml-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ParticleSphereBackground from "./ParticleSphereBackground"

export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen">
      <ParticleSphereBackground />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl space-y-8 py-20 mt-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-clip-text group 
            inline-flex items-center px-6 py-3 rounded-full 
            bg-gradient-to-r from-black/40 to-black/20 
            backdrop-blur-sm border border-white/10 
            hover:border-white/20 hover:from-black/50 hover:to-black/30 
            hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20
            transform transition-all duration-500 ease-out">
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-teal-400 text-transparent bg-clip-text group-hover:animate-gradient bg-[length:200%_auto] inline-block">We</span>
            <span className="bg-gradient-to-r from-white via-gray-200 to-white text-transparent bg-clip-text group-hover:animate-gradient bg-[length:200%_auto] inline-block">Seed</span>
            <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text group-hover:animate-gradient bg-[length:200%_auto] inline-block">U</span>
          </h2>

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


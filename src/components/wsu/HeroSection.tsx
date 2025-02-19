import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="relative space-y-12">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-full px-6 py-2.5 backdrop-blur-sm border border-white/10">
          <Zap className="w-5 h-5 text-teal-400" />
          <span className="text-base font-medium text-teal-400">Empowering Sustainable Investments</span>
          <ArrowRight className="w-5 h-5 text-teal-400" />
        </div>

        <div className="space-y-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-white max-w-4xl leading-[1.1] tracking-tight">
            The Platform for{" "}
            <span className="bg-gradient-to-r from-teal-400 to-purple-400 text-transparent bg-clip-text">
              Purposeful Investments
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            WeSeedU connects investors with exclusive opportunities to support top-tier sustainable companies that drive
            impactful innovation. Each company is carefully vetted and selected by WeSeedU, the Global Sustainability Fund
            (GSF), and the United Nations (UN).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button 
            variant="outline" 
            className="group relative text-white border-white/20 hover:border-white/40 hover:bg-white/5 
              backdrop-blur-sm px-6 py-2.5 h-auto text-base transition-all duration-300 ease-in-out"
            asChild
          >
            <Link href="/about">
              Learn More
              <ArrowRight className="ml-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            className="group relative bg-gradient-to-r from-teal-500 to-teal-400 
              hover:from-teal-400 hover:to-teal-500 text-black font-semibold 
              px-6 py-2.5 h-auto text-base shadow-md hover:shadow-teal-500/25 
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
  )
}


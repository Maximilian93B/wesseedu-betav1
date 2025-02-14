import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
     
      
      <div className="relative">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-full px-4 py-1 mb-8 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-teal-400" />
          <span className="text-sm text-teal-400">Empowering Sustainable Investments</span>
          <ArrowRight className="w-4 h-4 text-teal-400" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold text-white max-w-4xl leading-tight tracking-tight">
          The Platform for <span className="bg-gradient-to-r from-teal-400 to-purple-400 text-transparent bg-clip-text">Purposeful Investments</span>
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-3xl leading-relaxed">
          WeSeedU connects investors with exclusive opportunities to support top-tier sustainable companies that drive
          impactful innovation. Each company is carefully vetted and selected by WeSeedU, the Global Sustainability Fund
          (GSF), and the United Nations (UN).
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/5 backdrop-blur-sm">
            <Link href="/about">Learn More</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-black font-semibold">
            <Link href="/auth/signup">Start Investing</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}


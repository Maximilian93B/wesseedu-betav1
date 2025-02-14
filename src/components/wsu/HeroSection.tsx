import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500/10 to-teal-500/0 rounded-full px-4 py-1 mb-6">
        <Zap className="w-4 h-4 text-teal-500" />
        <span className="text-sm text-teal-500">Empowering Sustainable Investments</span>
        <ArrowRight className="w-4 h-4 text-teal-500" />
      </div>

      <h1 className="text-4xl sm:text-6xl font-bold text-white max-w-4xl leading-tight">
        The Platform for <span className="text-teal-500">Purposeful Investments</span>
      </h1>

      <p className="mt-6 text-xl text-gray-400 max-w-3xl">
        WeSeedU connects investors with exclusive opportunities to support top-tier sustainable companies that drive
        impactful innovation. Each company is carefully vetted and selected by WeSeedU, the Global Sustainability Fund
        (GSF), and the United Nations (UN).
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="inline-flex items-center space-x-2 bg-black border border-white/10 rounded-lg px-4 py-2">
          <span className="text-teal-500">$</span>
          <span className="text-gray-400 font-mono">invest in sustainable-future</span>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold">
          Start Investing
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}


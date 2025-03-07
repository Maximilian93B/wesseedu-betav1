"use client"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, CheckCircle, Globe, Shield, TrendingUp } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ScrollSection } from "@/components/ui/scroll-section"

export function ProblemSolutionFlow() {
  // Split challenges into problems and solutions
  const problems = [
    {
      id: "no-marketplace",
      title: "No Dedicated Marketplace",
      description: "Lack of a specialized platform for early-stage sustainable companies",
      icon: Globe,
    },
    {
      id: "limited-platforms",
      title: "Limited Trusted Platforms",
      description: "Few reliable options for pre-public investment opportunities",
      icon: Shield,
    },
    {
      id: "visibility-barriers",
      title: "Visibility Barriers",
      description: "Challenges in showcasing impactful startups to potential investors",
      icon: AlertTriangle,
    },
    {
      id: "verification-difficulty",
      title: "Verification Difficulty",
      description: "Complexities in validating sustainability claims of companies",
      icon: CheckCircle,
    },
  ]

  const solutions = [
    {
      id: "expert-curation",
      title: "Expert Curation",
      description: "Combining professional insights with comprehensive ESG metrics",
      icon: Shield,
    },
    {
      id: "seamless-investment",
      title: "Seamless Investment",
      description: "Streamlined processes making sustainable investing accessible",
      icon: TrendingUp,
    },
  ]

  // Define the coordinates for each box to create paths between them
  const problemCoordinates = [
    { x: 25, y: 25 }, // top-left
    { x: 75, y: 25 }, // top-right
    { x: 25, y: 75 }, // bottom-left
    { x: 75, y: 75 }, // bottom-right
  ]

  const solutionCoordinates = [
    { x: 25, y: 25 }, // top-left
    { x: 75, y: 25 }, // top-right
  ]

  // Create path sequences
  const problemPathSequence = [
    `M ${problemCoordinates[0].x} ${problemCoordinates[0].y} L ${problemCoordinates[1].x} ${problemCoordinates[1].y}`,
    `M ${problemCoordinates[1].x} ${problemCoordinates[1].y} L ${problemCoordinates[3].x} ${problemCoordinates[3].y}`,
    `M ${problemCoordinates[3].x} ${problemCoordinates[3].y} L ${problemCoordinates[2].x} ${problemCoordinates[2].y}`,
    `M ${problemCoordinates[2].x} ${problemCoordinates[2].y} L ${problemCoordinates[0].x} ${problemCoordinates[0].y}`,
  ]

  const solutionPathSequence = [
    `M ${solutionCoordinates[0].x} ${solutionCoordinates[0].y} L ${solutionCoordinates[1].x} ${solutionCoordinates[1].y}`,
  ]

  return (
    <section className="relative w-full py-24 md:py-36 overflow-visible">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-[60px] opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[70px] opacity-40"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal
          className="text-center max-w-[900px] mx-auto mb-12 md:mb-32"
          animation="fade-up"
          duration={0.7}
        >
          <ScrollReveal 
            className="inline-block text-sm md:text-base text-teal-400/90 font-medium tracking-wider uppercase mb-6"
            animation="fade-up"
            delay={0.2}
            duration={0.5}
          >
            Transforming Sustainable Investment
          </ScrollReveal>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Bridging the Gap Between <span className="text-teal-400">Sustainable Startups</span> and <span className="text-teal-400">Impact Investors</span>
          </h2>
          
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            WeSeedU addresses critical challenges in the sustainable investment landscape, creating a seamless connection between innovative startups and purpose-driven investors.
          </p>
        </ScrollReveal>

        {/* Problem Section */}
        <div className="mb-32">
          <ScrollReveal
            className="text-center mb-16"
            animation="fade-up"
            duration={0.6}
          >
            <div className="inline-flex items-center justify-center space-x-2 bg-red-500/10 border border-red-500/20 px-5 py-2 rounded-full mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm font-medium text-red-400">The Challenges</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Current Market Challenges</h3>
          </ScrollReveal>

          {/* Problem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
            {problems.map((problem, index) => (
              <ScrollReveal
                key={problem.id}
                className="relative"
                animation="fade-up"
                delay={index * 0.15}
                duration={0.6}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-500/10 p-3 rounded-lg">
                      <problem.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold text-white">{problem.title}</h4>
                      <p className="text-white/70">{problem.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <ScrollReveal
            className="text-center mb-16"
            animation="fade-up"
            duration={0.6}
          >
            <div className="inline-flex items-center justify-center space-x-2 bg-teal-500/10 border border-teal-500/20 px-5 py-2 rounded-full mb-4">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-sm font-medium text-teal-400">Our Solutions</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">How WeSeedU Solves These Challenges</h3>
          </ScrollReveal>

          {/* Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
            {solutions.map((solution, index) => (
              <ScrollReveal
                key={solution.id}
                className="relative"
                animation="fade-up"
                delay={index * 0.15 + 0.3}
                duration={0.6}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-teal-500/10 rounded-xl p-6 md:p-8 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-500/10 p-3 rounded-lg">
                      <solution.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold text-white">{solution.title}</h4>
                      <p className="text-white/70">{solution.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


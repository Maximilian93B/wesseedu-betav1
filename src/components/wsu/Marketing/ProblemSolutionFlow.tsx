"use client"
import { AlertTriangle, ArrowRight, CheckCircle, Globe, Shield, TrendingUp } from "lucide-react"

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
        <div className="text-center max-w-[900px] mx-auto mb-12 md:mb-32">
          <span className="inline-block text-sm md:text-base text-white/40 font-medium tracking-wider uppercase mb-6">
            Transforming Sustainable Investment
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 leading-[1.2]">
            <span className="text-gradient-primary"> We </span>{' '}
            <span className="text-white"> Bridge the Gap for </span>
            <span className="text-gradient-primary"> Innovative Startups </span>
            <span className="text-white"> Who Want to </span>
            <span className="text-gradient-primary"> Make a Difference</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            WeSeedU fills this gap by offering a vetted marketplace for early investment in sustainable innovations, 
            empowering both investors and sustainable startups.
          </p>
        </div>

        {/* Problem-Solution flow diagram */}
        <div className="max-w-6xl mx-auto relative">
          {/* Card background with glass effect */}
          <div className="absolute inset-0 -m-6 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-teal-500/5 rounded-2xl blur-[20px] opacity-70"></div>
            <div className="absolute inset-0 border border-teal-500/20 bg-[#0A1A3B]/40 backdrop-blur-sm rounded-2xl"></div>
          </div>

          <div className="relative p-6 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-10 overflow-visible">
            {/* Problems section */}
            <div className="w-full md:w-[45%]">
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-8 text-center md:text-left">
                The Problems
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-20 relative">
                {problems.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative group flex flex-col items-center"
                  >
                    <div className="text-center mb-3">
                      <p className="text-sm font-medium text-white/90 px-2 py-1 rounded-md bg-[#0A1A3B]/40 backdrop-blur-sm border border-teal-500/10 inline-block">{item.title}</p>
                    </div>
                    <div
                      className="w-full aspect-square max-w-[120px] rounded-xl bg-[#0A1A3B]/70 backdrop-blur-md border border-teal-500/30 
                      flex items-center justify-center relative overflow-hidden group-hover:border-teal-500/50 transition-all duration-300 shadow-lg"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10 opacity-30 
                        group-hover:opacity-50 transition-all duration-300"
                      ></div>
                      <item.icon
                        className="w-7 h-7 text-teal-400 group-hover:text-teal-300 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="text-center mt-4 max-w-[140px] mx-auto">
                      <p className="text-xs text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow connecting problems to solutions */}
            <div className="flex items-center justify-center flex-shrink-0 relative self-center">
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#0A1A3B]/80 backdrop-blur-sm border border-teal-500/40 shadow-lg relative z-10">
                <ArrowRight className="w-8 h-8 text-teal-400" strokeWidth={1.5} />
              </div>
              <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#0A1A3B]/80 backdrop-blur-sm border border-teal-500/40 rotate-90 shadow-lg relative z-10">
                <ArrowRight className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
              </div>
            </div>

            {/* Solutions section */}
            <div className="w-full md:w-[45%]">
              <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-8 text-center md:text-left">
                Our Solutions
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-24 md:gap-x-16 md:gap-y-28 relative">
                {solutions.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative group flex flex-col items-center"
                  >
                    <div className="text-center mb-3">
                      <p className="text-sm font-medium text-white/90 px-2 py-1 rounded-md bg-[#0A1A3B]/40 backdrop-blur-sm border border-teal-500/10 inline-block">{item.title}</p>
                    </div>
                    <div
                      className="w-full aspect-square max-w-[120px] rounded-xl bg-[#0A1A3B]/70 backdrop-blur-md border border-teal-500/30 
                      flex items-center justify-center relative overflow-hidden group-hover:border-teal-500/50 transition-all duration-300 shadow-lg"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-30 
                        group-hover:opacity-50 transition-all duration-300"
                      ></div>
                      <item.icon
                        className="w-7 h-7 text-teal-400 group-hover:text-teal-300 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="text-center mt-4 max-w-[140px] mx-auto">
                      <p className="text-xs text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

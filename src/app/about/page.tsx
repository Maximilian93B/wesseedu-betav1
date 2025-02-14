import { ArrowRight, Leaf, Users, TrendingUp, Shield, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutWeSeedU() {
  return (
    <div className="relative">
      {/* Add a subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#020714] via-[#0A1A3B]/95 to-[#020714] pointer-events-none" />

      <main className="relative container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-32 space-y-8">
          <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
            About WeSeedU
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-gradient-primary">
            Empowering Sustainable Investments
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Connecting investors with exclusive opportunities to support top-tier sustainable companies driving
            impactful innovation.
          </p>
          <Button 
            className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-black font-semibold hover-glow"
            asChild
          >
            <Link href="/auth/signup">
              Join WeSeedU
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        {/* Key Features */}
        <section className="py-24">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
              Our Platform
            </div>
            <h2 className="text-4xl font-bold text-gradient-primary">
              The Platform for Purposeful Investments
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-12 h-12 text-teal-500" />,
                title: "Impact-Driven Opportunities",
                description:
                  "Focus on early-stage sustainable companies making measurable progress toward UN Sustainable Development Goals.",
              },
              {
                icon: <Shield className="w-12 h-12 text-teal-500" />,
                title: "Sustainability Scoring",
                description:
                  "Each company is rated based on environmental, social, and governance (ESG) criteria, offering transparency and trust.",
              },
              {
                icon: <Users className="w-12 h-12 text-teal-500" />,
                title: "Expert Vetting",
                description:
                  "Gain access to companies handpicked by WeSeedU, the GSF, and the UN, ensuring alignment with sustainability goals.",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-teal-500" />,
                title: "Early Access",
                description:
                  "Invest in innovative companies before they go public, maximizing growth potential and returns.",
              },
              {
                icon: <BarChart className="w-12 h-12 text-teal-500" />,
                title: "Comprehensive Analytics",
                description: "Access detailed financial and impact metrics to make informed investment decisions.",
              },
              {
                icon: <ArrowRight className="w-12 h-12 text-teal-500" />,
                title: "Seamless Investment Process",
                description: "Easy-to-use platform for discovering, evaluating, and investing in sustainable ventures.",
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-effect border-white/10 p-6 hover-glow transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white text-center">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Opportunity */}
        <section className="py-24">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
              Market Opportunity
            </div>
            <h2 className="text-4xl font-bold text-gradient-primary">
              The Opportunity
            </h2>
          </div>
          <div className="glass-effect border-white/10 p-8 text-center hover-glow max-w-3xl mx-auto">
            <p className="text-4xl font-bold text-gradient-primary mb-4">$35+ Trillion</p>
            <p className="text-xl text-white mb-4">Currently invested in sustainable assets globally</p>
            <p className="text-gray-400">
              This represents a significant shift towards impact investing and a growing demand for trusted, transparent
              platforms like WeSeedU.
            </p>
          </div>
        </section>

        {/* Business Model */}
        <section className="py-24">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
              Revenue Model
            </div>
            <h2 className="text-4xl font-bold text-gradient-primary">
              Our Business Model
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-effect border-white/10 p-8 hover-glow">
              <h3 className="text-xl font-semibold mb-6 text-white">Tiered Membership</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-2">
                  <span className="text-teal-500 font-semibold">Root Access (Free):</span>
                  Basic platform access for retail investors
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-semibold">Thrive Member (Paid Annually):</span>
                  In-depth company profiles, sustainability scoring, and analytics tools
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500 font-semibold">Impact Member (Awarded Annually):</span>
                  Exclusive tier for significant contributors to sustainable ventures
                </li>
              </ul>
            </div>
            <div className="glass-effect border-white/10 p-8 hover-glow">
              <h3 className="text-xl font-semibold mb-6 text-white">Success Fee Model</h3>
              <p className="text-gray-400 mb-4">
                WeSeedU charges a success fee only when a company secures funding through the platform:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-2">
                  <span className="text-teal-500">2%</span> for funding &lt; $500,000
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500">3%</span> for funding $500,000 – $1,000,000
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-500">5%</span> for funding &gt; $1,000,000
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Growth Plan */}
        <section className="py-24">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
              Future Vision
            </div>
            <h2 className="text-4xl font-bold text-gradient-primary">
              Our Growth Plan
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Year 1: Foundation & Launch",
                points: [
                  "Platform launch with core features",
                  "Onboard initial companies",
                  "Drive revenue through company listings",
                  "Establish brand presence",
                ],
              },
              {
                title: "Years 2-3: Expansion & Optimization",
                points: [
                  "Grow companies on the platform",
                  "Collaborate with sustainability organizations",
                  "Enhance digital marketing",
                  "Introduce tiered memberships",
                ],
              },
              {
                title: "Years 3-5: Global Scaling & Profitability",
                points: [
                  "Expand into international markets",
                  "Introduce new revenue streams",
                  "Achieve sustainable profitability",
                  "Establish industry leadership",
                ],
              },
            ].map((phase, index) => (
              <div key={index} className="glass-effect border-white/10 p-8 hover-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-gray-400 flex gap-2">
                      <span className="text-teal-500">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 text-center">
          <div className="glass-effect border-white/10 p-12 max-w-4xl mx-auto hover-glow">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4">
              Join the Sustainable Investment Revolution
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Be part of a movement that creates both financial and environmental impact.
            </p>
            <Button 
              className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-black font-semibold hover-glow"
              asChild
            >
              <Link href="/auth/signup">
                Get Started with WeSeedU
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
} 
"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function KeyFeatures() {
  return (
    <section className="relative py-24 md:py-32 z-20">
      <div className="container relative mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center space-y-8 mb-24">
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 px-5 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-sm font-medium text-teal-400">Our Features</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 animate-flow">
                WeSeedU
              </span>
            </h2>
            <p className="text-white max-w-2xl mx-auto text-lg">
              Experience the future of impact investing with our innovative platform
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-32">
          {/* Dashboard Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 px-2">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-sm font-medium text-teal-400">Dashboard Analytics</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Empower Your 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"> Investment </span>
                  Journey
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  Our intuitive dashboard provides real-time insights into your impact investments, allowing you to
                  track performance, sustainability metrics, and potential opportunities all in one place.
                </p>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white">Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    { title: "Exclusive invesmnets", desc: "Invest in early-stage startups" },
                    { title: "Impact metrics", desc: "Measure your social impact" },
                    { title: "Smart recommendations", desc: "AI-powered insights" },
                    { title: "Due diligence", desc: "WeSeedU does the heavy lifting  for you" }
                  ].map((item, index) => (
                    <div key={item.title} className="flex items-start space-x-3 text-white">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="space-y-1">
                        <span className="block text-white font-medium">{item.title}</span>
                        <span className="block text-sm text-white">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            {/* Layered Images Section */}
            <div className="relative w-full h-[600px]">
              {/* Background Image - Analytics Dashboard */}
              <div className="absolute right-0 top-40 w-[85%] h-[500px]">
                <Image
                  src="/images/Screenshot 2025-02-21 121434.png"
                  alt="Analytics Dashboard"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover rounded-xl border border-white/10 shadow-2xl"
                />
              </div>

              {/* Middle Image - Portfolio View */}
              <div className="absolute left-0 top-20 w-[88%] h-[500px]">
                <Image
                  src="/images/Screenshot 2025-02-21 121434.png"
                  alt="Portfolio Dashboard"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={95}
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-2xl"
                />
              </div>

              {/* Front Image - Main Dashboard */}
              <div className="absolute left-10 top-0 w-[92%] h-[500px]">
                <Image
                  src="/images/Screenshot 2025-02-21 121434.png"
                  alt="Main Dashboard"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={100}
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


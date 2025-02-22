"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function KeyFeatures() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 mb-24"
        >
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
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-32">
          {/* Dashboard Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
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
                  ].map((item) => (
                    <li key={item.title} className="flex items-start space-x-3 text-white">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="space-y-1">
                        <span className="block text-white font-medium">{item.title}</span>
                        <span className="block text-sm text-white">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative h-[600px] p-[1px] group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl blur-[40px] group-hover:blur-[60px] opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl blur-[20px] group-hover:blur-[30px] opacity-30 group-hover:opacity-40 transition-all duration-500 delay-100"></div>
              
              <div className="relative h-full rounded-2xl overflow-hidden border-2 border-emerald-500/20 bg-gray-900/90 backdrop-blur-sm">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/images/Screenshot 2025-02-21 121434.png"
                    alt="WeSeedU Dashboard"
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center',
                      backgroundColor: 'rgb(17, 24, 39)'
                    }}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>      
              </div>
            </div>
          </motion.div>

          {/* Marketplace Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative lg:-left-24"
          >
            <div className="relative h-[600px] p-[1px] group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-[40px] group-hover:blur-[60px] opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-[20px] group-hover:blur-[30px] opacity-30 group-hover:opacity-40 transition-all duration-500 delay-100"></div>
              
              <div className="relative h-full rounded-2xl overflow-hidden border-2 border-blue-500/20 bg-gray-900/90 backdrop-blur-sm flex items-start justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/Screenshot 2025-02-21 200935.png"
                    alt="WeSeedU Marketplace"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      backgroundColor: 'rgb(17, 24, 39)'
                    }}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
            
              </div>
            </div>
            <div className="space-y-8 px-2">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm font-medium text-blue-400">Marketplace</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Discover 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500"> Impactful </span>
                  Opportunities
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  Explore our curated marketplace of sustainable startups and projects, each thoroughly vetted
                  and aligned with UN Sustainable Development Goals for maximum social impact.
                </p>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white">Platform Benefits</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    { title: "Vetted opportunities", desc: "Pre-screened quality projects" },
                    { title: "SDG alignment", desc: "UN goals compatibility" },
                    { title: "Risk analysis", desc: "Comprehensive risk scoring" },
                    { title: "Direct communication", desc: "Connect with founders" }
                  ].map((item) => (
                    <li key={item.title} className="flex items-start space-x-3 text-gray-400">
                      <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="space-y-1">
                        <span className="block text-white font-medium">{item.title}</span>
                        <span className="block text-sm text-white">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


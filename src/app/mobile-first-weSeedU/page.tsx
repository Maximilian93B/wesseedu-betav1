export default function LearnAboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#020714] via-[#0A1A3B]/95 to-[#020714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="space-y-4 text-center mb-16">
          <span className="inline-block text-emerald-400 text-sm font-medium tracking-wider uppercase 
            bg-emerald-400/10 px-4 py-1 rounded-full border border-emerald-400/20">
            Our Vision
          </span>
          
          <h1 className="relative">
            <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-400/20 
              via-white/5 to-emerald-400/20 animate-pulse"></span>
            <span className="relative text-4xl md:text-5xl lg:text-6xl font-bold 
              bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text 
              text-transparent tracking-tight leading-tight">
              The Future of Impact Investing
            </span>
          </h1>
          
          <p className="text-xl text-emerald-400 font-light">
            From Web to Mobile: Making Every Investment Count
          </p>
        </div>
        
        <div className="space-y-24">
          {/* Evolution Section */}
          <section className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-400/50 
              via-emerald-400 to-emerald-400/50 rounded-full blur-[1px]"></div>
            <div className="pl-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-zinc-200 to-white 
                bg-clip-text text-transparent mb-6">
                Our Evolution
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                Starting as a web marketplace, WeSeedU is transforming into the leading mobile platform 
                for sustainable investments. We're not just changing how people invest – we're revolutionizing 
                the impact their investments can have on the world.
              </p>
            </div>
          </section>

          {/* Journey Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Our Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  phase: "Phase 1",
                  title: "Web Marketplace",
                  description: "Where we started: A digital platform connecting conscious investors with sustainable opportunities.",
                  current: true
                },
                {
                  phase: "Phase 2",
                  title: "Mobile Revolution",
                  description: "Where we are: Developing a powerful mobile platform that puts sustainable investing in everyone's pocket.",
                  current: false
                },
                {
                  phase: "Phase 3",
                  title: "Market Leader",
                  description: "Where we're heading: Becoming the go-to platform for impactful sustainable investments globally.",
                  current: false
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 
                    via-white/5 to-emerald-400/10 rounded-xl blur opacity-0 
                    group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-[#0A0A0A] border-2 border-white/5 
                    hover:border-white/10 rounded-xl p-6 shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] 
                    hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] transition-all duration-300">
                    {item.current && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium 
                          bg-emerald-400/10 text-emerald-400 rounded-full border border-emerald-400/20">
                          Current
                        </span>
                      </div>
                    )}
                    <div className="text-emerald-400 text-xl mb-3">{item.phase}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile-First Section */}
          <section className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 
              via-white/5 to-emerald-400/10 rounded-xl blur opacity-0 
              group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-[#0A0A0A] border-2 border-white/5 
              hover:border-white/10 rounded-xl p-8 shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] 
              hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-8">Why Mobile-First Matters</h2>
              <div className="grid md:grid-cols-2 gap-12">
                {[
                  {
                    title: "Accessibility",
                    items: [
                      "Invest anytime, anywhere",
                      "Real-time impact tracking",
                      "Instant portfolio updates",
                      "Seamless user experience"
                    ]
                  },
                  {
                    title: "Community Power",
                    items: [
                      "Connect with like-minded investors",
                      "Share investment insights",
                      "Track collective impact",
                      "Join sustainable initiatives"
                    ]
                  }
                ].map((section, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-3 text-zinc-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Making Real Impact</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Transparent Tracking",
                  description: "See exactly how your investments contribute to sustainable projects with real-time impact metrics and updates."
                },
                {
                  title: "Verified Projects",
                  description: "Every investment opportunity is thoroughly vetted to ensure genuine environmental and social impact."
                },
                {
                  title: "Direct Impact",
                  description: "Your investments go directly to projects making real change, with minimal intermediaries."
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 
                    via-white/5 to-emerald-400/10 rounded-xl blur opacity-0 
                    group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-[#0A0A0A] border-2 border-white/5 
                    hover:border-white/10 rounded-xl p-6 shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] 
                    hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white">Be Part of the Change</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Join us in building a future where sustainable investing is accessible, 
              mobile-first, and truly impactful.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold 
              py-3 px-8 rounded-xl transition-colors shadow-md hover:shadow-emerald-500/25">
              Start Your Impact Journey
            </button>
          </section>
        </div>
      </div>
    </main>
  )
} 
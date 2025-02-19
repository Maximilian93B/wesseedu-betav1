export default function SolutionsPage() {
    return (
      <main className="min-h-screen py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Bridging Innovation & Investment</h1>
            <p className="text-xl text-green-400">
              Connecting Tomorrow's Sustainable Solutions with Today's Investors
            </p>
          </div>
  
          <div className="grid gap-16">
            {/* Innovation Pipeline Section */}
            <section>
              <h2 className="text-3xl font-semibold mb-8">Our Innovation Pipeline</h2>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                {[
                  {
                    stage: "Discovery",
                    icon: "🔍",
                    description: "We scout groundbreaking sustainable technologies and innovations worldwide"
                  },
                  {
                    stage: "Validation",
                    icon: "✓",
                    description: "Rigorous verification of technology, market potential, and impact metrics"
                  },
                  {
                    stage: "Integration",
                    icon: "🔄",
                    description: "Seamless platform integration for easy investor access"
                  },
                  {
                    stage: "Growth",
                    icon: "📈",
                    description: "Ongoing support and monitoring of project development"
                  }
                ].map((item) => (
                  <div key={item.stage} className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.stage}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
  
            {/* Technology Sectors */}
            <section className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-3xl font-semibold mb-8">Technology Sectors</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-400">Clean Energy</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Next-gen solar technology</li>
                    <li>• Advanced energy storage</li>
                    <li>• Smart grid solutions</li>
                    <li>• Wind power innovations</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-400">Sustainable Agriculture</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Vertical farming systems</li>
                    <li>• Precision agriculture</li>
                    <li>• Water conservation tech</li>
                    <li>• Sustainable packaging</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-400">Green Transportation</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Electric vehicle tech</li>
                    <li>• Charging infrastructure</li>
                    <li>• Battery innovations</li>
                    <li>• Sustainable fuels</li>
                  </ul>
                </div>
              </div>
            </section>
  
            {/* How We Bridge the Gap */}
            <section>
              <h2 className="text-3xl font-semibold mb-8">How We Bridge the Gap</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">For Innovators</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Access to diverse investor pool
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Streamlined funding process
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Market validation and feedback
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Growth support and resources
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">For Investors</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Vetted investment opportunities
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Transparent impact metrics
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Easy-to-use mobile platform
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      Regular project updates
                    </li>
                  </ul>
                </div>
              </div>
            </section>
  
            {/* Success Metrics */}
            <section className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-3xl font-semibold mb-8">Our Impact</h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                  { metric: "50+", label: "Innovative Projects" },
                  { metric: "10K+", label: "Active Investors" },
                  { metric: "$25M+", label: "Total Investment" },
                  { metric: "30+", label: "Countries Reached" }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-3xl font-bold text-green-400 mb-2">{item.metric}</div>
                    <div className="text-gray-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>
  
            {/* Call to Action */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-6">Ready to Make an Impact?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join us in accelerating the adoption of sustainable technologies through accessible investment opportunities.
              </p>
              <div className="space-x-4">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Start Investing
                </button>
                <button className="border border-green-600 hover:bg-green-600/10 text-green-400 font-bold py-3 px-8 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    )
  }
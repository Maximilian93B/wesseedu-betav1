export default function LearnAboutPage() {
  return (
    <main className="min-h-screen py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">The Future of Impact Investing</h1>
        <p className="text-xl text-green-400 mb-12">From Web to Mobile: Making Every Investment Count</p>
        
        <div className="grid gap-12">
          <section className="border-l-4 border-green-500 pl-6">
            <h2 className="text-3xl font-semibold mb-4">Our Evolution</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Starting as a web marketplace, WeSeedU is transforming into the leading mobile platform 
              for sustainable investments. We're not just changing how people invest – we're revolutionizing 
              the impact their investments can have on the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Our Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-green-400 text-xl mb-3">Phase 1</div>
                <h3 className="text-xl font-semibold mb-3">Web Marketplace</h3>
                <p className="text-gray-300">
                  Where we started: A digital platform connecting conscious investors 
                  with sustainable opportunities.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 px-3 py-1 text-sm">
                  Current
                </div>
                <div className="text-green-400 text-xl mb-3">Phase 2</div>
                <h3 className="text-xl font-semibold mb-3">Mobile Revolution</h3>
                <p className="text-gray-300">
                  Where we are: Developing a powerful mobile platform that puts 
                  sustainable investing in everyone's pocket.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-green-400 text-xl mb-3">Phase 3</div>
                <h3 className="text-xl font-semibold mb-3">Market Leader</h3>
                <p className="text-gray-300">
                  Where we're heading: Becoming the go-to platform for impactful 
                  sustainable investments globally.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-8 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold mb-6">Why Mobile-First Matters</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Invest anytime, anywhere</li>
                  <li>• Real-time impact tracking</li>
                  <li>• Instant portfolio updates</li>
                  <li>• Seamless user experience</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Community Power</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Connect with like-minded investors</li>
                  <li>• Share investment insights</li>
                  <li>• Track collective impact</li>
                  <li>• Join sustainable initiatives</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Making Real Impact</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Transparent Tracking</h3>
                <p className="text-gray-300">
                  See exactly how your investments contribute to sustainable projects 
                  with real-time impact metrics and updates.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Verified Projects</h3>
                <p className="text-gray-300">
                  Every investment opportunity is thoroughly vetted to ensure 
                  genuine environmental and social impact.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Direct Impact</h3>
                <p className="text-gray-300">
                  Your investments go directly to projects making real change, 
                  with minimal intermediaries.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-6">Be Part of the Change</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join us in building a future where sustainable investing is accessible, 
              mobile-first, and truly impactful.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Start Your Impact Journey
            </button>
          </section>
        </div>
      </div>
    </main>
  )
} 
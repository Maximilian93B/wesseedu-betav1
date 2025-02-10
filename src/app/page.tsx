import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to WeSeedU
          {user && `, ${user.email}`}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connecting investors with innovative companies. Discover, invest, and grow together.
        </p>
        <div className="space-x-4">
          {user ? (
            <Link 
              href="/dashboard" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/companies" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Companies
              </Link>
              <Link 
                href="/auth/signup" 
                className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
             // icon="search"
              title="Discover"
              description="Find companies that align with your investment goals"
            />
            <FeatureCard 
             // icon="connect"
              title="Connect"
              description="Build relationships with promising startups"
            />
            <FeatureCard 
             // icon="grow"
              title="Grow"
              description="Track and manage your investments"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="500+" label="Companies Listed" />
            <StatCard number="10K+" label="Active Investors" />
            <StatCard number="$50M+" label="Investments Made" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="mb-8 text-blue-100">
            Join thousands of investors who have already discovered promising opportunities.
          </p>
          <Link 
            href="/auth/signin" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Component for feature cards
function FeatureCard({title, description }: { 
 // icon: string; 
  title: string; 
  description: string 
}) {
  return (
    <div className="text-center">
      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {/* Icon component or SVG here */}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

// Component for stat cards
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

// Footer component
function Footer() {
  return (
    <footer className="py-12 px-8 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto">
        {/* Footer content */}
        <div className="text-center text-sm mt-8">
          &copy; {new Date().getFullYear()} WeSeedU. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

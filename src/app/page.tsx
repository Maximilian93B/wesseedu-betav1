
import { HeroSection } from "@/components/wsu/HeroSection"
import { KeyFeatures } from "@/components/wsu/KeyFeatures"
import { ProblemSolution } from "@/components/wsu/ProblemSolution"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-grow">
        <HeroSection />
        <KeyFeatures />
        <ProblemSolution />
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-white/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">
                  Impact Investing
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Make your investments count for a sustainable future.
                </h2>
                <Link
                  href="/auth/signup"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={true}
                >
                  Start Investing
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">Transparency</div>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed">
                  Access detailed ESG metrics and impact reports for every investment opportunity. Our platform provides 
                  comprehensive data on environmental impact, social responsibility, and sustainable business practices 
                  to help you make informed decisions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-800 bg-gray-950 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm transition-colors hover:bg-gray-900 hover:text-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-900 border-t border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex gap-4 text-sm text-gray-400">
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </div>
            <p className="text-sm text-gray-400">© 2023 WeSeedU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


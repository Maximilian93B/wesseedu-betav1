"use client"

import Link from "next/link"

export function ImpactSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gradient-primary">
              Make your investments count for a sustainable future.
            </h2>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
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
  )
} 
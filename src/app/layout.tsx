import type { Metadata } from "next"
import SupabaseProviders from "./providers"
import { Navigation } from "@/components/wsu/Nav"
import "./globals.css"
import type React from "react" // Import React
import { headers } from 'next/headers'
import { Footer } from "@/components/wsu/Footer"

export const metadata: Metadata = {
  title: "WeSeedU - Sustainable Investment Platform",
  description:
    "Connect with exclusive opportunities to support top-tier sustainable companies that drive impactful innovation.",
  keywords: ["sustainable investing", "impact investing", "ESG", "startup funding"],
  authors: [{ name: "WeSeedU Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weseedu.com",
    siteName: "WeSeedU",
    title: "WeSeedU - Empowering Sustainable Investments",
    description: "Join WeSeedU to invest in vetted, sustainable companies making a real impact.",
    images: [
      {
        url: "https://weseedu.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WeSeedU - Sustainable Investment Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeSeedU - Sustainable Investment Platform",
    description: "Invest in a better future with WeSeedU",
    images: ["https://weseedu.com/twitter-image.jpg"],
    creator: "@WeSeedU",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  
  // Hide navigation for ALL auth routes
  const isAuthRoute = pathname.startsWith('/auth')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SupabaseProviders>
          <div className="relative flex min-h-screen flex-col">
            {/* Only show Navigation if NOT in auth routes */}
            {!isAuthRoute && (
              <div className="relative z-10">
                <Navigation />
              </div>
            )}
            <main className="flex-1 relative z-0">{children}</main>
            {/* Only show Footer if NOT in auth routes */}
            {!isAuthRoute && <Footer />}
          </div>
        </SupabaseProviders>
      </body>
    </html>
  )
}


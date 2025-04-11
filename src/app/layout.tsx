import type { Metadata, Viewport } from "next"
import SupabaseProviders from "./providers"
import "./globals.css"
import React from "react"
import { headers } from 'next/headers'
import { cn } from "@/lib/utils"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  userScalable: true,
  themeColor: "#49c628",
}

export const metadata: Metadata = {
  title: "WeSeedU - Sustainable Investment Platform",
  description:
    "Connect with exclusive opportunities to support top-tier sustainable companies that drive impactful innovation.",
  keywords: ["sustainable investing", "impact investing", "ESG", "startup funding"],
  authors: [{ name: "WeSeedU Team" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WeSeedU"
  },
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
  // Get the request headers
  const headersList = headers()
  
  // Try to get the pathname from headers
  const pathname = headersList.get('x-pathname') || ''
  
  // Get the URL from the referer header as a fallback
  const referer = headersList.get('referer') || ''
  
  // Check if we're on any auth-related page using both methods
  const isAuthPage = pathname.includes('/auth') || referer.includes('/auth')
  
  return (
    <html lang="en" suppressHydrationWarning className="text-base">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="HandheldFriendly" content="true" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-base touch-manipulation")}>
        <SupabaseProviders>
          <div className="relative flex min-h-screen flex-col">
            {/* Only show Navigation if NOT on any auth page */}
            {!isAuthPage && (
              <div className="relative z-10">
                {/* Navigation goes here */}
              </div>
            )}
            <main className="flex-1 relative z-0">{children}</main>
          </div>
        </SupabaseProviders>
      </body>
    </html>
  )
}

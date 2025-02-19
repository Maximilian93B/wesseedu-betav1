import type { Metadata } from "next"
import  SupabaseProviders  from "./providers"
import { Navigation } from "@/components/wsu/Nav"
import "./globals.css"
import type React from "react" // Import React
import { headers } from 'next/headers'

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
  const isDashboard = pathname.includes('/auth/dashboard')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SupabaseProviders>
          <div className="relative flex min-h-screen flex-col">
            {!isDashboard && (
              <div className="relative z-10">
                <Navigation />
              </div>
            )}
            <main className="flex-1 relative z-0">{children}</main>
            {!isDashboard && (
              <footer className="relative z-10 py-6 md:px-8 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a
                      href="https://weseedu.com"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      WeSeedU
                    </a>
                    . The source code is available on{" "}
                    <a
                      href="https://github.com/weseedu/platform"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>
              </footer>
            )}
          </div>
        </SupabaseProviders>
      </body>
    </html>
  )
}


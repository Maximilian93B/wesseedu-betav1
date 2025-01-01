import { GeistSans } from 'geist/font/sans'
import { createClient } from '@/lib/supabase/client'
import { cookies } from 'next/headers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/app/globals.css'


export const metadata = {
  title: {
    default: 'Your App Name',
    template: '%s | Your App Name',
  },
  description: 'Your app description here',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <html 
      lang="en" 
      className={cn('antialiased', GeistSans.className)}
    >
      <body className="min-h-screen bg-background antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'

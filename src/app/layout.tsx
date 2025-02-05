import { GeistSans } from 'geist/font/sans'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/app/globals.css'
import authConfig from '../../config/auth.config'


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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDev = process.env.NODE_ENV === 'development'
  const isAuthDisabled = !authConfig.isAuthEnabled

  return (
    <html 
      lang="en" 
      className={cn('antialiased', GeistSans.className)}
    >
      <body className="min-h-screen bg-background antialiased">
        {isDev && (
          <div className="bg-yellow-400 text-black text-center py-1 flex justify-between px-4">
            <span>Development Mode</span>
            <span>
              Auth Status: {isAuthDisabled ? '🔓 Disabled' : '🔒 Enabled'}
              {isAuthDisabled && ` (${authConfig.devBypassEmail})`}
            </span>
          </div>
        )}
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

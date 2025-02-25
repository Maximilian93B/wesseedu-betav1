import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Helper function to check if path should show navigation
const shouldShowNavigation = (pathname: string) => {
  // List of paths that should not show navigation
  const noNavPaths = [
    '/auth/dashboard',
    '/auth/profile',
    '/auth/saved',
    '/auth/settings'
  ]
  
  return !noNavPaths.some(path => pathname.startsWith(path))
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the current pathname
  const pathname = cookies().get('next-url')?.value || ''

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex min-h-screen bg-black">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 
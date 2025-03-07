import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const IS_PUBLIC_PATHS = [
  '/auth/login',
  '/auth/signup',
  '/',
  '/auth/reset-password'
]

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
  const currentPath = pathname || '/'
  
  // Check if the current path is a public path
  const isPublicPath = IS_PUBLIC_PATHS.some(path => 
    currentPath.startsWith(path)
  )

  // If user is not logged in and trying to access a protected route
  if (!session && !isPublicPath) {
    redirect("/auth/login")
  }
  
  // Don't redirect from onboarding page if the user is logged in
  // This ensures the onboarding flow isn't interrupted
  if (session && 
      !isPublicPath && 
      currentPath !== '/onboarding' && 
      !(session.user.user_metadata?.onboarding_completed)) {
    // Check if user has a profile
    const { error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .single()
      
    // If no profile exists, redirect to onboarding
    if (error && error.code === 'PGRST116') {
      redirect("/onboarding")
    }
  }

  return (
    <div className="flex min-h-screen bg-black">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 
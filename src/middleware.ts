import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/index",
  "/about",
  "/contact",
  "/marketing",
  "/unauthorized",
  "/auth/login",
  "/auth/signup",
  "/auth/callback",
  "/auth/confirmation",
  "/auth/verification",
  "/auth/reset-password",
]

const ADMIN_ROUTES = ["/admin"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  // Use getUser() instead of getSession() for better security
  const { data: { user }, error } = await supabase.auth.getUser()
  
  const { pathname } = req.nextUrl

  // Store the current URL in a cookie for layouts to access
  res.cookies.set('next-url', pathname)
  
  // Handle public routes - always allow access
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return res
  }

  // For onboarding route
  if (pathname.startsWith('/onboarding')) {
    // Allow access if this is part of email verification flow
    const isEmailVerification = req.nextUrl.searchParams.has('type') && 
                               req.nextUrl.searchParams.get('type') === 'signup'
    
    if (!user && !isEmailVerification) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    return res
  }

  // For all other routes, require authentication
  if (!user) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // We don't check for onboarding completion in middleware
  // Let the page components handle that logic to avoid conflicts

  // Handle admin routes
  if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    if (user.user_metadata.user_type !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}


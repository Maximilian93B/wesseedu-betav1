import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"
import authConfig from "@/config/auth.config"

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
  "/auth/signin",
  "/auth/callback",
  "/auth/confirmation",
  "/auth/verification",
  "/auth/reset-password",
]

// Routes that require admin privileges
const ADMIN_ROUTES = ["/admin"]

// Dashboard routes pattern for consistent handling
const DASHBOARD_ROUTES = ["/dashboard"]

// API routes that should be accessible without auth
const PUBLIC_API_ROUTES = [
  "/api/health",
  "/api/auth/",
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const { pathname } = req.nextUrl

  // Store the current URL in a cookie for layouts to access
  res.cookies.set('next-url', pathname)
  
  // Check if we're in a public route - always allow access without auth check
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return res
  }
  
  // Check for public API routes
  if (PUBLIC_API_ROUTES.some(route => pathname.startsWith(route))) {
    return res
  }
  
  // DEV ONLY: Check auth bypass mode for development
  if (process.env.NODE_ENV === 'development') {
    // If auth is disabled in development, bypass auth checks
    if (!authConfig.isAuthEnabled) {
      return res;
    }
    
    // Allow direct access to onboarding in development
    if (pathname.startsWith('/onboarding')) {
      return res;
    }
  }
  
  // Create Supabase client
  const supabase = createMiddlewareClient({ req, res })
  
  try {
    // Use getUser() instead of getSession() for better security
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.log(`Middleware auth check: ${error.message} for path ${pathname}`);
    }
    
    // For onboarding route
    if (pathname.startsWith('/onboarding')) {
      // Allow access if this is part of email verification flow
      const isEmailVerification = req.nextUrl.searchParams.has('type') && 
                                req.nextUrl.searchParams.get('type') === 'signup'
      
      if (!user && !isEmailVerification) {
        const redirectUrl = new URL('/auth/login', req.url)
        redirectUrl.searchParams.set('redirectTo', pathname)
        return NextResponse.redirect(redirectUrl)
      }
      return res
    } 
  
    // For all other routes (including dashboard routes), require authentication
    if (!user) {
      // For API routes, return 401 instead of redirecting
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      
      const redirectUrl = new URL('/auth/login', req.url)
      redirectUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  
    // Handle admin routes with stricter validation
    if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
      // Check user_metadata is present and has the correct user_type
      if (!user.user_metadata || user.user_metadata.user_type !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }
  
    // For dashboard routes, log the transition for debugging
    if (DASHBOARD_ROUTES.some(route => pathname.startsWith(route))) {
      console.log(`Middleware: Authorized access to ${pathname} for user ${user.id}`);
    }
    
    return res
  } catch (error) {
    console.error('Middleware critical error:', error);
    
    // For API routes, return error
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
    
    // For regular routes, continue but log the error
    return res
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets|favicon.ico).*)"]
}


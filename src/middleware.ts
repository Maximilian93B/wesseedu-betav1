import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// Rate limiting configuration
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  current: new Map<string, { count: number; resetTime: number }>()
}

// Helper function to check protected routes
function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = [
    '/dashboard',
    '/user-dashboard',
    '/company-dashboard',
    '/profile',
    '/settings',
    '/company-registration',
    '/marketplace',
    '/favorites',
    '/notifications',
    '/api'
  ]

  // Public paths
  const publicPaths = [
    '/auth/signin',
    '/auth/signup',
    '/auth/callback',
    '/auth/reset-password'
  ]

  // Check if the pathname starts with any of the public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return false
  }
    // Check if the pathname starts with any of the protected paths
    return protectedPaths.some(path => pathname.startsWith(path))
  }




// Helper function for error redirects
function getErrorRedirect(error: Error, req: NextRequest): NextResponse {
  const baseUrl = new URL('/auth/signin', req.url)
  baseUrl.searchParams.set('error', error.message)
  baseUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
  return NextResponse.redirect(baseUrl)
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.current.get(ip)

  if (!record) {
    rateLimit.current.set(ip, { count: 1, resetTime: now + rateLimit.windowMs })
    return true
  }

  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + rateLimit.windowMs
    return true
  }

  if (record.count >= rateLimit.max) {
    return false
  }

  record.count++
  return true
}

// Middleware function to handle authentication
export async function middleware(req: NextRequest) {
  try {
    // Skip middleware in development for API routes
    if (process.env.NODE_ENV === 'development' && req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.next()
    }

    // Check rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    if (!checkRateLimit(ip)) {
      throw new Error('Too many requests')
    }

    // Initialize Supabase client
    const supabase = createMiddlewareClient({ req, res: NextResponse.next() })
    
    // Refresh session if it exists
    const { data: { session }, error } = await supabase.auth.getSession()
    // Handle session errors
    if (error) {
      console.error('Session error:', error)
      return getErrorRedirect(error, req)
    }
    // Check protected routes

    if (isProtectedRoute(req.nextUrl.pathname)) {
      if (!session) {
        return getErrorRedirect(new Error('unauthorized'), req)
      }
    }
    // Continue to the next middleware
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    return response
  } catch (error) {
    console.error('Middleware Error:', error)
    return getErrorRedirect(error as Error, req)
  }
}

// Middleware configuration
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/user-dashboard/:path*',
    '/company-dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/company-registration/:path*',
    '/marketplace/:path*',
    '/favorites/:path*',
    '/notifications/:path*',
    '/api/:path*'
  ]
}
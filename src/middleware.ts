// middleware.ts

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Define your public routes that do not require authentication.
 */
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/signup',
  '/auth/callback',
  '/auth/confirmation',
  '/auth/profile-create',
  '/',           
  '/about',
  '/contact',
  '/marketing',
  '/unauthorized'
];

/**
 * Define any routes that are for admin users only.
 * For instance, any route that starts with "/admin".
 */
const ADMIN_ROUTES = ['/admin'];

// Add the paths that require authentication
const protectedPaths = [
  '/companies',
  '/dashboard',
  '/profile',
  // Add other protected routes here
]

/**
 * The middleware function inspects every request.
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check auth session
  const { data: { session }, error } = await supabase.auth.getSession()

  // Get the pathname of the request
  const { pathname } = req.nextUrl

  // Check if the current path should be protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath && !session) {
    // Redirect to login if accessing protected route without session
    const redirectUrl = new URL('/auth/login', req.url)
    // Add the original URL as a query parameter to redirect back after login
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // -- Public Routes --
  // If the request is for a public route, continue without session check.
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // -- Protected Routes --
  // For all non-public routes, a session must exist.
  if (!session) {
    // Use rewrite instead of redirect to avoid flash
    return NextResponse.rewrite(new URL('/unauthorized', req.url));
  }

  // -- Admin Routes --
  // If the request is for an admin-only route, check if the user is an admin.
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    // Assuming your Supabase session has user metadata with a "user_type" field.
    if (session.user.user_metadata.user_type !== 'admin') {
      // Use rewrite instead of redirect to avoid flash
      return NextResponse.rewrite(new URL('/unauthorized', req.url));
    }
  }

  // (Optional) -- Add additional middleware logic here (e.g., rate limiting, security headers, etc.)

  // If all checks pass, continue to the requested route.
  return res
}

/**
 * Use the matcher configuration to ignore static files and favicon.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/companies/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    // Add other protected paths here
  ]
};

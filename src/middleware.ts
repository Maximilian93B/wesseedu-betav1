// middleware.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Define your public routes that do not require authentication.
 */
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/signup',
  '/auth/callback',
  '/',           // Home page
  '/about',
  '/contact',
  '/marketing'
];

/**
 * Define any routes that are for admin users only.
 * For instance, any route that starts with "/admin".
 */
const ADMIN_ROUTES = ['/admin'];

/**
 * The middleware function inspects every request.
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options, maxAge: 0 })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Extract the pathname from the request URL.
  const { pathname } = request.nextUrl;

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
    return NextResponse.rewrite(new URL('/unauthorized', request.url));
  }

  // -- Admin Routes --
  // If the request is for an admin-only route, check if the user is an admin.
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    // Assuming your Supabase session has user metadata with a "user_type" field.
    if (session.user.user_metadata.user_type !== 'admin') {
      // Use rewrite instead of redirect to avoid flash
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  }

  // (Optional) -- Add additional middleware logic here (e.g., rate limiting, security headers, etc.)

  // If all checks pass, continue to the requested route.
  return NextResponse.next();
}

/**
 * Use the matcher configuration to ignore static files and favicon.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

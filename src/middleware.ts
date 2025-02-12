import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, NextRequest } from 'next/server';


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
];

/**
 * The middleware function inspects every request.
 */
export async function middleware(req: NextRequest) {

  // ✅ Create Supabase middleware client correctly
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });


  // ✅ Get session once (instead of calling createMiddlewareClient twice)
  const { data: { session } } = await supabase.auth.getSession();

  // Get the pathname of the request
  const { pathname } = req.nextUrl;

  
  
  // ✅ Check if the current path should be protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath && !session) {
    // Redirect to login if accessing protected route without session
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirectTo', pathname); // Store original URL for redirecting back
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Allow public routes without requiring authentication
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ✅ Handle Admin Routes
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!session || session.user.user_metadata.user_type !== 'admin') {
      return NextResponse.rewrite(new URL('/unauthorized', req.url));
    }
  }

  // ✅ If all checks pass, continue to the requested route
  return res;
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

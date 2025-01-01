import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/user-dashboard/:path*',
    '/company-dashboard/:path*',
    '/company-registration/:path*',
    '/companies/:path*',
    '/favorites/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/notifications/:path*'
  ]
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Initialize Supabase client with new SSR approach
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { pathname } = request.nextUrl
   
  // Check authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', pathname)
    redirectUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(redirectUrl)
  }

  // Handle database errors
  const { data: userData, error } = await supabase
    .from('users')
    .select('user_type, id')
    .eq('id', session.user.id)
    .single()

  if (error) {
    return NextResponse.redirect(new URL('/error?type=database', request.url))
  }

  // Define access patterns
  type RouteAccess = {
    [key: string]: string[]
  }

  const routeAccess: RouteAccess = {
    '/user-dashboard': ['investor'],
    '/company-dashboard': ['company'],
    '/companies': ['investor'],
    '/favorites': ['investor'],
    '/company-registration': ['company']
  }

  // Check route permissions
  for (const [route, allowedTypes] of Object.entries(routeAccess)) {
    if (pathname.startsWith(route) && !allowedTypes.includes(userData?.user_type)) {
      // Redirect to appropriate dashboard
      const dashboardRoute = userData?.user_type === 'company' 
        ? '/company-dashboard' 
        : '/user-dashboard'
      return NextResponse.redirect(new URL(dashboardRoute, request.url))
    }
  }

  // Protect user-specific routes
  if (['/profile', '/settings', '/notifications'].some(route => pathname.startsWith(route))) {
    const pathUserId = pathname.split('/')[2]
    if (pathUserId && pathUserId !== userData?.id) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Add cache headers to response
  response.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate')

  return response
} 
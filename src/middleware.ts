import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_ROUTES = [
  "/",
  "/index",
  "/about",
  "/contact",
  "/marketing",
  "/unauthorized",
]

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/callback",
  "/auth/confirmation",
  "/auth/profile-create",
]

const ADMIN_ROUTES = ["/admin"]

const PROTECTED_ROUTES = [
  "/auth/home",
  "/auth/profile",
  "/profile",
  "/companies",
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()
  const { pathname } = req.nextUrl

  // Add pathname to headers for layout navigation visibility
  res.headers.set('x-pathname', pathname)

  // Handle public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return res
  }

  // Handle auth routes
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (session) {
      // Redirect logged-in users away from auth pages
      return NextResponse.redirect(new URL('/auth/dashboard', req.url))
    }
    return res
  }

  // Handle protected routes
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!session) {
      const redirectUrl = new URL("/auth/login", req.url)
      redirectUrl.searchParams.set("redirectTo", pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return res
  }

  // Handle admin routes
  if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    if (session?.user.user_metadata.user_type !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}


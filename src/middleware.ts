import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/callback",
  "/auth/confirmation",
  "/auth/profile-create",
  "/",
  "/index",
  "/about",
  "/contact",
  "/marketing",
  "/unauthorized",
]

const ADMIN_ROUTES = ["/admin"]

const protectedPaths = ["/companies", "/dashboard", "/profile" , "/home"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath && !session) {
    const redirectUrl = new URL("/auth/login", req.url)
    redirectUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!session || session.user.user_metadata.user_type !== "admin") {
      return NextResponse.rewrite(new URL("/unauthorized", req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/companies/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
}


import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type Session } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const COOKIE_NAME = 'sb-auth-token'

export const COOKIE_OPTIONS: CookieOptions = {
  domain: process.env.NEXT_PUBLIC_DOMAIN || undefined,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7, // 1 week
  httpOnly: true,
}

export async function createClient(request?: NextRequest) {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookies = await cookieStore
          return cookies.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            const cookies = await cookieStore
            cookies.set({ name, value, ...options })
          } catch (error) {
            // Handle edge cases where cookies cannot be set
            console.error('Error setting cookie:', error)
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            const cookies = await cookieStore
            cookies.set({ name, value: '', ...options, maxAge: 0 })
          } catch (error) {
            console.error('Error removing cookie:', error)
          }
        },
      },
    }
  )
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = await createClient(request)

  // Refresh session if needed
  supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
    if (session) {
      response.cookies.set(COOKIE_NAME, session.access_token, COOKIE_OPTIONS)
    }
  })

  return response
}


export async function clearSession(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', { ...COOKIE_OPTIONS, maxAge: 0 })
  return response
} 
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const allCookies = await cookieStore.getAll()
          return allCookies.map(({ name, value }) => ({ name, value }))
        },
        async setAll(cookies: { name: string; value: string; options?: any }[]) {
          for (const { name, value, options } of cookies) {
            try {
              await cookieStore.set(name, value, options)
            } catch (error) {
              // Handle cookies in Edge functions
            }
          }
        },
      },
    }
  )
}

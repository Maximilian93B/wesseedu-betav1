import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  console.log("Debug API: Received debug request")
  
  // Get all cookies
  const cookieStore = cookies()
  const allCookies = cookieStore.getAll()
  
  // Filter for auth-related cookies
  const authCookies = allCookies.filter(c => 
    c.name.includes('auth') || 
    c.name.includes('supabase') || 
    c.name.includes('sb-')
  )
  
  console.log("Debug API: Found auth cookies:", authCookies.map(c => c.name).join(', '))
  
  // Get URL info
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams.entries())
  
  // Return debug information
  return NextResponse.json({
    message: "Debug information",
    timestamp: new Date().toISOString(),
    cookies: {
      all: allCookies.map(c => c.name),
      auth: authCookies.map(c => c.name),
    },
    url: {
      full: request.url,
      path: url.pathname,
      params: params
    },
    headers: Object.fromEntries(
      Array.from(request.headers.entries())
    )
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  })
} 
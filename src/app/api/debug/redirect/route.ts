import { NextResponse } from "next/server"

export async function GET(request: Request) {
  console.log("Debug Redirect API: Received request")
  
  // Get the URL and query parameters
  const url = new URL(request.url)
  const target = url.searchParams.get('target') || '/auth/home/page'
  
  console.log(`Debug Redirect API: Redirecting to ${target}`)
  
  // Create a response with a redirect
  return NextResponse.redirect(new URL(target, request.url), {
    // Add headers to prevent caching
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  })
} 
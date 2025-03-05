import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  console.log("API: /api/auth/check-session - Request received")
  
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Log all cookies for debugging
    console.log("API: Check-session cookies:", cookieStore.getAll().map(c => c.name))
    
    // Get the session
    const { data: { session } } = await supabase.auth.getSession()
    console.log("API: Session check result:", session ? "Session found" : "No session found")
    
    return NextResponse.json({ 
      data: { 
        session: session ? {
          user: {
            id: session.user.id,
            email: session.user.email
          },
          expires_at: session.expires_at
        } : null 
      }
    })
  } catch (error) {
    console.error("API: Error checking session:", error)
    return NextResponse.json({ error: "Error checking session" }, { status: 500 })
  }
} 
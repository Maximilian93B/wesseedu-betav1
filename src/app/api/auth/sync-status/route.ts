import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import authConfig from '@/config/auth.config'

// Force dynamic to ensure we always get fresh auth state
export const dynamic = 'force-dynamic'

export async function GET() {
  console.log("API: /api/auth/sync-status - Request received")
  
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Check if auth is disabled in dev mode
    const isDevBypass = process.env.NODE_ENV === 'development' && !authConfig.isAuthEnabled;
    
    // Get auth-related cookies for debugging
    const authCookies = cookieStore.getAll().filter(c => 
      c.name.includes('auth') || 
      c.name.includes('supabase') || 
      c.name.includes('sb-')
    )
    
    console.log("API: Sync-status auth cookies:", authCookies.map(c => c.name).join(', '))
    
    // Dev bypass - use mock session if auth is disabled
    if (isDevBypass) {
      console.log(`API: Dev bypass active with email ${authConfig.devBypassEmail}`)
      
      return NextResponse.json({ 
        data: {
          authenticated: true,
          serverAuthMode: 'dev-bypass',
          session: {
            user: {
              id: 'dev-user-id',
              email: authConfig.devBypassEmail
            },
            expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
          }
        }
      })
    }
    
    // Production mode - check actual session
    const { data: { session } } = await supabase.auth.getSession()
    console.log("API: Session check result:", session ? "Session found" : "No session found")
    
    // Get token info if available
    let tokenInfo = null
    if (session?.access_token) {
      try {
        // Decode JWT to check expiration
        const tokenParts = session.access_token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
          tokenInfo = {
            expiresAt: payload.exp,
            secondsRemaining: payload.exp - Math.floor(Date.now() / 1000)
          };
        }
      } catch (e) {
        console.error("API: Error decoding token:", e);
      }
    }
    
    return NextResponse.json({ 
      data: { 
        authenticated: !!session,
        serverAuthMode: 'standard',
        needsRefresh: tokenInfo?.secondsRemaining < 300, // Less than 5 minutes left
        session: session ? {
          user: {
            id: session.user.id,
            email: session.user.email,
            role: session.user.role
          },
          expires_at: session.expires_at,
          tokenInfo
        } : null 
      }
    })
  } catch (error) {
    console.error("API: Error checking session:", error)
    return NextResponse.json({ 
      error: "Error checking session",
      authenticated: false
    }, { status: 500 })
  }
} 
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.json()
  const { email, password, redirectUrl: explicitRedirect } = formData
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error.message)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Check if user has a profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    // Determine if user needs onboarding
    let redirectPath = '/dashboard/home'

    // If profile doesn't exist (PGRST116 is the "not found" error code)
    if (profileError && profileError.code === 'PGRST116') {
      // User needs onboarding
      redirectPath = '/onboarding'
      console.log("User needs onboarding, redirecting")
    } else if (profileError) {
      // Some other error occurred
      console.error("Profile fetch error:", profileError)
    }

    // If an explicit redirect was provided (from redirectTo param), use that instead
    // This ensures users go back to where they were trying to access
    const finalRedirectUrl = explicitRedirect || redirectPath
    
    // Store the session and auth state before redirecting
    // This ensures middleware and client auth checks will work immediately
    const sessionCookie = cookies().get('supabase-auth-token')
    
    // Set auth metadata in cookies to help debugging auth issues
    cookies().set('wsu-auth-ts', Date.now().toString(), { 
      path: '/',
      maxAge: 3600, // 1 hour
      httpOnly: false,
    })
    
    console.log(`Login successful for ${email}. Redirecting to: ${finalRedirectUrl}`)
    
    // Return response with appropriate redirect URL
    return NextResponse.json({ 
      success: true,
      redirectUrl: finalRedirectUrl,
      user: {
        id: data.user.id,
        email: data.user.email,
      }
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
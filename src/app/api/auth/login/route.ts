import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.json()
  const { email, password } = formData
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
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
    let redirectUrl = '/auth/home'

    // If profile doesn't exist (PGRST116 is the "not found" error code)
    if (profileError && profileError.code === 'PGRST116') {
      // User needs onboarding
      redirectUrl = '/onboarding'
      console.log("User needs onboarding, redirecting")
    } else if (profileError) {
      // Some other error occurred
      console.error("Profile fetch error:", profileError)
    }

    // Return response with appropriate redirect URL
    return NextResponse.json({ 
      success: true,
      redirectUrl: redirectUrl
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
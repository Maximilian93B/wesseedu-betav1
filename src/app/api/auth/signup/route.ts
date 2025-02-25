// app/api/auth/signup/route.ts

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()
  const { email, password, firstName, lastName } = formData
  const supabase = createRouteHandlerClient({ cookies })

  try {
    // Validate inputs
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields", details: "All fields are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists", details: "An account with this email already exists" },
        { status: 400 }
      )
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          onboarding_completed: false,
          onboarding_step: 1
        },
        // Redirect directly to onboarding after email confirmation
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding`
      }
    })

    if (error) {
      console.error("Signup error:", error)
      return NextResponse.json(
        { error: "Signup failed", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Please check your email for a confirmation link to complete your registration.",
      user: data.user
    })
  } catch (err) {
    console.error("Unexpected signup error:", err)
    return NextResponse.json(
      { error: "Unexpected error", details: "An unexpected error occurred during signup" },
      { status: 500 }
    )
  }
}

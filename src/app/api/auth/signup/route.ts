// app/api/auth/signup/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize the Supabase client using your public anon key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // Use the client-side signUp method to create the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        },
        // Set the redirect URL directly to profile creation
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/profile-create`
      }
    })

    if (error) {
      console.error('Error signing up:', error)
      return NextResponse.json(
        { error: 'Failed to sign up user', details: error.message },
        { status: 400 }
      )
    }

    // Remove the updateUser call since we're handling redirect in signUp options

    return NextResponse.json({ 
      user: data.user, 
      session: data.session,
      message: 'Please check your email to verify your account.'
    })
  } catch (error) {
    console.error('Signup Error:', error)
    return NextResponse.json(
      {
        error: 'Signup failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

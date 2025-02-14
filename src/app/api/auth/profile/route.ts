import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: Request) {
  try {
    const { id, email, name, user_type, user_tier, sustainable_investment_tags, total_investments, previous_month_investments, impact_score } = await request.json()

    // Insert the profile into the profiles table
    const { error } = await supabaseAdmin.from('profiles').insert([
      {
        id,
        email,
        name,
        user_type,
        user_tier,
        sustainable_investment_tags,
        total_investments,
        previous_month_investments,
        impact_score,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Profile creation error:', error)
      return NextResponse.json(
        { error: 'Profile creation failed', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: 'Profile created successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Profile creation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

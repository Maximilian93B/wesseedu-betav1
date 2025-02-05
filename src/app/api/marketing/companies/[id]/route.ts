import { createClient } from '@supabase/supabase-js'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params
    const { id: companyId } = await context.params;

    // Development mode
    if (process.env.NODE_ENV === 'development') {
      // Create Supabase client
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Await the company query
      const { data: company, error } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          logo_url,
          website_url,
          industry,
          location,
          year_founded,
          mission_statement,
          company_description,
          problem_statement,
          solution_description,
          target_market,
          competitive_advantage,
          team_members,
          funding_stage,
          funding_goal,
          current_funding,
          pre_money_valuation,
          equity_available
        `)
        .eq('id', companyId)
        .eq('is_active', true)
        .eq('is_verified', true)
        .single()

      if (error) throw error
      if (!company) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ company })
    }

    // Production mode
    // Await the cookie store
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    }, {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    })

    // Await the session check
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Await the company query
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select(`
        id,
        name,
        logo_url,
        website_url,
        industry,
        location,
        year_founded,
        mission_statement,
        company_description,
        problem_statement,
        solution_description,
        target_market,
        competitive_advantage,
        team_members,
        funding_stage,
        funding_goal,
        current_funding,
        pre_money_valuation,
        equity_available
      `)
      .eq('id', companyId)
      .eq('is_active', true)
      .eq('is_verified', true)
      .single()

    if (companyError) throw companyError
    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ company })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 
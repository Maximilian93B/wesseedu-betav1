import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get the investment data from the request body
    const { company_id, amount, notes } = await request.json()
    
    if (!company_id || !amount) {
      return NextResponse.json({ error: 'Company ID and amount are required' }, { status: 400 })
    }

    // Add the investment
    const { data, error } = await supabase
      .from('investments')
      .insert([
        {
          user_id: session.user.id,
          company_id,
          amount,
          notes: notes || null,
          investment_date: new Date().toISOString(),
        }
      ])
      .select()

    if (error) throw error

    // Update the user's total_investments in the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('total_investments')
      .eq('id', session.user.id)
      .single()

    if (profileError) throw profileError

    const currentTotal = profile.total_investments || 0
    const newTotal = currentTotal + parseFloat(amount.toString())

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ total_investments: newTotal })
      .eq('id', session.user.id)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error adding investment:', error)
    return NextResponse.json({ error: 'Failed to add investment' }, { status: 500 })
  }
} 
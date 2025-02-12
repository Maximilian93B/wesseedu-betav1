import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// ... existing GET function ...

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  })

  try {
    const { companyId } = await request.json()
    
    if (!companyId) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 })
    }

    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if company is already saved
    const { data: existingSave } = await supabase
      .from('company_saves')
      .select()
      .match({ company_id: companyId, user_id: session.user.id })
      .single()

    if (existingSave) {
      return NextResponse.json({ data: existingSave })
    }

    const { data, error } = await supabase
      .from('company_saves')
      .insert([{ company_id: companyId, user_id: session.user.id }])
      .select('*')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save company' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  })

  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')

    if (!companyId) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 })
    }

    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('company_saves')
      .delete()
      .match({ 
        company_id: companyId,
        user_id: session.user.id 
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to unsave company' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
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
    // Get the company ID from the request body
    const { companyId } = await request.json()
    
    if (!companyId) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 })
    }

    console.log(`Watchlist Add API: Adding company ${companyId} to watchlist for user ${session.user.id}`)

    // Check if the company is already in the user's watchlist
    const { data: existingSave, error: checkError } = await supabase
      .from("company_saves")
      .select("id")
      .eq("company_id", companyId)
      .eq("user_id", session.user.id)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing save:', checkError)
      throw checkError
    }

    // If already saved, return success
    if (existingSave) {
      console.log('Company already in watchlist')
      return NextResponse.json({ success: true, message: 'Company already in watchlist' })
    }

    // Add the company to the user's watchlist
    const { data, error } = await supabase
      .from("company_saves")
      .insert([
        {
          company_id: companyId,
          user_id: session.user.id
        }
      ])
      .select()

    if (error) {
      console.error('Error adding company to watchlist:', error)
      throw error
    }

    console.log('Company successfully added to watchlist')
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error adding company to watchlist:', error)
    return NextResponse.json({ error: 'Failed to add company to watchlist' }, { status: 500 })
  }
} 
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    console.error('Watchlist Add API: No session found');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get the company ID from the request body
    const body = await request.json();
    const { companyId } = body;
    
    console.log('Watchlist Add API: Request body:', body);
    
    if (!companyId) {
      console.error('Watchlist Add API: Company ID is missing from request');
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
      console.error('Watchlist Add API: Error checking existing save:', checkError)
      throw checkError
    }

    // If already saved, return success
    if (existingSave) {
      console.log('Watchlist Add API: Company already in watchlist, ID:', existingSave.id)
      return NextResponse.json({ success: true, message: 'Company already in watchlist' })
    }

    // Check if the company exists in the companies table
    const { data: companyExists, error: companyCheckError } = await supabase
      .from("companies")
      .select("id")
      .eq("id", companyId)
      .maybeSingle()
      
    if (companyCheckError) {
      console.error('Watchlist Add API: Error checking if company exists:', companyCheckError)
      throw companyCheckError
    }
    
    if (!companyExists) {
      console.error(`Watchlist Add API: Company with ID ${companyId} does not exist in the companies table`)
      return NextResponse.json({ error: 'Company does not exist' }, { status: 404 })
    }
    
    console.log(`Watchlist Add API: Company ${companyId} exists, proceeding with save`)

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
      console.error('Watchlist Add API: Error adding company to watchlist:', error)
      throw error
    }

    console.log('Watchlist Add API: Company successfully added to watchlist, data:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Watchlist Add API: Error adding company to watchlist:', error)
    return NextResponse.json({ error: 'Failed to add company to watchlist' }, { status: 500 })
  }
} 
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // Check authentication
    const auth = await checkAuth()
    if (auth.error) {
      return auth.error
    }

    // In development mode, return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Returning mock watchlist data')
      return NextResponse.json({
        data: [
          {
            id: 'dev-watchlist-1',
            company_id: 'dev-company-1',
            companies: {
              id: 'dev-company-1',
              name: 'EcoTech Solutions',
              description: 'Developing sustainable technology solutions',
              mission_statement: 'Creating a greener future through innovation',
              score: 85,
              image_url: 'https://placehold.co/100',
              community_members: 120,
              sustainability_data: { primary_category: 'Clean Energy' }
            }
          },
          {
            id: 'dev-watchlist-2',
            company_id: 'dev-company-2',
            companies: {
              id: 'dev-company-2',
              name: 'GreenGrow Farms',
              description: 'Sustainable agricultural practices',
              mission_statement: 'Growing food in harmony with nature',
              score: 78,
              image_url: 'https://placehold.co/100',
              community_members: 94,
              sustainability_data: { primary_category: 'Sustainable Agriculture' }
            }
          }
        ],
        error: null,
        status: 200
      })
    }

    const { supabase, session } = auth
    const userId = session.user.id
    
    console.log('Fetching watchlist from database for user', userId)
    
    // Fetch saved companies (watchlist) with company details included
    const { data, error } = await supabase
      .from('saved_companies')
      .select(`
        id, 
        company_id,
        companies (
          id, 
          name, 
          description, 
          mission_statement, 
          score, 
          image_url, 
          community_members, 
          sustainability_data
        )
      `)
      .eq('user_id', userId)
    
    if (error) {
      console.error('Error fetching watchlist:', error)
      throw error
    }

    console.log(`Successfully fetched ${data.length} watchlist items`)
    
    return NextResponse.json({
      data: data,
      error: null,
      status: 200
    })
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch watchlist', status: 500 },
      { status: 500 }
    )
  }
}

// Add and remove endpoints
export async function POST(request: Request) {
  try {
    // Check authentication
    const auth = await checkAuth()
    if (auth.error) {
      return auth.error
    }

    // Parse request body
    const body = await request.json()
    const { company_id, action } = body

    if (!company_id) {
      return NextResponse.json(
        { data: null, error: 'Company ID is required', status: 400 },
        { status: 400 }
      )
    }

    const { supabase, session } = auth
    const userId = session.user.id

    // Handle add/remove actions
    if (action === 'add') {
      // Check if the company is already in the watchlist
      const { data: existingEntry } = await supabase
        .from('saved_companies')
        .select('id')
        .eq('user_id', userId)
        .eq('company_id', company_id)
        .single()

      if (existingEntry) {
        return NextResponse.json({
          data: { id: existingEntry.id },
          message: 'Company already in watchlist',
          status: 200
        })
      }

      // Add to watchlist
      const { data, error } = await supabase
        .from('saved_companies')
        .insert({ user_id: userId, company_id })
        .select('id')
        .single()

      if (error) {
        console.error('Error adding to watchlist:', error)
        throw error
      }

      return NextResponse.json({
        data,
        message: 'Company added to watchlist',
        status: 201
      })
    } else if (action === 'remove') {
      // Remove from watchlist
      const { error } = await supabase
        .from('saved_companies')
        .delete()
        .eq('user_id', userId)
        .eq('company_id', company_id)

      if (error) {
        console.error('Error removing from watchlist:', error)
        throw error
      }

      return NextResponse.json({
        data: null,
        message: 'Company removed from watchlist',
        status: 200
      })
    }

    return NextResponse.json(
      { data: null, error: 'Invalid action', status: 400 },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating watchlist:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to update watchlist', status: 500 },
      { status: 500 }
    )
  }
} 
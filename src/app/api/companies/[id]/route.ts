import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET endpoint handler for fetching a single company by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Initialize Supabase client with cookies for auth
    const supabase = createRouteHandlerClient({ cookies })
    
    // Query single company by ID
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', params.id)
      .single()

    // Handle not found case
    if (error) throw error
    if (!data) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PUT endpoint handler for updating a company
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    const { data, error } = await supabase
      .from('companies')
      .update(json)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE endpoint handler for removing a company
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

// GET - Retrieve all goals for the user
export async function GET(req: NextRequest) {
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    // Ensure we always return a Response object, not null
    return error || NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const userId = session!.user.id
    
    // Get all goals for the user
    const { data: goals, error: goalsError } = await supabase!
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (goalsError) {
      console.error('Error fetching user goals:', goalsError)
      return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 })
    }
    
    // Get all milestones for the user
    const { data: milestones, error: milestonesError } = await supabase!
      .from('user_milestones')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (milestonesError) {
      console.error('Error fetching user milestones:', milestonesError)
      return NextResponse.json({ error: 'Failed to fetch milestones' }, { status: 500 })
    }
    
    return NextResponse.json({
      goals: goals || [],
      milestones: milestones || []
    })
    
  } catch (error) {
    console.error('Error in goals API:', error)
    return NextResponse.json({ error: 'Failed to fetch goals data' }, { status: 500 })
  }
}

// POST - Create a new goal
export async function POST(req: NextRequest) {
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    return error || NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const userId = session!.user.id
    const body = await req.json()
    
    // Validate request body
    const { title, description, target_amount, category, target_date } = body
    
    if (!title || !target_amount || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Create a new goal
    const { data: goal, error: goalError } = await supabase!
      .from('user_goals')
      .insert([
        {
          user_id: userId,
          title,
          description,
          target_amount,
          category,
          target_date: target_date || null,
          status: 'active'
        }
      ])
      .select()
      .single()
    
    if (goalError) {
      console.error('Error creating goal:', goalError)
      return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 })
    }
    
    return NextResponse.json({ goal })
    
  } catch (error) {
    console.error('Error in creating goal:', error)
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 })
  }
}

// PATCH - Update multiple goals (batch update)
export async function PATCH(req: NextRequest) {
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    return error || NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const userId = session!.user.id
    const body = await req.json()
    
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Request body must be an array' }, { status: 400 })
    }
    
    const updatePromises = body.map(async (goal) => {
      const { id, ...updates } = goal
      
      if (!id) return null
      
      // Ensure we only update allowed fields
      const allowedUpdates = ['title', 'description', 'target_amount', 'current_amount', 'category', 'target_date', 'status']
      
      // Use a Record type to avoid TypeScript errors
      const filteredUpdates: Record<string, any> = Object.keys(updates).reduce((obj: Record<string, any>, key) => {
        if (allowedUpdates.includes(key)) {
          obj[key] = updates[key]
        }
        return obj
      }, {})
      
      // Add updated_at timestamp
      filteredUpdates['updated_at'] = new Date().toISOString()
      
      const { data, error } = await supabase!
        .from('user_goals')
        .update(filteredUpdates)
        .eq('id', id)
        .eq('user_id', userId) // Security: ensure user owns this goal
        .select()
        .single()
        
      if (error) {
        console.error(`Error updating goal ${id}:`, error)
        return { id, success: false, error: error.message }
      }
      
      return { id, success: true, data }
    })
    
    const results = await Promise.all(updatePromises)
    return NextResponse.json({ results })
    
  } catch (error) {
    console.error('Error in updating goals:', error)
    return NextResponse.json({ error: 'Failed to update goals' }, { status: 500 })
  }
}

// DELETE - Delete a goal
export async function DELETE(req: NextRequest) {
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    return error || NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const userId = session!.user.id
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 })
    }
    
    // Delete the goal
    const { error: deleteError } = await supabase!
      .from('user_goals')
      .delete()
      .eq('id', id)
      .eq('user_id', userId) // Security: ensure user owns this goal
    
    if (deleteError) {
      console.error('Error deleting goal:', deleteError)
      return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error in deleting goal:', error)
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 })
  }
} 
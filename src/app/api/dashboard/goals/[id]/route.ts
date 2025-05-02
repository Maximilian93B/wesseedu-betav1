import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

// Define goal update interface
interface GoalUpdate {
  title?: string;
  description?: string;
  target_amount?: number;
  current_amount?: number;
  category?: string;
  target_date?: string | null;
  status?: string;
  updated_at?: string;
}

// GET a specific goal by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    return error || NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const userId = session!.user.id
    const goalId = params.id
    
    if (!goalId) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 })
    }
    
    // Get the specific goal
    const { data: goal, error: goalError } = await supabase!
      .from('user_goals')
      .select('*')
      .eq('id', goalId)
      .eq('user_id', userId) // Security: ensure user owns this goal
      .single()
    
    if (goalError) {
      console.error(`Error fetching goal ${goalId}:`, goalError)
      return NextResponse.json({ error: 'Failed to fetch goal' }, { status: 500 })
    }
    
    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    }
    
    return NextResponse.json({ goal })
    
  } catch (error) {
    console.error('Error in fetching specific goal:', error)
    return NextResponse.json({ error: 'Failed to fetch goal' }, { status: 500 })
  }
}

// PATCH - Update a specific goal
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    return error || NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const userId = session!.user.id
    const goalId = params.id
    
    if (!goalId) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 })
    }
    
    const body = await req.json() as Record<string, any>
    
    // Ensure we only update allowed fields
    const allowedUpdates = ['title', 'description', 'target_amount', 'current_amount', 'category', 'target_date', 'status']
    const updates: GoalUpdate = Object.keys(body).reduce((obj: GoalUpdate, key: string) => {
      if (allowedUpdates.includes(key)) {
        obj[key as keyof GoalUpdate] = body[key]
      }
      return obj
    }, {})
    
    // Add updated_at timestamp
    updates.updated_at = new Date().toISOString()
    
    // Check if the goal is being marked as completed
    if (updates.status === 'completed' && body.status !== 'completed') {
      // Create a milestone for the completed goal
      const { data: goal, error: goalFetchError } = await supabase!
        .from('user_goals')
        .select('title, category, target_amount')
        .eq('id', goalId)
        .single()
      
      if (goalFetchError) {
        console.error(`Error fetching goal data for milestone creation:`, goalFetchError)
        // Continue with the update even if we can't create the milestone
      } else if (goal) {
        // Only create milestone if we have goal data
        const { error: milestoneError } = await supabase!.from('user_milestones').insert([{
          user_id: userId,
          title: `Goal Achieved: ${goal.title}`,
          description: `Congratulations on reaching your ${goal.category} investment goal of $${goal.target_amount}!`,
          is_achieved: true,
          achievement_date: new Date().toISOString()
        }])
        
        if (milestoneError) {
          console.error(`Error creating milestone:`, milestoneError)
          // Continue with the update even if milestone creation fails
        }
      }
    }
    
    // Update the goal
    const { data, error: updateError } = await supabase!
      .from('user_goals')
      .update(updates)
      .eq('id', goalId)
      .eq('user_id', userId) // Security: ensure user owns this goal
      .select()
      .single()
    
    if (updateError) {
      console.error(`Error updating goal ${goalId}:`, updateError)
      return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
    }
    
    return NextResponse.json({ goal: data })
    
  } catch (error) {
    console.error('Error in updating goal:', error)
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
  }
} 
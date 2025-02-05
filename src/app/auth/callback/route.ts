import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      
      // Exchange the code for a session
      const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (authError) {
        console.error('Auth error:', authError)
        throw authError
      }

      if (!session?.user?.id) {
        console.error('No user ID found in session')
        throw new Error('No user ID found')
      }

      // Log the attempt to update
      console.log('Attempting to update user:', session.user.id)
      
      // Update the users table verification status
      const { data: updateData, error: updateError } = await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('id', session.user.id)
        .select()

      if (updateError) {
        console.error('Update error:', updateError)
        throw updateError
      }

      console.log('Update successful:', updateData)
    }

    // Redirect to user dashboard
    return NextResponse.redirect(new URL('/user-dashboard', request.url))
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }
}

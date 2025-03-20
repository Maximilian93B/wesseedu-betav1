import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// DELETE - remove a company from watchlist by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;
    
    if (!companyId) {
      console.error('User Watchlist API: Company ID is missing from request params');
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('User Watchlist API: Authentication error or no user', authError);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.log(`User Watchlist API: Removing company ${companyId} from watchlist for user ${user.id}`);
    
    // Remove the company from the user's watchlist
    const { error } = await supabase
      .from('company_saves')
      .delete()
      .eq('user_id', user.id)
      .eq('company_id', companyId);
    
    if (error) {
      console.error('User Watchlist API: Error removing company from watchlist:', error);
      return NextResponse.json(
        { error: 'Failed to remove company from watchlist' },
        { status: 500 }
      );
    }
    
    console.log('User Watchlist API: Company successfully removed from watchlist');
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error in user watchlist API (DELETE):', error);
    return NextResponse.json(
      { error: 'Failed to remove company from watchlist' },
      { status: 500 }
    );
  }
} 
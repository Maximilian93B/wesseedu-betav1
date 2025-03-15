import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get company ID from request body
    const { companyId } = await req.json();
    
    if (!companyId) {
      console.log('Company ID is missing from request');
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }
    
    // Remove company from watchlist
    const { error } = await supabase
      .from('company_saves')
      .delete()
      .eq('user_id', user.id)
      .eq('company_id', companyId);
    
    if (error) {
      console.error('Error removing company from watchlist:', error);
      return NextResponse.json(
        { error: 'Failed to remove company from watchlist' },
        { status: 500 }
      );
    }
    
    console.log('Company successfully removed from watchlist');
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error in remove from watchlist API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
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
    
    // Get profile data with investments
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('total_investments, investment_data')
      .eq('id', user.id)
      .single();
    
    if (profileError) {
      // If the error is because the profile doesn't exist, return empty stats
      if (profileError.code === 'PGRST116') {
        console.log('Profile not found, returning empty stats');
        return NextResponse.json({
          totalInvested: 0,
          investmentCount: 0
        });
      }
      
      console.error('Error fetching profile data:', profileError);
      return NextResponse.json(
        { error: 'Failed to fetch investment data' },
        { status: 500 }
      );
    }
    
    // Handle case where profile exists but investment_data might be null
    if (!profile) {
      return NextResponse.json({
        totalInvested: 0,
        investmentCount: 0
      });
    }
    
    // Get total invested amount from profile
    const totalInvested = profile.total_investments || 0;
    
    // Get investment count from investment_data array
    const investmentCount = Array.isArray(profile.investment_data) 
      ? profile.investment_data.length 
      : 0;
    
    return NextResponse.json({
      totalInvested,
      investmentCount
    });
    
  } catch (error) {
    console.error('Error in investment stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
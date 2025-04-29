import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { checkAuth } from '@/lib/utils/authCheck';
import authConfig from '@/config/auth.config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Use the improved checkAuth function
    const auth = await checkAuth();
    
    // Handle mock data for development mode
    if (process.env.NODE_ENV === 'development' && (!authConfig.isAuthEnabled || auth.error)) {
      console.log('Development mode: Returning mock investment stats data');
      return NextResponse.json({
        data: {
          totalInvested: 10000,
          investmentCount: 3
        },
        error: null,
        status: 200
      });
    }
    
    // Return error if authentication failed
    if (auth.error) {
      return auth.error;
    }
    
    const { supabase, session } = auth;
    
    // Get profile data with investments
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('total_investments, investment_data')
      .eq('id', session.user.id)
      .single();
    
    if (profileError) {
      // If the error is because the profile doesn't exist, return empty stats
      if (profileError.code === 'PGRST116') {
        console.log('Profile not found, returning empty stats');
        return NextResponse.json({
          data: {
            totalInvested: 0,
            investmentCount: 0
          },
          error: null,
          status: 200
        });
      }
      
      console.error('Error fetching profile data:', profileError);
      return NextResponse.json(
        { 
          data: null,
          error: 'Failed to fetch investment data',
          status: 500 
        },
        { status: 500 }
      );
    }
    
    // Handle case where profile exists but investment_data might be null
    if (!profile) {
      return NextResponse.json({
        data: {
          totalInvested: 0,
          investmentCount: 0
        },
        error: null,
        status: 200
      });
    }
    
    // Get total invested amount from profile
    const totalInvested = profile.total_investments || 0;
    
    // Get investment count from investment_data array
    const investmentCount = Array.isArray(profile.investment_data) 
      ? profile.investment_data.length 
      : 0;
    
    return NextResponse.json({
      data: {
        totalInvested,
        investmentCount
      },
      error: null,
      status: 200
    });
    
  } catch (error) {
    console.error('Error in investment stats API:', error);
    return NextResponse.json(
      { 
        data: null,
        error: 'Internal server error',
        status: 500 
      },
      { status: 500 }
    );
  }
} 
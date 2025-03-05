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
      console.error('Watchlist API: Authentication error or no user', authError);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.log('Watchlist API: Fetching company_saves for user:', user.id);
    
    // First get the saved company IDs
    const { data: savedCompanies, error: savedError } = await supabase
      .from('company_saves')
      .select('id, company_id')
      .eq('user_id', user.id);
    
    if (savedError) {
      console.error('Watchlist API: Error fetching saved companies:', savedError);
      return NextResponse.json(
        { error: 'Failed to fetch watchlist data' },
        { status: 500 }
      );
    }
    
    if (!savedCompanies || savedCompanies.length === 0) {
      console.log('Watchlist API: No saved companies found for user');
      return NextResponse.json([]);
    }
    
    // Get the company IDs
    const companyIds = savedCompanies.map(item => item.company_id);
    console.log(`Watchlist API: Found ${companyIds.length} saved company IDs:`, companyIds);
    
    // Now fetch the company details
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select(`
        id,
        name,
        description,
        mission_statement,
        score,
        pitch_deck_url,
        sustainability_data
      `)
      .in('id', companyIds);
    
    if (companiesError) {
      console.error('Watchlist API: Error fetching company details:', companiesError);
      return NextResponse.json(
        { error: 'Failed to fetch company details' },
        { status: 500 }
      );
    }
    
    console.log(`Watchlist API: Found ${companies?.length || 0} companies matching the saved IDs`);
    
    // Combine the data
    const watchlistData = savedCompanies.map(saved => {
      const company = companies?.find(c => c.id === saved.company_id);
      if (!company) {
        console.log(`Watchlist API: No company found for ID ${saved.company_id}`);
      }
      return {
        id: saved.id,
        company_id: saved.company_id,
        companies: company || null
      };
    });
    
    console.log(`Watchlist API: Returning ${watchlistData.length} watchlist items`);
    
    // Log the first item for debugging
    if (watchlistData.length > 0) {
      console.log('Watchlist API: First item example:', JSON.stringify(watchlistData[0]));
    }
    
    return NextResponse.json(watchlistData);
    
  } catch (error) {
    console.error('Error in watchlist API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
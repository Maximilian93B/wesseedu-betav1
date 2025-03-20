import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// GET - fetch watchlist items
export async function GET() {
  const startTime = Date.now();
  console.log('User Watchlist API: Request started at', new Date().toISOString());
  
  try {
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
    
    console.log('User Watchlist API: Fetching company_saves for user:', user.id);
    
    // First get the saved company IDs
    const { data: savedCompanies, error: savedError } = await supabase
      .from('company_saves')
      .select('id, company_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }); // Order by creation date
    
    if (savedError) {
      console.error('User Watchlist API: Error fetching saved companies:', savedError);
      return NextResponse.json(
        { error: 'Failed to fetch watchlist data' },
        { status: 500 }
      );
    }
    
    if (!savedCompanies || savedCompanies.length === 0) {
      console.log('User Watchlist API: No saved companies found for user');
      const endTime = Date.now();
      console.log(`User Watchlist API: Request completed in ${endTime - startTime}ms with empty result`);
      
      // Return empty array with cache headers
      const response = NextResponse.json([]);
      response.headers.set('Cache-Control', 'private, max-age=60'); // Cache for 1 minute
      return response;
    }
    
    // Get the company IDs
    const companyIds = savedCompanies.map(item => item.company_id);
    console.log(`User Watchlist API: Found ${companyIds.length} saved company IDs`);
    
    // Now fetch the company details
    try {
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
        console.error('User Watchlist API: Error fetching company details:', companiesError);
        return NextResponse.json(
          { error: 'Failed to fetch company details' },
          { status: 500 }
        );
      }
      
      console.log(`User Watchlist API: Found ${companies?.length || 0} companies matching the saved IDs`);
      
      // Combine the data
      const watchlistData = savedCompanies.map(saved => {
        const company = companies?.find(c => c.id === saved.company_id);
        if (!company) {
          console.log(`User Watchlist API: No company found for ID ${saved.company_id}`);
        }
        return {
          id: saved.id,
          company_id: saved.company_id,
          companies: company || null
        };
      });
      
      const endTime = Date.now();
      console.log(`User Watchlist API: Request completed successfully in ${endTime - startTime}ms with ${watchlistData.length} items`);
      
      // Return data with cache headers
      const response = NextResponse.json(watchlistData);
      response.headers.set('Cache-Control', 'private, max-age=60'); // Cache for 1 minute
      return response;
    } catch (innerError) {
      console.error('User Watchlist API: Unexpected error fetching company details:', innerError);
      // Return empty array on error with cache headers
      const response = NextResponse.json([], { status: 200 });
      response.headers.set('Cache-Control', 'private, max-age=30'); // Cache for 30 seconds
      return response;
    }
    
  } catch (error) {
    const endTime = Date.now();
    console.error(`Error in user watchlist API (completed in ${endTime - startTime}ms):`, error);
    // Return empty array on error with cache headers
    const response = NextResponse.json([], { status: 200 });
    response.headers.set('Cache-Control', 'private, max-age=30'); // Cache for 30 seconds
    return response;
  }
}

// POST - add a company to watchlist
export async function POST(request: NextRequest) {
  try {
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
    
    // Get the company ID from the request body
    const body = await request.json();
    const companyId = body.company_id;
    
    if (!companyId) {
      console.error('User Watchlist API: Company ID is missing from request');
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }
    
    console.log(`User Watchlist API: Adding company ${companyId} to watchlist for user ${user.id}`);
    
    // Check if the company is already in the user's watchlist
    const { data: existingSave, error: checkError } = await supabase
      .from('company_saves')
      .select('id')
      .eq('company_id', companyId)
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (checkError) {
      console.error('User Watchlist API: Error checking existing save:', checkError);
      throw checkError;
    }
    
    // If already saved, return success
    if (existingSave) {
      console.log('User Watchlist API: Company already in watchlist, ID:', existingSave.id);
      return NextResponse.json(
        { success: true, message: 'Company already in watchlist' }
      );
    }
    
    // Check if the company exists
    const { data: companyExists, error: companyCheckError } = await supabase
      .from('companies')
      .select('id')
      .eq('id', companyId)
      .maybeSingle();
    
    if (companyCheckError) {
      console.error('User Watchlist API: Error checking if company exists:', companyCheckError);
      throw companyCheckError;
    }
    
    if (!companyExists) {
      console.error(`User Watchlist API: Company with ID ${companyId} does not exist`);
      return NextResponse.json(
        { error: 'Company does not exist' },
        { status: 404 }
      );
    }
    
    // Add the company to the user's watchlist
    const { data, error } = await supabase
      .from('company_saves')
      .insert([
        {
          company_id: companyId,
          user_id: user.id
        }
      ])
      .select();
    
    if (error) {
      console.error('User Watchlist API: Error adding company to watchlist:', error);
      throw error;
    }
    
    console.log('User Watchlist API: Company successfully added to watchlist');
    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    console.error('Error in user watchlist API (POST):', error);
    return NextResponse.json(
      { error: 'Failed to add company to watchlist' },
      { status: 500 }
    );
  }
} 
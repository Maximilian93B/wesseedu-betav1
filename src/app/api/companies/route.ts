import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'
import authConfig from '@/config/auth.config'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    let supabase;
    
    // This endpoint can work with or without authentication
    // First try with authentication
    const auth = await checkAuth();
    
    if (auth.error && process.env.NODE_ENV === 'development') {
      // If auth failed but we're in development, create a non-auth client
      console.log('Development mode: Proceeding without authentication for companies endpoint');
      supabase = createRouteHandlerClient({ cookies });
      
      // Return mock data in development
      return NextResponse.json({
        data: [
          {
            id: 'dev-company-1',
            name: 'EcoTech Solutions',
            description: 'Developing sustainable technology solutions',
            mission_statement: 'Creating a greener future through innovation',
            score: 85,
            image_url: 'https://placehold.co/100',
            community_members: 120,
            sustainability_data: { primary_category: 'Clean Energy' }
          },
          {
            id: 'dev-company-2',
            name: 'GreenGrow Farms',
            description: 'Sustainable agricultural practices',
            mission_statement: 'Growing food in harmony with nature',
            score: 78,
            image_url: 'https://placehold.co/100',
            community_members: 94,
            sustainability_data: { primary_category: 'Sustainable Agriculture' }
          }
        ],
        error: null,
        status: 200
      });
    } else if (auth.error) {
      // In production, authentication is always required
      return auth.error;
    }

    // Use the authenticated supabase client
    supabase = auth.supabase;
    
    console.log('Fetching companies from database');
    
    // Get search parameter if it exists
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    // Fetch all companies with more fields
    let query = supabase
      .from('companies')
      .select('id, name, description, mission_statement, score, image_url, community_members, sustainability_data');
    
    // Add search functionality if search term is provided
    if (search) {
      console.log(`Searching for companies matching: ${search}`);
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,mission_statement.ilike.%${search}%`);
    }
    
    // Order by score descending
    query = query.order('score', { ascending: false });
    
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No companies found in database');
      return NextResponse.json({ data: [] });
    }

    console.log(`Successfully fetched ${data.length} companies`);
    
    // Return the data with the same structure as communities
    return NextResponse.json({
      data: data,
      error: null,
      status: 200
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch companies', status: 500 },
      { status: 500 }
    );
  }
}
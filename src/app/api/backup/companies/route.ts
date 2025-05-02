import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/utils/cookieManager';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  console.log("API: /api/protected/companies - Request received");
  
  try {
    // Log all request headers for debugging
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log("API: Request headers:", headers);
    
    // Check cookies directly
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    console.log("API: All cookies:", allCookies.map(c => c.name));
    
    // Create Supabase client
    const supabase = await createClient(req);
    console.log("API: Supabase client created");
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    console.log("API: Session check result:", session ? "Session found" : "No session found");
    
    if (!session) {
      console.log("API: Unauthorized - No session");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("API: User authenticated, fetching companies");
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, description, mission_statement, financials, pitch_deck_url, sustainability_data, score, community_members')
      .order('name', { ascending: true });

    if (error) {
      console.error("API: Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`API: Successfully fetched ${data?.length || 0} companies`);
    return NextResponse.json({ companies: data });
  } catch (error) {
    console.error('API: Error fetching companies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
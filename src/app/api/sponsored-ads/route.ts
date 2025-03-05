import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase/supabaseClient';

export interface SponsoredAd {
  id: string;
  name: string;
  logo: string;
  description: string;
  impact_score: number;
  cta: string;
  url: string;
  company_id: string;
  active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export async function GET() {
  try {
    // Query the sponsored_ads table
    const { data, error } = await supabaseClient
      .from('sponsored_ads')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false });

    if (error) {
      console.error('Error fetching sponsored ads:', error);
      return NextResponse.json(
        { error: 'Failed to fetch sponsored ads' },
        { status: 500 }
      );
    }

    // Map database field names to match the SponsoredAd interface if needed
    // For example, if your database uses 'impact_score' but your interface expects 'impactScore'
    const formattedData = data.map((ad: any) => ({
      id: ad.id,
      name: ad.name,
      logo: ad.logo,
      description: ad.description,
      impact_score: ad.impact_score,
      cta: ad.cta,
      url: ad.url,
      company_id: ad.company_id,
      active: ad.active,
      priority: ad.priority,
      created_at: ad.created_at,
      updated_at: ad.updated_at
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 
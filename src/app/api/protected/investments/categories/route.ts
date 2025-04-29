import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/utils/cookieManager';
import { checkAuth } from '@/lib/utils/authCheck';

// Add this line to prevent static optimization
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const auth = await checkAuth();
    if (auth.error) {
      return auth.error;
    }
    
    // Only use mock data if auth is not enabled (respects ENABLE_AUTH_IN_DEV setting)
    if (process.env.NODE_ENV === 'development' && !auth.authenticated) {
      console.log('Development mode: Returning mock investment categories');
      return NextResponse.json({
        data: [
          { category: 'Green Energy', amount: 5000 },
          { category: 'Sustainable Agriculture', amount: 3000 },
          { category: 'Clean Water', amount: 2000 },
          { category: 'Education', amount: 1500 },
          { category: 'Healthcare', amount: 1000 }
        ],
        error: null,
        status: 200
      });
    }
    
    const supabase = await createClient(req);
    
    // In production, query the database
    const { data, error } = await supabase
      .from('investments')
      .select(`
        companies (
          sustainability_data
        ),
        amount
      `)
      .eq('user_id', auth.session.user.id);

    if (error) {
      return NextResponse.json({ 
        data: null, 
        error: error.message, 
        status: 500 
      }, { status: 500 });
    }

    // Process data to get categories
    const categories = data.reduce((acc, investment) => {
      const category = investment.companies?.sustainability_data?.primary_category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + investment.amount;
      return acc;
    }, {});

    const formattedCategories = Object.entries(categories).map(([category, amount]) => ({
      category,
      amount
    }));

    return NextResponse.json({
      data: formattedCategories,
      error: null,
      status: 200
    });
  } catch (error) {
    console.error('Error fetching investment categories:', error);
    return NextResponse.json({ 
      data: null,
      error: 'Internal Server Error', 
      status: 500 
    }, { status: 500 });
  }
} 
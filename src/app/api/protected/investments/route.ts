import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/utils/cookieManager';
import { checkAuth } from '@/lib/utils/authCheck';
import authConfig from '@/config/auth.config';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Use the improved checkAuth function
    const auth = await checkAuth();
    
    // Handle mock data for development mode
    if (process.env.NODE_ENV === 'development' && (!authConfig.isAuthEnabled || auth.error)) {
      console.log('Development mode: Returning mock investments data');
      return NextResponse.json({ 
        data: [
          {
            id: 'dev-investment-1',
            amount: 5000,
            investment_date: '2023-10-15T08:00:00Z',
            notes: 'Initial investment in green energy',
            companies: {
              id: 'dev-company-1',
              name: 'EcoTech Solutions'
            }
          },
          {
            id: 'dev-investment-2',
            amount: 3000,
            investment_date: '2023-11-01T10:30:00Z',
            notes: 'Supporting sustainable agriculture',
            companies: {
              id: 'dev-company-2',
              name: 'GreenGrow Farms'
            }
          },
          {
            id: 'dev-investment-3',
            amount: 2000,
            investment_date: '2023-12-05T14:15:00Z',
            notes: 'Clean water initiative funding',
            companies: {
              id: 'dev-company-3',
              name: 'AquaPure Technologies'
            }
          }
        ],
        error: null,
        status: 200
      });
    }
    
    // Return error if authentication failed
    if (auth.error) {
      return auth.error;
    }
    
    const supabase = await createClient(req);
    
    const { data, error } = await supabase
      .from('investments')
      .select(`
        id,
        amount,
        investment_date,
        notes,
        companies(id, name)
      `)
      .eq('user_id', auth.session.user.id);

    if (error) {
      return NextResponse.json({ 
        data: null,
        error: error.message,
        status: 500
      }, { status: 500 });
    }

    return NextResponse.json({ 
      data,
      error: null,
      status: 200
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json({ 
      data: null,
      error: 'Internal Server Error',
      status: 500
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await checkAuth();
    if (auth.error) {
      return auth.error;
    }
    
    const supabase = await createClient(req);

    const { company_id, amount, notes } = await req.json();

    if (!company_id || !amount) {
      return NextResponse.json({ 
        data: null,
        error: 'Company ID and amount are required',
        status: 400
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('investments')
      .insert({
        user_id: auth.session.user.id,
        company_id,
        amount,
        notes,
        investment_date: new Date().toISOString(),
      })
      .select();

    if (error) {
      return NextResponse.json({ 
        data: null,
        error: error.message,
        status: 500
      }, { status: 500 });
    }

    return NextResponse.json({ 
      data: data[0],
      error: null,
      status: 201
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json({ 
      data: null,
      error: 'Internal Server Error',
      status: 500
    }, { status: 500 });
  }
}
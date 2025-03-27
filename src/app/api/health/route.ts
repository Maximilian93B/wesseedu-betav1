import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Simple health check endpoint
    return NextResponse.json({
      success: true,
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        status: 'error',
        message: 'Health check failed' 
      },
      { status: 500 }
    );
  }
} 
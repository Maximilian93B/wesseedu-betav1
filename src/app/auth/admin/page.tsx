import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import React from 'react'

// Mark the route as dynamic
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Await the cookies function
  const cookieStore = await cookies()
  const authToken = cookieStore.get('sb-chmxtnkizaqznbhgpbhl-auth-token')?.value

  // Initialize Supabase client with the auth token
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    }
  )

  // Fetch dashboard stats
  const { data: stats, error } = await supabase
    .from('dashboard_stats')
    .select('*')

  if (error) {
    console.error('Error fetching stats:', error)
    return <div>Error loading stats</div>
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Render your dashboard stats here */}
    </div>
  )
}
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function AdminApplications() {
  const cookieStore = await cookies()
  const supabase = createServerComponentClient({ cookies: async () => cookieStore })

  const { data: applications, error } = await supabase
    .from('companies')
    .select('*')
    .eq('application_status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
    return <div>Error loading applications</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pending Applications</h1>
      {/* Render applications here */}
    </div>
  )
} 
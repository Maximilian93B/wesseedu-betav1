import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function AdminCompanies() {
  const cookieStore = await cookies()
  const supabase = createServerComponentClient({ cookies: async () => cookieStore })

  const { data: companies, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching companies:', error)
    return <div>Error loading companies</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Companies Management</h1>
      </div>
      {/* Render companies here */}
    </div>
  )
} 
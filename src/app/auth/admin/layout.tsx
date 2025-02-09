import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { redirect } from 'next/navigation'
import { SupabaseClient } from '@supabase/supabase-js'
// Mark the route as dynamic
export const dynamic = 'force-dynamic'

// Add this helper function to check admin status
const isAdmin = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase.rpc('is_admin', { user_id: userId });
  if (error) throw error;
  return !!data;
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  })

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/auth/login?returnUrl=/admin')
  }

  // Modify the admin check:
  const isUserAdmin = await isAdmin(supabase, session.user.id);
  if (!isUserAdmin) {
    redirect('/unauthorized');
  }

  const { data: userData } = await supabase
    .from('users')
    .select('user_type')
    .eq('id', session.user.id)
    .single()

  if (userData?.user_type !== 'admin') {
    redirect('/unauthorized')
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}

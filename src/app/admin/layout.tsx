// app/admin/layout.tsx
'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();

  // In a real-world app, you might check user metadata or a separate API call.
  useEffect(() => {
    if (!user || user.user_metadata.user_type !== 'admin') {
      router.push('/unauthorized');
    }
  }, [user, router]);

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
    </div>
  );
}

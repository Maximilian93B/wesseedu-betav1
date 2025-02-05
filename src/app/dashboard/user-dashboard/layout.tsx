import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Building2,
  Heart,
  Bell,
  Settings,
  LogOut,
  User
} from "lucide-react";
import { redirect } from 'next/navigation';
import authConfig from '../../../../config/auth.config'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip auth check in development when auth is disabled
  if (!authConfig.isAuthEnabled) {
    return <>{children}</>
  }

  try {
    const supabase = createServerComponentClient({ 
      cookies 
    })
    
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      redirect('/auth/signin')
    }

    const { data: user } = await supabase
      .from('users')
      .select('user_type, first_name')
      .eq('id', session.user.id)
      .single()

    const userType = user?.user_type
    
    if (!userType) {
      redirect('/auth/signin')
    }

    const navigationItems = [
      {
        href: "/user-dashboard",
        icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        label: "Overview",
        show: true
      },
      {
        href: "/user-dashboard/profile",
        icon: <User className="mr-2 h-4 w-4" />,
        label: "Profile",
        show: true
      },
      {
        href: "/user-dashboard/companies",
        icon: <Building2 className="mr-2 h-4 w-4" />,
        label: "Companies",
        show: userType === 'investor'
      },
      {
        href: "/user-dashboard/favorites",
        icon: <Heart className="mr-2 h-4 w-4" />,
        label: "Favorites",
        show: userType === 'investor'
      },
      {
        href: "/user-dashboard/notifications",
        icon: <Bell className="mr-2 h-4 w-4" />,
        label: "Notifications",
        show: true
      },
      {
        href: "/user-dashboard/settings",
        icon: <Settings className="mr-2 h-4 w-4" />,
        label: "Settings",
        show: true
      }
    ];

    return (
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
          <div className="flex h-full flex-col px-3 py-4">
            <div className="mb-6 px-4">
              <h1 className="text-xl font-bold">WeSeedU</h1>
              <p className="text-sm text-muted-foreground">
                User Dashboard
              </p>
            </div>

            <nav className="flex-1 space-y-2">
              {navigationItems.map((item) => 
                item.show && (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost" className="w-full justify-start">
                      {item.icon}
                      {item.label}
                    </Button>
                  </Link>
                )
              )}
            </nav>

            <div className="border-t pt-4">
              <form action="/auth/signout" method="post">
                <Button variant="ghost" className="w-full justify-start text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="pl-64">
          {/* Top header */}
          <header className="sticky top-0 z-30 border-b bg-background">
            <div className="flex h-16 items-center px-6">
              <h2 className="text-lg font-semibold">
                {user?.first_name ? `Welcome, ${user.first_name}` : 'Dashboard'}
              </h2>
              <div className="ml-auto flex items-center space-x-4">
                {/* We'll add profile menu and notifications here later */}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="min-h-[calc(100vh-4rem)] p-6">
            {children}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Layout Error:', error)
    redirect('/auth/signin')
  }
}

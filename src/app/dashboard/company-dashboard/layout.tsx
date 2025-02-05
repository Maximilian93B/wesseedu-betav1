import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  ChartBar,
  Bell,
  Settings,
  LogOut,
  CheckCircle2,
  Clock
} from "lucide-react";
import authConfig from '../../../../config/auth.config'
import { redirect } from 'next/navigation'
2

export default async function CompanyDashboardLayout({
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

    const { data: companyData } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', session?.user?.id)
      .single()

    const verificationStatus = companyData?.verification_status || 'pending';

    const navigationItems = [
      {
        href: "/company-dashboard",
        icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        label: "Overview",
        show: true
      },
      {
        href: "/company-dashboard/profile",
        icon: <ClipboardList className="mr-2 h-4 w-4" />,
        label: "Company Profile",
        show: true
      },
      {
        href: "/company-dashboard/documents",
        icon: <FileText className="mr-2 h-4 w-4" />,
        label: "Documents",
        show: true
      },
      {
        href: "/company-dashboard/metrics",
        icon: <ChartBar className="mr-2 h-4 w-4" />,
        label: "ESG Metrics",
        show: verificationStatus === 'verified'
      },
      {
        href: "/company-dashboard/notifications",
        icon: <Bell className="mr-2 h-4 w-4" />,
        label: "Notifications",
        show: true
      },
      {
        href: "/company-dashboard/settings",
        icon: <Settings className="mr-2 h-4 w-4" />,
        label: "Settings",
        show: true
      }
    ];

    return (
      <div className="min-h-screen bg-background">
        {/* Verification Status Banner */}
        {verificationStatus !== 'verified' && (
          <div className={`w-full p-2 text-center text-sm ${
            verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {verificationStatus === 'pending' ? (
              <div className="flex items-center justify-center">
                <Clock className="mr-2 h-4 w-4" />
                Your company profile is pending verification by WeSeedU
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Complete your profile to submit for verification
              </div>
            )}
          </div>
        )}

        {/* Rest of layout similar to user dashboard */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
          <div className="flex h-full flex-col px-3 py-4">
            <div className="mb-6 px-4">
              <h1 className="text-xl font-bold">WeSeedU</h1>
              <p className="text-sm text-muted-foreground">
                Company Portal
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
        <div className={`pl-64 ${verificationStatus !== 'verified' ? 'pt-10' : ''}`}>
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

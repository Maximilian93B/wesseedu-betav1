import type React from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Building2, Heart, Bell, Settings, User, Menu } from "lucide-react"
import { redirect } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const dynamic = "force-dynamic"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("user_type, name").eq("id", session.user.id).single()

  const userType = profile?.user_type

  const navigationItems = [
    {
      href: "/auth/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      label: "Overview",
      show: true,
    },
    {
      href: "/auth/dashboard/profile",
      icon: <User className="mr-2 h-4 w-4" />,
      label: "Profile",
      show: true,
    },
    {
      href: "/companies",
      icon: <Building2 className="mr-2 h-4 w-4" />,
      label: "Companies",
      show: userType === "investor",
    },
    {
      href: "/auth/dashboard/saved",
      icon: <Heart className="mr-2 h-4 w-4" />,
      label: "Saved Companies",
      show: userType === "investor",
    },
    {
      href: "/auth/dashboard/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
      label: "Notifications",
      show: true,
    },
    {
      href: "/auth/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: "Settings",
      show: true,
    },
  ]

  const Sidebar = () => (
    <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 z-[80] bg-white border-r border-gray-200">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src="/logo.svg" alt="WeSeedU" />
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigationItems.map(
              (item) =>
                item.show && (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  </Link>
                ),
            )}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">{profile?.name}</p>
              <p className="text-xs text-gray-500">{session.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}


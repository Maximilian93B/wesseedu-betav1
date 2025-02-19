"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart, Users, Building2, Settings, LogOut, Zap } from "lucide-react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

const routes = [
  {
    label: 'Overview',
    icon: BarChart,
    href: '/auth/dashboard',
  },
  {
    label: 'Companies',
    icon: Building2,
    href: '/companies',
  },
  {
    label: 'Community',
    icon: Users,
    href: '/auth/dashboard/community',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/auth/dashboard/settings',
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Logo Section */}
      <div className="px-6 py-4">
        <div className="flex items-center">
          <Zap className="w-8 h-8 text-teal-500" />
          <span className="ml-2 text-xl font-bold">WeSeedU</span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === route.href 
                ? "bg-white/10 text-black hover:bg-white/20" 
                : "text-gray-400 hover:text-black hover:bg-white/10"
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Sign Out Section */}
      <div className="border-t border-white/10 p-4">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
} 
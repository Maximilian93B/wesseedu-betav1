"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart, Users, Building2, LogOut, Zap, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

const routes = [
  {
    label: "Overview",
    icon: BarChart,
    href: "/auth/dashboard",
  },
  {
    label: "Companies",
    icon: Building2,
    href: "/companies",
  },
  {
    label: "Communities",
    icon: Users,
    href: "/communities",
  },
  {
    label: "Community",
    icon: Users,
    href: "/auth/dashboard/community",
  },
  {
    label: "Profile",
    icon: User,
    href: "/auth/dashboard/profile",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Logo Section */}
      <div className="px-6 py-8">
        <div className="flex items-center">
          <Zap className="w-8 h-8 text-emerald-400" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 text-transparent bg-clip-text">
            WeSeedU
          </span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 px-4 py-6 space-y-4">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-lg",
              pathname === route.href 
                ? "bg-emerald-950/50 text-emerald-400 border border-emerald-500/20" 
                : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-950/30"
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className={cn(
                "mr-3 h-5 w-5",
                pathname === route.href 
                  ? "text-emerald-400" 
                  : "text-gray-400 group-hover:text-emerald-400"
              )} />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Sign Out Section */}
      <div className="border-t border-emerald-500/20 p-4">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-emerald-400 hover:bg-emerald-950/30"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}


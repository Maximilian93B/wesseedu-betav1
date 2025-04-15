"use client"

import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { usePathname } from "next/navigation"

export function DashboardNav() {
  const { signOut } = useAuth()
  const pathname = usePathname()

  // Define the navigation items
  const navItems = [
    { href: "/dashboard/home", label: "Home" },
    { href: "/dashboard/overview", label: "Dashboard" },
    { href: "/dashboard/companies", label: "Companies" },
    { href: "/dashboard/communities", label: "Communities" },
    { href: "/dashboard/saved", label: "Saved" },
  ]

  // Check if current path is active
  const isActive = (path: string) => {
    // Handle special cases like company details
    if (path === "/dashboard/companies" && pathname.startsWith("/dashboard/companies/")) {
      return true
    }
    
    // Handle special cases like community details
    if (path === "/dashboard/communities" && pathname.startsWith("/dashboard/communities/")) {
      return true
    }
    
    // Handle root dashboard path
    if (path === "/dashboard/home" && pathname === "/dashboard") {
      return true
    }
    
    return pathname === path
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 lg:px-8 h-16 flex items-center border-b border-slate-200 
        bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] sticky top-0 z-50"
    >
      <div className="w-full max-w-[2000px] mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link className="flex items-center justify-center group" href="/dashboard/home">
            <div className="relative">
              <div className="absolute -inset-1 bg-slate-100 blur-sm rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <Leaf className="relative h-6 w-6 text-slate-600 group-hover:text-slate-800 transition-colors duration-300" />
            </div>
            <span className="ml-2 text-lg font-bold text-slate-800">
              WeSeedU
            </span>
          </Link>
        </div>

        <nav className="flex-grow flex justify-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-all duration-300 px-3 py-2 ${
                isActive(item.href)
                  ? 'text-slate-800' 
                  : 'text-slate-600 hover:text-slate-700'
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            onClick={signOut}
            className="text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all duration-300"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </motion.header>
  )
} 
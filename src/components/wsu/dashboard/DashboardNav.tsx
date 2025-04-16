"use client"

import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useNavigation } from "@/context/NavigationContext"

export function DashboardNav() {
  const { signOut } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { setIsTransitioning } = useNavigation()

  // Define the navigation items
  const navItems = [
    { href: "/dashboard/home", label: "Home" },
    { href: "/dashboard/overview", label: "Dashboard" },
    { href: "/dashboard/companies", label: "Companies" },
    { href: "/dashboard/communities", label: "Communities" },
    { href: "/dashboard/saved", label: "Saved" },
  ]
  
  // Handle navigation with transition state
  const handleNavigation = (href: string) => {
    if (href !== pathname) {
      setIsTransitioning(true)
      router.push(href)
    }
  }
  
  // Handle sign out with redirect
  const handleSignOut = async () => {
    // Set a timeout to prevent indefinite loading state
    const timeoutId = setTimeout(() => {
      console.log("Sign out timeout - resetting state")
      setIsSigningOut(false)
    }, 5000) // 5 second maximum timeout
    
    try {
      setIsSigningOut(true)
      console.log("Sign out button clicked, attempting to sign out...")
      
      if (typeof signOut !== 'function') {
        console.error("signOut is not a function", signOut)
        throw new Error("Unable to sign out: signOut is not available")
      }
      
      try {
        await signOut()
        console.log("Sign out completed successfully")
      } catch (contextError) {
        console.error("Error with context signOut, trying direct Supabase auth:", contextError)
        
        // Fallback to direct Supabase auth
        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signOut()
        
        if (error) {
          console.error("Supabase signOut error:", error)
          throw error
        } else {
          console.log("Supabase signOut successful (API response)")
          // Force navigation and refresh after signout
          window.location.href = '/'
        }
      }
    } catch (error) {
      console.error("Error during sign out:", error)
      
      // Force reset UI state on error
      setIsSigningOut(false)
      
      // Force navigation as last resort
      window.location.href = '/'
    } finally {
      clearTimeout(timeoutId)
      setIsSigningOut(false)
    }
  }

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
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
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
            </button>
          ))}
        </nav>

        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all duration-300"
          >
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </Button>
        </div>
      </div>
    </motion.header>
  )
} 
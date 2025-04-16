"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface NavigationContextType {
  visitedRoutes: string[]
  isFirstVisit: (route: string) => boolean
  markRouteVisited: (route: string) => void
  isTransitioning: boolean
  setIsTransitioning: (value: boolean) => void
}

const NavigationContext = createContext<NavigationContextType>({
  visitedRoutes: [],
  isFirstVisit: () => true,
  markRouteVisited: () => {},
  isTransitioning: false,
  setIsTransitioning: () => {}
})

export const useNavigation = () => useContext(NavigationContext)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [visitedRoutes, setVisitedRoutes] = useState<string[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  
  // Track route changes
  useEffect(() => {
    // Whenever the path changes, mark it as visited
    if (pathname && !visitedRoutes.includes(pathname)) {
      setVisitedRoutes(prev => [...prev, pathname])
    }
  }, [pathname, visitedRoutes])
  
  // Check if this is the first visit to a route
  const isFirstVisit = (route: string): boolean => {
    // Special case for dashboard root to avoid double loading
    if (route === '/dashboard' && visitedRoutes.includes('/dashboard/home')) {
      return false
    }
    // For dashboard sections, check base route
    if (route.startsWith('/dashboard/')) {
      const baseRoute = route.split('/').slice(0, 3).join('/')
      return !visitedRoutes.some(r => r.startsWith(baseRoute))
    }
    return !visitedRoutes.includes(route)
  }
  
  // Manually mark a route as visited
  const markRouteVisited = (route: string) => {
    if (!visitedRoutes.includes(route)) {
      setVisitedRoutes(prev => [...prev, route])
    }
  }
  
  return (
    <NavigationContext.Provider 
      value={{ 
        visitedRoutes, 
        isFirstVisit, 
        markRouteVisited,
        isTransitioning,
        setIsTransitioning
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
} 
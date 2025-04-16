"use client"

import { ReactNode, useEffect, useState, useRef } from "react"
import { DashboardNav } from "@/components/wsu/dashboard/DashboardNav"
import Head from "next/head"
import { useAuth } from "@/context/AuthContext"
import { LoadingScreen } from "@/components/wsu/home"
import { useToast } from "@/hooks/use-toast"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const [localLoading, setLocalLoading] = useState(true)
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
  // Add a timeout to ensure we don't get stuck in loading state
  useEffect(() => {
    // Flag to track component mount state for preventing memory leaks
    let isMounted = true;
    
    // If auth loading is already complete, update local loading state immediately
    if (!loading && isMounted) {
      setLocalLoading(false);
    }
    
    // Set a timeout to force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (isMounted && localLoading) {
        setLocalLoading(false);
        
        // Only show toast if we actually had to force the loading state change
        // and we haven't shown it yet
        if (loading && !hasShownTimeoutToastRef.current) {
          hasShownTimeoutToastRef.current = true;
          toast({
            title: "Loading timeout",
            description: "Dashboard may be partially loaded. Please refresh if needed.",
            variant: "default"
          });
        }
      }
    }, 5000);

    // Cleanup function to prevent memory leaks and cancel timeout
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [loading, localLoading, toast]);
  
  // Show loading during auth check
  if (localLoading) {
    return <LoadingScreen />
  }
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div 
        className="min-h-screen" 
        style={{ 
          background: 'linear-gradient(115deg, #70f570, #49c628)',
          backgroundAttachment: 'fixed'
        }}
      >
        <DashboardNav />
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </div>
    </>
  )
} 
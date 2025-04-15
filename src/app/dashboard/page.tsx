"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"
import Head from "next/head"

function DashboardContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  // Redirect to dashboard/home after authentication check
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard/home')
    }
  }, [user, loading, router])
  
  // Show loading state
  if (loading) {
    return <LoadingScreen />
  }

  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }

  // This will briefly show while redirecting
  return <LoadingScreen />
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <DashboardContent />
    </AuthProvider>
  )
} 
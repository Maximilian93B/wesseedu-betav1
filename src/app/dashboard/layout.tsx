"use client"

import { ReactNode } from "react"
import { AuthProvider } from "@/context/AuthContext"
import { DashboardNav } from "@/components/wsu/dashboard/DashboardNav"
import Head from "next/head"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
} 
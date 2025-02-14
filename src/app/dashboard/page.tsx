"use client"

import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabaseClient } from "@/lib/supabase/supabaseClient"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, TrendingUp, Leaf } from "lucide-react"
import type React from "react" // Added import for React

export const dynamic = "force-dynamic"

interface DashboardStat {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

export default function DashboardPage() {
  const user = useUser()
  const router = useRouter()
  const supabase = supabaseClient
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [savedCompanies, setSavedCompanies] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else {
      fetchDashboardStats()
      fetchSavedCompanies()
    }
  }, [user, router])

  const fetchDashboardStats = async () => {
    // This is a placeholder. In a real application, you would fetch this data from your API
    setStats([
      {
        title: "Total Investments",
        value: "$1,234,567",
        description: "7% increase from last month",
        icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Sustainable Companies",
        value: "42",
        description: "Across various sectors",
        icon: <Leaf className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Impact Score",
        value: "8.7/10",
        description: "Based on ESG criteria",
        icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Community Members",
        value: "10,492",
        description: "Active investors",
        icon: <Users className="h-4 w-4 text-muted-foreground" />,
      },
    ])
  }

  const fetchSavedCompanies = async () => {
    try {
      const response = await fetch('/api/companies/savedCompanies')
      const data = await response.json()
      if (data.success) {
        setSavedCompanies(data.savedCompanies)
      }
    } catch (error) {
      console.error('Error fetching saved companies:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.email}. Here's an overview of your sustainable investments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Investment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for a chart or detailed breakdown */}
            <div className="h-[200px] flex items-center justify-center bg-muted">Investment Chart Placeholder</div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your saved companies</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/saved')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {savedCompanies.length === 0 ? (
              <p className="text-sm text-muted-foreground">No saved companies yet</p>
            ) : (
              <ul className="space-y-2">
                {savedCompanies.slice(0, 3).map((saved) => (
                  <li key={saved.id} className="flex items-center justify-between">
                    <span className="text-sm">{saved.companies.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/companies/${saved.companies.id}`)}
                    >
                      View
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button onClick={() => router.push("/companies")}>Explore Companies</Button>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}


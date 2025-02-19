"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, TrendingUp, Leaf } from "lucide-react"
import { NewsSection } from "@/components/wsu/dashboard/NewsSection"

export const dynamic = "force-dynamic"

interface DashboardStat {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [savedCompanies, setSavedCompanies] = useState<any[]>([])

  useEffect(() => {
    const getAuthUser = async () => {
      const { data: { user: authUser }, error } = await supabase.auth.getUser()
      if (error || !authUser) {
        router.push("/auth/login")
        return
      }
      setUser(authUser)
    }

    getAuthUser()
  }, [supabase.auth, router])

  useEffect(() => {
    if (user) {
      fetchDashboardStats()
      fetchSavedCompanies()
    }
  }, [user])

  const fetchDashboardStats = async () => {
    try {
      // Get user profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(`
          total_investments,
          previous_month_investments,
          impact_score
        `)
        .eq("id", user?.id)
        .single()

      if (profileError) throw profileError

      // Get total number of companies
      const { count: companiesCount, error: companiesError } = await supabase
        .from("companies")
        .select("*", { count: "exact" })

      if (companiesError) throw companiesError

      // Get total number of users
      const { count: usersCount, error: usersError } = await supabase
        .from("profiles")
        .select("*", { count: "exact" })

      if (usersError) throw usersError

      // Calculate percentage change in investments
      const percentageChange = profileData.previous_month_investments 
        ? ((profileData.total_investments - profileData.previous_month_investments) / profileData.previous_month_investments * 100).toFixed(1)
        : 0

      setStats([
        {
          title: "Total Investments",
          value: `$${profileData.total_investments.toLocaleString()}`,
          description: `${percentageChange}% change from last month`,
          icon: <BarChart className="h-4 w-4 text-blue-600" />,
        },
        {
          title: "Sustainable Companies",
          value: companiesCount?.toString() || "0",
          description: "Across various sectors",
          icon: <Leaf className="h-4 w-4 text-green-600" />,
        },
        {
          title: "Impact Score", 
          value: `${profileData.impact_score}/10`,
          description: "Based on ESG criteria",
          icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
        },
        {
          title: "Community Members",
          value: usersCount?.toString() || "0",
          description: "Active investors",
          icon: <Users className="h-4 w-4 text-green-600" />,
        },
      ])
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    }
  }

  const fetchSavedCompanies = async () => {
    try {
      const { data, error } = await supabase.from("company_saves").select("*, companies(*)").limit(3)
      if (error) throw error
      setSavedCompanies(data)
    } catch (error) {
      console.error("Error fetching saved companies:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-gray-600">
          Welcome back, {user?.email}. Here's an overview of your sustainable investments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Investment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-100 text-gray-500">
              Investment Chart Placeholder
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Recent Activities</CardTitle>
              <CardDescription className="text-gray-500">Your saved companies</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard/saved")}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {savedCompanies.length === 0 ? (
              <p className="text-sm text-gray-500">No saved companies yet</p>
            ) : (
              <ul className="space-y-2">
                {savedCompanies.map((saved) => (
                  <li key={saved.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{saved.companies.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/companies/${saved.companies.id}`)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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

      <NewsSection />

      <div className="flex justify-between">
        <Button onClick={() => router.push("/companies")} className="bg-blue-600 text-white hover:bg-blue-700">
          Explore Companies
        </Button>
        <Button
          variant="outline"
          onClick={() => supabase.auth.signOut()}
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}


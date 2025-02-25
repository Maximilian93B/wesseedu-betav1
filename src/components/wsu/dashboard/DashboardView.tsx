"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, TrendingUp, Leaf, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export const dynamic = "force-dynamic"

interface DashboardStat {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: string
}

interface InvestmentData {
  month: string
  amount: number
}

const sampleInvestmentData: InvestmentData[] = [
  { month: "Jan", amount: 1000 },
  { month: "Feb", amount: 2200 },
  { month: "Mar", amount: 1800 },
  { month: "Apr", amount: 2400 },
  { month: "May", amount: 3200 },
  { month: "Jun", amount: 2800 },
  { month: "Jul", amount: 3600 },
]

interface DashboardViewProps {
  user: any  // You can make this more specific based on your user type
}

export function DashboardView({ user }: DashboardViewProps) {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [savedCompanies, setSavedCompanies] = useState<any[]>([])

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
            icon: <BarChart className="h-6 w-6" />,
            color: "from-green-400 to-blue-500",
          },
          {
            title: "Sustainable Companies",
            value: companiesCount?.toString() || "0",
            description: "Across various sectors",
            icon: <Leaf className="h-6 w-6" />,
            color: "from-green-500 to-emerald-600",
          },
          {
            title: "Impact Score",
            value: `${profileData.impact_score}/10`,
            description: "Based on ESG criteria",
            icon: <Globe className="h-6 w-6" />,
            color: "from-blue-400 to-indigo-600",
          },
          {
            title: "Community Members",
            value: usersCount?.toString() || "0",
            description: "Active investors",
            icon: <Users className="h-6 w-6" />,
            color: "from-purple-400 to-pink-500",
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
    <div className="space-y-8 bg-black text-white min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Welcome Back, {user?.email}</h2>
        <p className="text-gray-400">Here's an overview of your sustainable investments and impact.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium text-white">{stat.title}</CardTitle>
                <div className="text-emerald-400">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Investment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sampleInvestmentData}>
                <defs>
                  <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(value: number) => [`$${value}`, 'Investment']}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#investmentGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-white">Recent Activities</CardTitle>
              <p className="text-sm text-gray-400">Your saved companies</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard/saved")}
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {savedCompanies.length === 0 ? (
              <p className="text-sm text-gray-400">No saved companies yet</p>
            ) : (
              <ul className="space-y-4">
                {savedCompanies.map((saved) => (
                  <li key={saved.id} className="flex items-center justify-between bg-black/50 border border-emerald-500/20 p-3 rounded-lg">
                    <span className="text-sm text-white">{saved.companies.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/companies/${saved.companies.id}`)}
                      className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50"
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
        <Button
          onClick={() => router.push("/companies")}
          className="bg-emerald-500 text-white hover:bg-emerald-400 transition-colors duration-200"
        >
          Explore Sustainable Companies
        </Button>

      </div>
    </div>
  )
}


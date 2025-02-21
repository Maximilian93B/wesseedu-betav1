"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, TrendingUp, Users, BarChart, Search, Bookmark } from "lucide-react"
import Link from "next/link"
import { NewsSection } from "@/components/wsu/dashboard/NewsSection"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function HomePage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const supabaseClient = useSupabaseClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any[]>([])

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkUser()
  }, [supabase.auth])

  useEffect(() => {
    if (user) {
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    try {
      const { data: profileData, error } = await supabaseClient
        .from("profiles")
        .select(`
          total_investments,
          impact_score
        `)
        .eq("id", user?.id)
        .single()

      if (error) throw error

      setStats([
        {
          title: "Your Investment",
          value: `$${profileData.total_investments.toLocaleString()}`,
          icon: <TrendingUp className="h-10 w-10 text-green-600" />,
        },
        {
          title: "Impact Score",
          value: `${profileData.impact_score}/10`,
          icon: <BarChart className="h-10 w-10 text-blue-600" />,
        },
      ])
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh() // Force a router refresh to update the session state
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">Loading...</div>
  }

  if (!user) {
    router.push("/auth/signin")
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200">
        <Link className="flex items-center justify-center" href="/home">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-lg font-bold text-gray-900">WeSeedU</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/auth/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/companies">
            Companies
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/auth/profile">
            Profile
          </Link>
          <button onClick={signOut} className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Sign Out
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="space-y-3 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 
                    text-transparent bg-clip-text animate-gradient">
                    Welcome back to WeSeedU
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl font-light leading-relaxed">
                  Your gateway to sustainable investments. Make an impact while growing your portfolio.
                </p>
              </div>

              {user && stats.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-8">
                  {stats.map((stat, index) => (
                    <Card 
                      key={index} 
                      className="bg-white/50 backdrop-blur-sm border border-gray-100 
                        shadow-[0_2px_10px_-3px_rgba(6,182,212,0.1)] 
                        hover:shadow-[0_10px_20px_-3px_rgba(6,182,212,0.15)] 
                        hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          {stat.icon}
                          <CardTitle className="text-xl font-medium text-gray-700">{stat.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 
                          text-transparent bg-clip-text">
                          {stat.value}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
                <Button 
                  onClick={() => router.push('/companies')} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white 
                    hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Companies
                </Button>
                <Button 
                  onClick={() => router.push('/dashboard/saved')} 
                  variant="outline" 
                  className="flex-1 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 
                    transition-colors shadow-sm"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Saved Companies
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-10 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <NewsSection />
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 mb-12">
              <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Invest in a Sustainable Future
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Discover innovative companies that are making a difference. Your investments can help shape a better world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-3">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-green-600" />
                  <CardTitle className="text-gray-900">Sustainable Growth</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  Invest in companies with proven track records of sustainable practices and growth potential.
                </CardContent>
              </Card>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <Users className="h-10 w-10 text-blue-600" />
                  <CardTitle className="text-gray-900">Community Impact</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  Support businesses that prioritize social responsibility and community development.
                </CardContent>
              </Card>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <BarChart className="h-10 w-10 text-blue-600" />
                  <CardTitle className="text-gray-900">Transparent Metrics</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  Access clear, data-driven insights on the environmental and social impact of your investments.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200">
        <p className="text-xs text-gray-600">© 2023 WeSeedU. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-600 hover:text-blue-600" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-600 hover:text-blue-600" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, TrendingUp, Users, BarChart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh() // Force a router refresh to update the session state
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-white">Loading...</div>
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
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/companies">
            Companies
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/profile">
            Profile
          </Link>
          <button onClick={signOut} className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Sign Out
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                  Welcome back to WeSeedU
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Your gateway to sustainable investments. Make an impact while growing your portfolio.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                  <Link href="/auth/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <Link href="/auth/companies">Explore Companies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                    Invest in a Sustainable Future
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                    Discover innovative companies that are making a difference. Your investments can help shape a better
                    world.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
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


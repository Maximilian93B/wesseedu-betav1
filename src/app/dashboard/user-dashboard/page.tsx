'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface UserData {
  id: string
  user_type: string
  first_name: string
  last_name: string
  email: string
}

const capitalizeFirstLetter = (str?: string) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : 'N/A'
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (error) throw error
          setUserData(data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [supabase])

  if (loading) return <div>Loading...</div>

  const isInvestor = userData?.user_type === 'investor'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button asChild>
          <Link href={isInvestor ? "/user-dashboard/companies" : "/user-dashboard/profile"}>
            {isInvestor ? 'Browse Companies' : 'Complete Profile'}
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {isInvestor ? (
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/user-dashboard/companies">Browse Companies</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/user-dashboard/favorites">View Favorites</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/user-dashboard/notifications">Check Notifications</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/user-dashboard/profile">Update Profile</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/user-dashboard/documents">Upload Documents</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/user-dashboard/analytics">View Analytics</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">Account Type</dt>
                <dd className="font-medium">{capitalizeFirstLetter(userData?.user_type)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Email</dt>
                <dd className="font-medium">{userData?.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Profile Status</dt>
                <dd className="font-medium">Active</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent activity to display</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

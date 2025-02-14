"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

type Profile = {
  id: string
  name: string
  email: string
  user_type: "admin" | "investor" | "company"
  user_tier: "root" | "thrive" | "impact"
  total_investments: number
  previous_month_investments: number
  impact_score: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        router.push("/auth/login")
        return
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          name,
          email,
          user_type,
          user_tier,
          total_investments,
          previous_month_investments,
          impact_score
        `)
        .eq("id", session.user.id)
        .single()

      if (error) {
        throw error
      }

      setProfile(data)
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault()

    try {
      if (!profile) return

      const { error } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          email: profile.email,
          user_type: profile.user_type,
          user_tier: profile.user_tier,
          total_investments: profile.total_investments,
          previous_month_investments: profile.previous_month_investments,
          impact_score: profile.impact_score,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)

      if (error) throw error
      setMessage("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage("Error updating profile")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

        <form onSubmit={updateProfile} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={profile?.name || ""}
              onChange={(e) => setProfile((prev) => ({ ...prev!, name: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={profile?.email || ""}
              onChange={(e) => setProfile((prev) => ({ ...prev!, email: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">User Type</label>
            <select
              value={profile?.user_type || "investor"}
              onChange={(e) => setProfile((prev) => ({ ...prev!, user_type: e.target.value as Profile["user_type"] }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="investor">Investor</option>
              <option value="company">Company</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">User Tier</label>
            <select
              value={profile?.user_tier || "root"}
              onChange={(e) => setProfile((prev) => ({ ...prev!, user_tier: e.target.value as Profile["user_tier"] }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="root">Root</option>
              <option value="thrive">Thrive</option>
              <option value="impact">Impact</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Total Investments</label>
            <input
              type="number"
              value={profile?.total_investments || 0}
              onChange={(e) => setProfile((prev) => ({ ...prev!, total_investments: parseFloat(e.target.value) }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Previous Month Investments</label>
            <input
              type="number"
              value={profile?.previous_month_investments || 0}
              onChange={(e) => setProfile((prev) => ({ ...prev!, previous_month_investments: parseFloat(e.target.value) }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Impact Score</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={profile?.impact_score || 0}
              onChange={(e) => setProfile((prev) => ({ ...prev!, impact_score: parseFloat(e.target.value) }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


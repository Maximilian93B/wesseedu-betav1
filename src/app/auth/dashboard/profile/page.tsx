"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { User, Briefcase, Star, DollarSign, TrendingUp, Award } from "lucide-react"

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
    return <div className="flex items-center justify-center h-96 text-emerald-400">Loading...</div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-2xl mx-auto bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 p-3 bg-emerald-950/50 text-emerald-400 border border-emerald-500/20 rounded"
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={updateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-emerald-400" />
                <Input
                  id="name"
                  type="text"
                  value={profile?.name || ""}
                  onChange={(e) => setProfile((prev) => ({ ...prev!, name: e.target.value }))}
                  className="pl-10 bg-black text-white border-emerald-500/20 focus:ring-emerald-500 focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-emerald-400" />
                <Input
                  id="email"
                  type="email"
                  value={profile?.email || ""}
                  onChange={(e) => setProfile((prev) => ({ ...prev!, email: e.target.value }))}
                  className="pl-10 bg-black text-white border-emerald-500/20 focus:ring-emerald-500 focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-type" className="text-white">
                User Type
              </Label>
              <div className="relative">
                <Briefcase className="absolute top-3 left-3 h-5 w-5 text-emerald-400" />
                <Select
                  value={profile?.user_type || "investor"}
                  onValueChange={(value) => setProfile((prev) => ({ ...prev!, user_type: value as Profile["user_type"] }))}
                >
                  <SelectTrigger className="pl-10 bg-black text-white border-emerald-500/20">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-emerald-500/20">
                    <SelectItem value="investor" className="text-white hover:bg-emerald-950/50">Investor</SelectItem>
                    <SelectItem value="company" className="text-white hover:bg-emerald-950/50">Company</SelectItem>
                    <SelectItem value="admin" className="text-white hover:bg-emerald-950/50">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-tier" className="text-white">
                User Tier
              </Label>
              <div className="relative">
                <Star className="absolute top-3 left-3 h-5 w-5 text-emerald-400" />
                <Select
                  value={profile?.user_tier || "root"}
                  onValueChange={(value) => setProfile((prev) => ({ ...prev!, user_tier: value as Profile["user_tier"] }))}
                >
                  <SelectTrigger className="pl-10 bg-black text-white border-emerald-500/20">
                    <SelectValue placeholder="Select user tier" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-emerald-500/20">
                    <SelectItem value="root" className="text-white hover:bg-emerald-950/50">Root</SelectItem>
                    <SelectItem value="thrive" className="text-white hover:bg-emerald-950/50">Thrive</SelectItem>
                    <SelectItem value="impact" className="text-white hover:bg-emerald-950/50">Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total-investments" className="text-white">
                Total Investments
              </Label>
              <div className="relative">
                <DollarSign className="absolute top-3 left-3 h-5 w-5 text-emerald-400" />
                <Input
                  id="total-investments"
                  type="number"
                  value={profile?.total_investments || 0}
                  onChange={(e) => setProfile((prev) => ({ ...prev!, total_investments: Number.parseFloat(e.target.value) }))}
                  className="pl-10 bg-black text-white border-emerald-500/20 focus:ring-emerald-500 focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previous-month-investments" className="text-white">
                Previous Month Investments
              </Label>
              <div className="relative">
                <TrendingUp className="absolute top-3 left-3 h-5 w-5 text-emerald-400" />
                <Input
                  id="previous-month-investments"
                  type="number"
                  value={profile?.previous_month_investments || 0}
                  onChange={(e) => setProfile((prev) => ({ ...prev!, previous_month_investments: Number.parseFloat(e.target.value) }))}
                  className="pl-10 bg-black text-white border-emerald-500/20 focus:ring-emerald-500 focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="impact-score" className="text-white">
                Impact Score
              </Label>
              <div className="flex items-center space-x-4">
                <Award className="h-5 w-5 text-emerald-400" />
                <Slider
                  id="impact-score"
                  min={0}
                  max={10}
                  step={0.1}
                  value={[profile?.impact_score || 0]}
                  onValueChange={(value) => setProfile((prev) => ({ ...prev!, impact_score: value[0] }))}
                  className="flex-grow"
                />
                <span className="text-emerald-400">{profile?.impact_score.toFixed(1)}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 text-white hover:bg-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200"
            >
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}


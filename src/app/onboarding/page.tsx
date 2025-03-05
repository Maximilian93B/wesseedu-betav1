"use client"

import { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import OnboardingWizard from "@/components/onboarding/OnboardingWizard"
import { useToast } from "@/hooks/use-toast"

export default function OnboardingPage() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [hasCheckedProfile, setHasCheckedProfile] = useState(false)

  // Use a ref to track if we've already initiated a redirect
  const redirectingRef = useState<boolean>(false)

  useEffect(() => {
    // If we don't have a user yet, wait for auth to initialize
    if (user === undefined) {
      return
    }

    // If user is null (not logged in), redirect to login
    if (user === null && !redirectingRef[0]) {
      redirectingRef[0] = true
      console.log("No user found, redirecting to login")
      router.replace("/auth/login")
      return
    }

    // If we have a user and haven't checked for a profile yet
    if (user && !hasCheckedProfile) {
      const checkProfile = async () => {
        try {
          // Check if user already has a profile
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", user.id)
            .single()

          // If user has a profile and we haven't started redirecting
          if (profile && !redirectingRef[0]) {
            redirectingRef[0] = true
            console.log("Profile found, redirecting to dashboard")
            router.replace("/dashboard")
            return
          }

          // User is logged in but has no profile - correct state for onboarding
          setHasCheckedProfile(true)
          setLoading(false)
        } catch (error) {
          console.error("Error checking profile:", error)
          toast({
            title: "Error",
            description: "Failed to check user profile status",
            variant: "destructive"
          })
          setLoading(false)
        }
      }

      checkProfile()
    }
  }, [user, hasCheckedProfile, supabase, router, toast, redirectingRef])

  // Show loading state while checking authorization
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A1A3B]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Only render the onboarding wizard if we've confirmed the user needs it
  return hasCheckedProfile ? (
    <OnboardingWizard />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-[#0A1A3B]">
      <div className="text-white text-center">
        <p>Checking authorization...</p>
      </div>
    </div>
  )
} 
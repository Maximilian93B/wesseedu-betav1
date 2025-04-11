"use client"

import { useEffect, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import OnboardingWizard from "@/components/onboarding/OnboardingWizard"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

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
    // DEV ONLY: Provide mock data in development for easier access
    if (process.env.NODE_ENV === 'development') {
      console.log('DEV MODE: Using mock data for onboarding page');
      setHasCheckedProfile(true);
      setLoading(false);
      return;
    }

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

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#70f570] to-[#49c628]">
      <div className="bg-white/90 p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              rotate: 360,
              opacity: [0.5, 1, 0.5]
            }} 
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="h-16 w-16 rounded-full border-4 border-green-300 border-t-green-600"></div>
          </motion.div>
        </div>
        <p className="text-black font-medium">
          {loading ? "Preparing your experience..." : "Checking authorization..."}
        </p>
      </div>
    </div>
  )

  // Only render the onboarding wizard if we've confirmed the user needs it
  if (hasCheckedProfile) {
    return <OnboardingWizard />
  }
  
  // Show loading state
  return <LoadingSpinner />
} 
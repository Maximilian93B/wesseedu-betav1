"use client"

import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf } from "lucide-react"

// Import step components
import WelcomeStep from "@/components/onboarding/steps/WelcomeStep"
import PersonalInfoStep from "@/components/onboarding/steps/PersonalInfoStep"
import InterestsStep from "@/components/onboarding/steps/InterestsStep"
import MembershipStep from "@/components/onboarding/steps/MembershipStep"
import CompleteStep from "@/components/onboarding/steps/CompleteStep"

export default function OnboardingWizard() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [totalSteps] = useState(5)
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interests: [] as string[],
    userTier: "root" as "root" | "thrive" | "impact"
  })
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/auth/login")
        return
      }
      
      setUserId(session.user.id)
      
      // Pre-fill data if available
      if (session.user.email) {
        setUserData(prev => ({ ...prev, email: session.user.email || "" }))
      }
      
      if (session.user.user_metadata) {
        const { first_name, last_name, onboarding_step } = session.user.user_metadata
        setUserData(prev => ({ 
          ...prev, 
          firstName: first_name || "", 
          lastName: last_name || "" 
        }))
        
        // Resume from last saved step if available
        if (onboarding_step && onboarding_step > 1) {
          setCurrentStep(onboarding_step)
        }
      }
    }
    
    checkSession()
  }, [supabase.auth, router])

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData(prev => ({ ...prev, ...data }))
  }

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      // Save progress to user metadata
      if (userId) {
        await supabase.auth.updateUser({
          data: { onboarding_step: currentStep + 1 }
        })
      }
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      if (!userId) {
        throw new Error("User not authenticated")
      }
      
      // Create the user profile
      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          user_type: "investor",
          user_tier: userData.userTier,
          sustainable_investment_tags: userData.interests,
          total_investments: 0,
          previous_month_investments: 0,
          impact_score: 0
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Profile creation failed")
      }

      // Mark onboarding as completed
      await supabase.auth.updateUser({
        data: { 
          onboarding_completed: true,
          onboarding_step: totalSteps
        }
      })

      // Redirect to dashboard
      router.push("/auth/home")
    } catch (err) {
      console.error("Profile creation error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={handleNext} />
      case 2:
        return (
          <PersonalInfoStep 
            userData={userData} 
            updateUserData={updateUserData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )
      case 3:
        return (
          <InterestsStep 
            interests={userData.interests} 
            updateInterests={(interests) => updateUserData({ interests })} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )
      case 4:
        return (
          <MembershipStep 
            selectedTier={userData.userTier} 
            updateTier={(userTier) => updateUserData({ userTier })} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )
      case 5:
        return (
          <CompleteStep 
            userData={userData} 
            onComplete={handleComplete} 
            onBack={handleBack}
            isLoading={isLoading} 
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A1A3B] p-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="h-12 w-12 text-[#14B8A6]" />
          <h1 className="text-3xl font-bold ml-2 text-white">
            <span className="bg-gradient-to-r from-[#14B8A6]/80 via-[#14B8A6]/60 to-[#14B8A6]/80 text-transparent bg-clip-text">We</span>
            <span className="bg-gradient-to-r from-white/80 via-white/60 to-white/80 text-transparent bg-clip-text">Seed</span>
            <span className="bg-gradient-to-r from-[#14B8A6]/80 via-[#A78BFA]/60 to-[#14B8A6]/80 text-transparent bg-clip-text">U</span>
          </h1>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white/60">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-white">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <Progress 
            value={(currentStep / totalSteps) * 100} 
            className="h-2 bg-white/10" 
            indicatorClassName="bg-gradient-to-r from-teal-400 to-purple-400" 
          />
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 border border-red-500/20 bg-red-500/10 backdrop-blur-sm">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="w-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-[#14B8A6]/10">
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
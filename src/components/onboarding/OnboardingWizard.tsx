"use client"

import { useState, useEffect, useRef } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Leaf, Sprout, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// Import step components
import WelcomeStep from "@/components/onboarding/steps/WelcomeStep"
import PersonalInfoStep from "@/components/onboarding/steps/PersonalInfoStep"
import InterestsStep from "@/components/onboarding/steps/InterestsStep"
import MembershipStep from "@/components/onboarding/steps/MembershipStep"
import CompleteStep from "@/components/onboarding/steps/CompleteStep"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.14,
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 180, damping: 20 }
  }
}

const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    rotate: [0, 0.5, 0, -0.5, 0],
    transition: {
      y: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse", 
        ease: "easeInOut"
      },
      rotate: {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
}

const shimmerAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: [0, 0.3, 0.1, 0],
    x: [0, 100, 200, 300],
    scale: [1, 1.02, 1.01, 1],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 3.2,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: 0.5
    }
  }
}

export default function OnboardingWizard() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { toast } = useToast()
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
  
  // Refs for scroll effects
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -10])

  useEffect(() => {
    const checkSession = async () => {
      // DEV ONLY: Use mock data in development
      if (process.env.NODE_ENV === 'development') {
        console.log('DEV MODE: Using mock data for OnboardingWizard');
        
        // Set mock user ID
        setUserId('dev-user-id');
        
        // Set mock user data if fields are empty
        if (!userData.firstName) {
          setUserData(prev => ({
            ...prev,
            firstName: "Dev",
            lastName: "User",
            email: "dev@example.com"
          }));
        }
        
        return;
      }
      
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
  }, [supabase.auth, router, userData.firstName])

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
      // DEV ONLY: Skip actual API calls in development
      if (process.env.NODE_ENV === 'development') {
        console.log('DEV MODE: Skipping profile creation API call');
        console.log('Profile data would be:', {
          id: userId,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          display_name: `${userData.firstName} ${userData.lastName}`,
          user_type: "investor",
          user_tier: userData.userTier,
          sustainable_investment_tags: userData.interests
        });
        
        // Wait a moment to simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate redirect
        console.log('DEV MODE: Would redirect to dashboard');
        toast({
          title: "Development Mode",
          description: "Profile creation simulated. Would redirect to dashboard.",
          variant: "default"
        });
        
        setIsLoading(false);
        return;
      }
      
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
          display_name: `${userData.firstName} ${userData.lastName}`,
          user_type: "investor",
          user_tier: userData.userTier,
          sustainable_investment_tags: userData.interests,
          total_investments: 0,
          previous_month_investments: 0,
          impact_score: 0,
          avatar_url: null,
          website: null,
          location: null,
          bio: null,
          verified: false,
          active: true,
          profile_visibility: 'public',
          investment_visibility: 'private',
          welcome_message_seen: false
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
          onboarding_step: totalSteps,
          profile_created_at: new Date().toISOString(),
          user_tier: userData.userTier,
          interests: userData.interests
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
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" 
      style={{ 
        background: "radial-gradient(circle at center, #6fdd6f, #49c628)"
      }}
    >      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-3xl px-4 py-8 relative z-10"
      >
      
        
        {/* Progress indicator */}
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-white">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="relative">
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
            {/* Shadow effect for progress bar */}
            <div className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>
        </motion.div>

        {/* Error alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive" className="mb-6 border border-red-100/20 bg-white/90 text-red-700 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Main card */}
        <motion.div
          variants={itemVariants}
          style={{ y: cardY }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-green-400/30 rounded-xl blur-md transform translate-y-1"></div>
          
          <Card className="w-full bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden relative">
            {/* Top edge highlight for definition */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 via-white/90 to-white/40"></div>
            
            {/* Inner shadow effects for depth */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
            
            {/* Left edge highlight */}
            <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-white/60 via-white/30 to-transparent"></div>
            
            {/* Card content */}
            <CardContent className="relative z-10 pt-8 pb-10 px-6 md:px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 170, damping: 20 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      
      </motion.div>
    </div>
  )
} 
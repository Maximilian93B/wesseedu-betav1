"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Leaf, Mail, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  const [message, setMessage] = useState("Verifying your account...")
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Check if this is a redirect from email verification
    const isEmailVerification = searchParams.has("type") && searchParams.get("type") === "signup"
    
    const checkAuthStatus = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        const urlParams = new URLSearchParams(window.location.search)
        const urlError = urlParams.get("error")
        const errorDescription = urlParams.get("error_description")

        if (urlError) {
          if (
            urlError === "access_denied" &&
            (errorDescription?.includes("expired") || urlParams.get("error_code") === "otp_expired")
          ) {
            setError("Your verification link has expired. Please request a new verification email.")
            setIsLoading(false)
            return
          }
          setError(`Authentication error: ${errorDescription || urlError}`)
          setIsLoading(false)
          return
        }

        if (sessionError) {
          console.error("Session error:", sessionError)
          setError("Failed to verify your email. Please try again.")
          setIsLoading(false)
          return
        }

        if (session) {
          // If we have a session and this is a redirect from email verification
          // or if we detect the email was just verified, redirect immediately
          if (isEmailVerification || urlParams.has("email_confirmed")) {
            console.log("Email verified, redirecting to onboarding...")
            router.push("/onboarding")
            return
          }
          
          setIsVerified(true)
          setMessage("Email verified successfully!")
          
          // Check if user has completed onboarding
          const { onboarding_completed } = session.user.user_metadata || {}
          
          if (onboarding_completed) {
            // If onboarding is already completed, redirect to dashboard
            setTimeout(() => {
              router.push("/dashboard")
            }, 1500)
          } else {
            // Redirect to onboarding after a brief delay
            setTimeout(() => {
              router.push("/onboarding")
            }, 1500)
          }
        } else {
          // Get email from URL if available
          const emailFromUrl = urlParams.get("email")
          if (emailFromUrl) {
            setEmail(emailFromUrl)
          }
          
          // If no session but no error, the user might have clicked the link but auth isn't complete
          setMessage("Please check your email to verify your account.")
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Verification error:", err)
        setError("An unexpected error occurred during verification.")
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [router, supabase.auth, searchParams])

  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirmation`,
        },
      })

      if (error) throw error

      setMessage(`Verification email sent to ${email}. Please check your inbox.`)
    } catch (err: any) {
      console.error("Error resending verification:", err)
      setError(err.message || "Failed to resend verification email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#70f570] to-[#49c628] text-black">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-[400px] max-w-[90vw]"
      >
        <Card className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <CardHeader className="space-y-1">
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center mb-2"
            >
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#70f570] to-[#49c628] shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-xl sm:text-2xl font-extrabold text-black leading-tight tracking-tight font-display text-center">
                Email Verification
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-black mt-2 leading-relaxed font-body text-center">
                Verify your email to continue
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <motion.div variants={itemVariants}>
              {error ? (
                <Alert variant="destructive" className="border border-red-200 bg-red-50">
                  <AlertTitle className="font-semibold font-display">Error</AlertTitle>
                  <AlertDescription className="text-sm font-body">{error}</AlertDescription>
                </Alert>
              ) : (
                <Alert 
                  variant="default" 
                  className={isVerified 
                    ? "bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200" 
                    : "bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200"
                  }
                >
                  {isVerified ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Mail className="h-4 w-4 text-blue-500" />
                  )}
                  <AlertTitle className="font-semibold font-display">
                    {isVerified ? "Verification Successful" : "Check your email"}
                  </AlertTitle>
                  <AlertDescription className="text-sm font-body">{message}</AlertDescription>
                  {isVerified && (
                    <p className="text-sm mt-2 font-body">Redirecting to onboarding...</p>
                  )}
                </Alert>
              )}
            </motion.div>
            {error && (
              <motion.div variants={itemVariants} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-white/20 focus:border-white/30 focus:ring-green-500/20 font-body text-black"
                />
                <Button 
                  className="w-full bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                  shadow-sm hover:shadow transition-all duration-300 rounded-lg py-3 font-helvetica"
                  onClick={handleResendVerification} 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </Button>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            <motion.p 
              variants={itemVariants}
              className="text-sm text-center w-full text-black/70 font-body"
            >
              If you don&apos;t see the email, please check your spam folder.
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}


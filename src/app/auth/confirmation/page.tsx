"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Leaf, Mail, CheckCircle2 } from "lucide-react"

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-black">
      <Card className="w-[400px] max-w-[90vw]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">Verify your email to continue</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="default" className={isVerified ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}>
              {isVerified ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Mail className="h-4 w-4 text-blue-500" />
              )}
              <AlertTitle>{isVerified ? "Verification Successful" : "Check your email"}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
              {isVerified && (
                <p className="text-sm mt-2">Redirecting to onboarding...</p>
              )}
            </Alert>
          )}
          {error && (
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="w-full" onClick={handleResendVerification} disabled={isLoading}>
                {isLoading ? "Sending..." : "Resend Verification Email"}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-muted-foreground w-full text-black">
            If you don't see the email, please check your spam folder.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}


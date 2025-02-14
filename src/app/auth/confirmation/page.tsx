"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Leaf, Mail } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [message, setMessage] = useState("Please check your email to verify your account.")
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
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
            return
          }
          setError(`Authentication error: ${errorDescription || urlError}`)
          return
        }

        if (sessionError) {
          console.error("Session error:", sessionError)
          setError("Failed to verify your email. Please try again.")
          return
        }

        if (session) {
          setMessage("Email verified successfully! Redirecting...")
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single()

          if (profileError) {
            console.error("Error fetching profile:", profileError)
            setError("Failed to fetch profile information. Please try again.")
            return
          }

          if (!profile) {
            router.push("/auth/profile-create")
          } else {
            router.push("/dashboard")
          }
        }
      } catch (err) {
        console.error("Verification error:", err)
        setError("An unexpected error occurred during verification.")
      }
    }

    checkAuthStatus()
  }, [router, supabase.auth]) // Added supabase.auth to dependencies

  const handleResendVerification = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/profile-create`,
        },
      })
      if (error) throw error
      setMessage("New verification email sent! Please check your inbox.")
      setError("")
    } catch (err) {
      setError("Failed to resend verification email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">Verify your email to complete registration</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
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
          <p className="text-sm text-center text-muted-foreground w-full">
            If you don't see the email, please check your spam folder.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}


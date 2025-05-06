"use client"

import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Leaf, User, Mail, Lock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

// Motion variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
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

export default function SignupPage() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [infoMsg, setInfoMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setInfoMsg("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || "Signup failed")
      }

      setInfoMsg(data.message)
      router.push("/auth/confirmation?email=" + encodeURIComponent(email))
    } catch (err: any) {
      console.error("Unexpected signup error:", err)
      setErrorMsg(err.message || "An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Raspberry Blue Background with image as centerpiece */}
      <div 
        className="hidden md:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundImage: "linear-gradient(115deg, #00b4db, #0083b0)",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Ambient light effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Simple decorative glow behind the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-white/10 blur-[100px]"></div>
        
        {/* Large faded header text with radiant glow */}
        <div className="absolute top-0 left-0 right-0 text-center z-10 pt-8">
          {/* Glow effect behind text */}
          <div className="absolute inset-0 w-full h-full flex justify-center">
            <div className="w-3/4 h-16 bg-white/60 blur-[50px] rounded-full"></div>
          </div>
          
          <h1 className="text-[6rem] font-bold tracking-tighter leading-none relative font-display">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] via-white/80 to-white/5 drop-shadow-md">
              WeSeedU
            </span>
          </h1>
        </div>
        
        {/* Featured centerpiece image - larger and more prominent */}
        <div className="relative w-[85%] h-[60%] flex items-center justify-center z-20">
          <Image 
            src="/savings-jar.png" 
            alt="WeSeedU 3D Illustration" 
            width={400}
            height={400}
            priority
            style={{ objectFit: 'contain' }}
            className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Trust indicators at bottom */}
        <div className="absolute bottom-10 w-full px-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 w-full">
            <span className="flex items-center text-xs sm:text-sm text-white font-body">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2 border border-white/40 shadow-md">
                <ArrowRight size={10} />
              </div>
              <span className="font-medium">Secure Signup</span>
            </span>
            <span className="flex items-center text-xs sm:text-sm text-white font-body">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white mr-2 border border-white/40 shadow-md">
                <ArrowRight size={10} />
              </div>
              <span className="font-medium">Instant Access</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8" 
  style={{ 
    backgroundImage: "linear-gradient(115deg, #70f570, #49c628)",
    backgroundAttachment: "fixed"
  }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-md w-full"
        >
          <Card className="shadow-lg border border-slate-200">
            <CardHeader className="space-y-1">
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center mb-2"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardTitle className="text-2xl text-center font-display">Create an account</CardTitle>
                <CardDescription className="text-center font-body">Enter your details to create your WeSeedU account</CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {errorMsg && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
              )}
              {infoMsg && (
                <Alert>
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{infoMsg}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSignup} className="space-y-4">
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium font-body">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium font-body">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium font-body">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="pl-10"
                      placeholder="you@example.com"
                      required 
                    />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium font-body">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    Password must be at least 8 characters long
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button className="w-full mt-2 font-helvetica" type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <motion.p variants={itemVariants} className="text-sm text-center text-muted-foreground font-body">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </motion.p>
              <motion.p variants={itemVariants} className="text-xs text-center text-muted-foreground font-body">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>
              </motion.p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


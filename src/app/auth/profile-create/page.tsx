"use client"

import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Leaf } from "lucide-react"

interface UserTier {
  name: "root" | "thrive" | "impact"
  description: string
  features: string[]
}

const USER_TIERS: Record<string, UserTier> = {
  root: {
    name: "root",
    description: "Free, basic access for retail investors",
    features: ["Basic company profiles", "Public marketplace access", "Basic analytics"],
  },
  thrive: {
    name: "thrive",
    description: "Paid annual membership with advanced features",
    features: ["In-depth company profiles", "Advanced analytics", "Priority access", "Premium support"],
  },
  impact: {
    name: "impact",
    description: "Exclusive tier for top contributors",
    features: ["All Thrive features", "Exclusive investment opportunities", "VIP events", "Direct company access"],
  },
}

export default function ProfileCreationPage() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [selectedTier, setSelectedTier] = useState<"root" | "thrive">("root")
  const [isLoading, setIsLoading] = useState(false)

  const availableTags = [
    "Renewable Energy",
    "Green Technology",
    "Sustainable Agriculture",
    "Socially Responsible Investing",
    "Impact Investing",
    "Clean Water",
    "Waste Reduction",
    "Carbon Neutral",
    "Biodiversity Conservation",
    "Ethical Supply Chain",
  ]

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        sessionStorage.setItem("redirectAfterLogin", "/auth/profile-create")
        router.push("/auth/login")
      }
    }
    checkSession()
  }, [supabase.auth, router])

  const handleProfileCreation = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")
    setIsLoading(true)

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (tags.length === 0) {
      setErrorMsg("Please select at least one investment tag")
      setIsLoading(false)
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setErrorMsg("You must be logged in to create a profile.")
        router.push("/auth/login")
        return
      }

      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          name: `${firstName} ${lastName}`,
          user_type: "investor",
          user_tier: selectedTier,
          sustainable_investment_tags: tags,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Profile creation failed")
      }

      setSuccessMsg(data.message)
      router.push("/dashboard")
    } catch (err) {
      console.error("Profile creation error:", err)
      setErrorMsg("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[600px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Create Your Profile</CardTitle>
          <CardDescription className="text-center">Set up your investor profile to start using WeSeedU</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {errorMsg && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
          {successMsg && (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMsg}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleProfileCreation}>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Your Membership Tier</h3>
              <RadioGroup value={selectedTier} onValueChange={(value: "root" | "thrive") => setSelectedTier(value)}>
                {["root", "thrive"].map((tier) => (
                  <div key={tier} className="flex items-center space-x-2">
                    <RadioGroupItem value={tier} id={tier} />
                    <Label htmlFor={tier}>
                      <span className="font-semibold capitalize">{tier}</span>
                      <p className="text-sm text-muted-foreground">{USER_TIERS[tier].description}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-sm text-muted-foreground">
                Note: Impact tier is awarded to top contributing investors and cannot be selected during registration.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Sustainable Investment Tags</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={tags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTags([...tags, tag])
                        } else {
                          setTags(tags.filter((t) => t !== tag))
                        }
                      }}
                    />
                    <Label htmlFor={tag}>{tag}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading ? "Creating Profile..." : "Create Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


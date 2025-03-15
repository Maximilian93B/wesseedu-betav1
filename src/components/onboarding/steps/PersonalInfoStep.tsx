import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft } from "lucide-react"

interface PersonalInfoStepProps {
  userData: {
    firstName: string
    lastName: string
    email: string
  }
  updateUserData: (data: Partial<{ firstName: string, lastName: string, email: string }>) => void
  onNext: () => void
  onBack: () => void
}

export default function PersonalInfoStep({ 
  userData, 
  updateUserData, 
  onNext, 
  onBack 
}: PersonalInfoStepProps) {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: ""
    }
    
    if (!userData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    
    if (!userData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    
    if (!userData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid"
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">
          Tell us about{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
            yourself
          </span>
        </h2>
        <p className="text-white/70">
          We'll use this information to personalize your experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white">First Name</Label>
          <Input
            id="firstName"
            value={userData.firstName}
            onChange={(e) => updateUserData({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400/50 focus:ring-teal-400/20"
          />
          {errors.firstName && <p className="text-sm text-red-400">{errors.firstName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white">Last Name</Label>
          <Input
            id="lastName"
            value={userData.lastName}
            onChange={(e) => updateUserData({ lastName: e.target.value })}
            placeholder="Enter your last name"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400/50 focus:ring-teal-400/20"
          />
          {errors.lastName && <p className="text-sm text-red-400">{errors.lastName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => updateUserData({ email: e.target.value })}
            placeholder="Enter your email"
            disabled={!!userData.email}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400/50 focus:ring-teal-400/20 disabled:opacity-70"
          />
          {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            onClick={onBack}
            className="group relative text-white border-white/20 hover:border-white/40 
              backdrop-blur-sm px-6 py-2 h-auto
              bg-white/5 hover:bg-white/10
              transition-all duration-300 ease-in-out"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back
          </Button>
          <Button 
            type="submit"
            className="group relative text-white border-white/20 hover:border-white/40 
              backdrop-blur-sm px-6 py-2 h-auto
              bg-gradient-to-r from-teal-500/50 to-purple-500/50
              hover:from-teal-500/60 hover:to-purple-500/60
              shadow-lg shadow-teal-500/10
              hover:shadow-teal-500/20
              transition-all duration-300 ease-in-out"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </div>
  )
} 
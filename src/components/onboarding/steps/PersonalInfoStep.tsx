import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, CheckCircle, Edit } from "lucide-react"
import { motion } from "framer-motion"

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
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  const validate = () => {
    if (!isEditing) return true
    
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
      setIsEditing(false)
      onNext()
    }
  }

  const InfoDisplay = ({ label, value }: { label: string, value: string }) => (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 rounded-lg p-4 border border-black/5 shadow-sm"
    >
      <p className="text-sm text-black/60 mb-1">{label}</p>
      <p className="text-black font-medium">{value}</p>
    </motion.div>
  )

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-black">
          {isEditing ? (
            <>
              Edit your{" "}
              <span className="bg-gradient-to-r from-green-400 via-[#70f570] to-green-400 text-transparent bg-clip-text animate-flow">
                information
              </span>
            </>
          ) : (
            <>
              Confirm your{" "}
              <span className="bg-gradient-to-r from-green-400 via-[#70f570] to-green-400 text-transparent bg-clip-text animate-flow">
                details
              </span>
            </>
          )}
        </h2>
        <p className="text-black">
          {isEditing 
            ? "Make any necessary changes to your information below"
            : "Please verify that the information below is correct"
          }
        </p>
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-black font-medium">Your account information</p>
            </div>
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="flex items-center text-black bg-white hover:bg-white/90 border-black/10"
            >
              <Edit className="h-3.5 w-3.5 mr-1" /> Edit
            </Button>
          </div>
          
          <div className="grid gap-3">
            <InfoDisplay label="First Name" value={userData.firstName} />
            <InfoDisplay label="Last Name" value={userData.lastName} />
            <InfoDisplay label="Email" value={userData.email} />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              onClick={onBack}
              className="group relative text-black border-black/10 hover:border-black/20 
                backdrop-blur-sm px-6 py-2 h-auto
                bg-white hover:bg-slate-50
                shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                transition-all duration-300 ease-out
                hover:translate-y-[-2px] rounded-lg"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back
            </Button>
            <Button 
              type="button"
              onClick={onNext}
              className="group relative text-black border-black/10 hover:border-black/20 
                backdrop-blur-sm px-6 py-2 h-auto
                bg-white hover:bg-slate-50
                shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                transition-all duration-300 ease-out
                hover:translate-y-[-2px] rounded-lg"
            >
              Confirm <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-black">First Name</Label>
            <Input
              id="firstName"
              value={userData.firstName}
              onChange={(e) => updateUserData({ firstName: e.target.value })}
              placeholder="Enter your first name"
              className="bg-white border-black/10 text-black placeholder:text-black/40 focus:border-green-400/50 focus:ring-green-400/20"
            />
            {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-black">Last Name</Label>
            <Input
              id="lastName"
              value={userData.lastName}
              onChange={(e) => updateUserData({ lastName: e.target.value })}
              placeholder="Enter your last name"
              className="bg-white border-black/10 text-black placeholder:text-black/40 focus:border-green-400/50 focus:ring-green-400/20"
            />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">Email</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => updateUserData({ email: e.target.value })}
              placeholder="Enter your email"
              disabled={!!userData.email}
              className="bg-white border-black/10 text-black placeholder:text-black/40 focus:border-green-400/50 focus:ring-green-400/20 disabled:opacity-70"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="group relative text-black border-black/10 hover:border-black/20 
                backdrop-blur-sm px-6 py-2 h-auto
                bg-white hover:bg-slate-50
                shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                transition-all duration-300 ease-out
                hover:translate-y-[-2px] rounded-lg"
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="group relative text-black border-black/10 hover:border-black/20 
                backdrop-blur-sm px-6 py-2 h-auto
                bg-white hover:bg-slate-50
                shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                transition-all duration-300 ease-out
                hover:translate-y-[-2px] rounded-lg"
            >
              Save Changes <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      )}
    </div>
  )
} 
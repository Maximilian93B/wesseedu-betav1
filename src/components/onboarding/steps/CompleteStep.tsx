import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

interface CompleteStepProps {
  userData: {
    firstName: string
    lastName: string
    email: string
    interests: string[]
    userTier: "root" | "thrive" | "impact"
  }
  onComplete: () => void
  onBack: () => void
  isLoading: boolean
}

export default function CompleteStep({ 
  userData, 
  onComplete, 
  onBack,
  isLoading 
}: CompleteStepProps) {
  return (
    <div className="space-y-6 py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 p-4 mb-4 border border-teal-500/30">
          <CheckCircle2 className="h-12 w-12 text-teal-400" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white">
          You're{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
            all set
          </span>
          !
        </h2>
        <p className="text-center text-white/70 mt-2 mb-6">
          Let's review your profile before we finalize
        </p>
      </motion.div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-5 border border-white/10">
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-1">Personal Information</h3>
          <p className="font-medium text-white text-lg">{userData.firstName} {userData.lastName}</p>
          <p className="text-white/80">{userData.email}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-1">Membership Tier</h3>
          <p className="font-medium text-white text-lg capitalize">{userData.userTier}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-1">Investment Interests</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {userData.interests.map(interest => (
              <span 
                key={interest} 
                className="bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white text-sm px-3 py-1 rounded-full border border-teal-500/30"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
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
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back
        </Button>
        <Button 
          onClick={onComplete}
          disabled={isLoading}
          className="group relative text-white border-white/20 hover:border-white/40 
            backdrop-blur-sm px-8 py-2 h-auto
            bg-gradient-to-r from-teal-500/50 to-purple-500/50
            hover:from-teal-500/60 hover:to-purple-500/60
            shadow-lg shadow-teal-500/10
            hover:shadow-teal-500/20
            transition-all duration-300 ease-in-out
            disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating your profile...
            </span>
          ) : (
            <span className="flex items-center">
              Complete Setup
            </span>
          )}
        </Button>
      </div>
    </div>
  )
} 
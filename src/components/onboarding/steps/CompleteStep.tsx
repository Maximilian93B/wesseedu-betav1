import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, User, Briefcase, Leaf } from "lucide-react"
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
  // Map tier names to more user-friendly display names
  const tierDisplayNames = {
    root: "Root - Basic Access",
    thrive: "Thrive - Advanced Features",
    impact: "Impact - Exclusive Access"
  };
  
  return (
    <div className="space-y-8 py-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 to-white/30 rounded-full blur-md"></div>
          <div className="rounded-full bg-white p-4 border border-green-200 shadow-lg">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center text-black mb-2">
          You're{" "}
          <span className="bg-gradient-to-r from-green-400 via-[#70f570] to-green-400 text-transparent bg-clip-text animate-flow">
            all set
          </span>
          !
        </h2>
        <p className="text-center text-black/70 max-w-md">
          Let's review your profile details before we finalize your sustainable investment journey
        </p>
      </motion.div>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-black/5 shadow-md"
        >
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-full mr-4">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-black/60 mb-1">Personal Information</h3>
              <p className="font-medium text-black text-lg">{userData.firstName} {userData.lastName}</p>
              <p className="text-black/70">{userData.email}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-black/5 shadow-md"
        >
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-full mr-4">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black/60 mb-1">Membership Tier</h3>
              <p className="font-medium text-black text-lg">{tierDisplayNames[userData.userTier]}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-black/5 shadow-md"
        >
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-full mr-4">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-black/60 mb-2">Investment Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userData.interests.map(interest => (
                  <span 
                    key={interest} 
                    className="bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full border border-green-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-green-50 border border-green-100 rounded-xl p-4 text-green-800 text-sm"
      >
        <p className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0 mt-0.5">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <span>
            By completing this setup, you'll gain access to personalized sustainable investment opportunities aligned with your interests.
          </span>
        </p>
      </motion.div>
      
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
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back
        </Button>
        <Button 
          onClick={onComplete}
          disabled={isLoading}
          className="group relative text-black border-black/10 hover:border-black/20 
            backdrop-blur-sm px-8 py-2 h-auto
            bg-gradient-to-r from-green-500 to-[#70f570]
            hover:from-green-600 hover:to-[#5bde5b]
            text-white
            shadow-lg shadow-green-500/10
            hover:shadow-green-500/20
            transition-all duration-300 ease-out
            hover:translate-y-[-2px] rounded-lg
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
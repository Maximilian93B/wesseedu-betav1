import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Leaf } from "lucide-react"
import { motion } from "framer-motion"

interface InterestsStepProps {
  interests: string[]
  updateInterests: (interests: string[]) => void
  onNext: () => void
  onBack: () => void
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Renewable Energy": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6-6 6 6"/><path d="M6 18l6-6 6 6"/></svg>, // Wind turbine icon
  "Green Technology": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a4.2 4.2 0 0 0 4 4 4.2 4.2 0 0 1 3 2 4.2 4.2 0 0 1-1 5 4.2 4.2 0 0 0-2 3 4.2 4.2 0 0 1-4 3 4.2 4.2 0 0 0-3-2 4.2 4.2 0 0 1-2-3 4.2 4.2 0 0 1 1-5 4.2 4.2 0 0 0 2-3Z"/><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/></svg>, // Tech icon
  "Sustainable Agriculture": <Leaf className="h-4 w-4" />, // Leaf icon
  "Impact Investing": <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 14 2.5-2.5"/><path d="m14 8 2.5-2.5"/><path d="m8 8-2.5-2.5"/><path d="m16 16-2.5-2.5"/><line x1="9" x2="9.01" y1="10" y2="10"/><line x1="15" x2="15.01" y1="10" y2="10"/><line x1="15" x2="15.01" y1="14" y2="14"/><line x1="9" x2="9.01" y1="14" y2="14"/></svg>, // Impact icon
}

export default function InterestsStep({ 
  interests, 
  updateInterests, 
  onNext, 
  onBack 
}: InterestsStepProps) {
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

  const handleToggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      updateInterests(interests.filter(t => t !== tag))
    } else {
      updateInterests([...interests, tag])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (interests.length > 0) {
      onNext()
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-2">
        <motion.h2 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-3 text-black"
        >
          What are you{" "}
          <span className="bg-gradient-to-r from-green-400 via-[#70f570] to-green-400 text-transparent bg-clip-text animate-flow">
            interested in
          </span>
          ?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-black/70 max-w-md mx-auto"
        >
          Select the sustainable investment areas that align with your values
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableTags.map((tag, index) => (
            <Label
              key={tag}
              htmlFor={tag}
              className="cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  flex items-center space-x-3 p-4 rounded-xl border backdrop-blur-sm
                  transition-all duration-300 ease-out
                  ${interests.includes(tag) 
                    ? 'border-green-500/40 bg-white shadow-md' 
                    : 'border-black/10 bg-white/95 hover:bg-white hover:shadow-sm hover:border-green-500/20'}
                `}
              >
                <div className={`
                  rounded-full p-2 flex-shrink-0
                  ${interests.includes(tag) 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-500'}
                `}>
                  {categoryIcons[tag] || <Leaf className="h-4 w-4" />}
                </div>
                
                <div className="flex-grow">
                  <p className="text-black font-medium text-sm">{tag}</p>
                </div>
                
                <Checkbox
                  id={tag}
                  checked={interests.includes(tag)}
                  onCheckedChange={() => handleToggleInterest(tag)}
                  className={`
                    ml-auto flex-shrink-0
                    ${interests.includes(tag) 
                      ? "text-green-600 border-green-600" 
                      : "text-black border-black/40"}
                  `}
                />
              </motion.div>
            </Label>
          ))}
        </div>

        {interests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border border-red-100 rounded-lg p-3"
          >
            <p className="text-sm text-red-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Please select at least one interest
            </p>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm text-black/80"
        >
          <p>
            Your selections help us tailor investment opportunities that align with your environmental and social priorities.
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
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back
          </Button>
          <Button 
            type="submit"
            disabled={interests.length === 0}
            className="group relative text-black border-black/10 hover:border-black/20 
              backdrop-blur-sm px-6 py-2 h-auto
              bg-white hover:bg-slate-50
              shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
              transition-all duration-300 ease-out
              hover:translate-y-[-2px] rounded-lg
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </div>
  )
} 
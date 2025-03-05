import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

interface InterestsStepProps {
  interests: string[]
  updateInterests: (interests: string[]) => void
  onNext: () => void
  onBack: () => void
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
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">
          What are you{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
            interested in
          </span>
          ?
        </h2>
        <p className="text-white/70">
          Select the sustainable investment areas that interest you most
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableTags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                flex items-center space-x-2 p-4 rounded-xl border backdrop-blur-sm
                transition-all duration-300 ease-out
                ${interests.includes(tag) 
                  ? 'border-teal-500/40 bg-gradient-to-r from-teal-500/10 to-purple-500/10 shadow-lg shadow-teal-500/5' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}
              `}
            >
              <Checkbox
                id={tag}
                checked={interests.includes(tag)}
                onCheckedChange={() => handleToggleInterest(tag)}
                className={interests.includes(tag) ? "text-teal-400 border-teal-400" : "text-white border-white/40"}
              />
              <Label 
                htmlFor={tag} 
                className="flex-grow cursor-pointer text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleInterest(tag);
                }}
              >
                {tag}
              </Label>
            </motion.div>
          ))}
        </div>

        {interests.length === 0 && (
          <p className="text-sm text-red-400">Please select at least one interest</p>
        )}
        
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
            disabled={interests.length === 0}
            className="group relative text-white border-white/20 hover:border-white/40 
              backdrop-blur-sm px-6 py-2 h-auto
              bg-gradient-to-r from-teal-500/50 to-purple-500/50
              hover:from-teal-500/60 hover:to-purple-500/60
              shadow-lg shadow-teal-500/10
              hover:shadow-teal-500/20
              transition-all duration-300 ease-in-out
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </div>
  )
} 
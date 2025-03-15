import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import { motion } from "framer-motion"

interface MembershipStepProps {
  selectedTier: "root" | "thrive" | "impact"
  updateTier: (tier: "root" | "thrive" | "impact") => void
  onNext: () => void
  onBack: () => void
}

interface TierInfo {
  name: string
  title: string
  price: string
  description: string
  features: string[]
  recommended?: boolean
}

export default function MembershipStep({ 
  selectedTier, 
  updateTier, 
  onNext, 
  onBack 
}: MembershipStepProps) {
  const tiers: Record<string, TierInfo> = {
    root: {
      name: "root",
      title: "Root",
      price: "Free",
      description: "Basic access for retail investors",
      features: [
        "Basic company profiles",
        "Public marketplace access",
        "Basic analytics",
        "Community forum access"
      ]
    },
    thrive: {
      name: "thrive",
      title: "Thrive",
      price: "$9.99/month",
      description: "Advanced features for serious investors",
      recommended: true,
      features: [
        "In-depth company profiles",
        "Advanced analytics",
        "Priority access to new listings",
        "Premium support",
        "Exclusive webinars and events"
      ]
    },
    impact: {
      name: "impact",
      title: "Impact",
      price: "By invitation",
      description: "Exclusive tier for top contributors",
      features: [
        "All Thrive features",
        "Exclusive investment opportunities",
        "VIP events and networking",
        "Direct company access",
        "Personalized investment advisory"
      ]
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">
          Choose your{" "}
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
            membership
          </span>
        </h2>
        <p className="text-white/70">
          Select the tier that best fits your investment goals
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <RadioGroup 
          value={selectedTier} 
          onValueChange={(value: "root" | "thrive" | "impact") => updateTier(value)}
          className="space-y-4"
        >
          {Object.entries(tiers).map(([key, tier], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative rounded-xl border p-5 backdrop-blur-sm
                transition-all duration-300 ease-out
                ${selectedTier === key 
                  ? 'border-teal-500/40 bg-gradient-to-r from-teal-500/10 to-purple-500/10 shadow-lg shadow-teal-500/10' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}
                ${key === 'impact' ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              {tier.recommended && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-teal-400 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Recommended
                </div>
              )}
              
              <RadioGroupItem 
                value={key} 
                id={key} 
                disabled={key === 'impact'}
                className={`absolute top-5 left-4 ${selectedTier === key ? "text-teal-400 border-teal-400" : "text-white border-white/40"}`}
              />
              
              <div className="pl-8">
                <div className="flex justify-between items-center">
                  <Label htmlFor={key} className="text-lg font-medium text-white">
                    {tier.title}
                  </Label>
                  <span className="font-bold text-white">{tier.price}</span>
                </div>
                
                <p className="text-sm text-white/70 mt-1">
                  {tier.description}
                </p>
                
                <ul className="mt-4 space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-5 w-5 ${selectedTier === key ? "text-teal-400" : "text-white/60"} shrink-0 mr-2`} />
                      <span className="text-sm text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </RadioGroup>
        
        {selectedTier === 'impact' && (
          <p className="text-sm text-amber-400">
            Impact tier is by invitation only and awarded to top contributing investors.
          </p>
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
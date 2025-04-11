import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Check, Star, Trophy, Crown } from "lucide-react"
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
  icon: React.ReactNode
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
      icon: <Star className="h-5 w-5" />,
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
      icon: <Trophy className="h-5 w-5" />,
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
      icon: <Crown className="h-5 w-5" />,
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
    <div className="space-y-8 py-4">
      <div className="text-center mb-2">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-3 text-black"
        >
          Choose your{" "}
          <span className="bg-gradient-to-r from-green-400 via-[#70f570] to-green-400 text-transparent bg-clip-text animate-flow">
            membership plan
          </span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-black/70 max-w-md mx-auto"
        >
          Select a membership tier that best aligns with your investment goals and preferences
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <RadioGroup 
          value={selectedTier} 
          onValueChange={(value: "root" | "thrive" | "impact") => updateTier(value)}
          className="space-y-6"
        >
          {Object.entries(tiers).map(([key, tier], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`
                relative rounded-xl p-6 transition-all duration-300 ease-out
                ${selectedTier === key 
                  ? 'border-2 border-green-400/30 bg-white shadow-lg' 
                  : 'border border-black/10 bg-white/95 hover:border-green-400/20 hover:bg-white hover:shadow-md'}
                ${key === 'impact' ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              {/* Subtle background pattern for selected tier */}
              {selectedTier === key && (
                <div 
                  className="absolute inset-0 opacity-[0.03] rounded-xl overflow-hidden pointer-events-none"
                  style={{ 
                    backgroundImage: 'radial-gradient(circle at 20px 20px, #70f570 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }}
                />
              )}
              
              {/* Recommended badge */}
              {tier.recommended && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm">
                  Recommended
                </div>
              )}
              
              <RadioGroupItem 
                value={key} 
                id={key} 
                disabled={key === 'impact'}
                className={`absolute top-6 left-6 ${selectedTier === key 
                  ? "text-green-600 border-green-600" 
                  : "text-black/60 border-black/30"}`}
              />
              
              <div className="pl-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                  <Label 
                    htmlFor={key} 
                    className="text-xl font-medium text-black flex items-center cursor-pointer"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      selectedTier === key 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {tier.icon}
                    </div>
                    <span>{tier.title}</span>
                  </Label>
                  <span className={`font-bold text-lg ${selectedTier === key ? 'text-green-600' : 'text-black'} mt-2 sm:mt-0`}>
                    {tier.price}
                  </span>
                </div>
                
                <p className="text-sm text-black/70 mb-4 pl-11">
                  {tier.description}
                </p>
                
                <ul className="space-y-3 pl-11">
                  {tier.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) + (i * 0.05) }}
                      className="flex items-start"
                    >
                      <div className={`p-0.5 rounded-full ${
                        selectedTier === key ? 'bg-green-100' : 'bg-gray-100'
                      } mr-3 mt-0.5`}>
                        <Check className={`h-3.5 w-3.5 ${
                          selectedTier === key ? "text-green-600" : "text-gray-400"
                        }`} />
                      </div>
                      <span className="text-sm text-black">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </RadioGroup>
        
        {selectedTier === 'impact' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-800"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Impact tier is by invitation only</p>
                <p className="text-xs mt-1">This exclusive tier is awarded to our most active and committed investors who demonstrate significant engagement with sustainable investments.</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between pt-6">
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
            className="group relative text-black border-black/10 hover:border-black/20 
              backdrop-blur-sm px-6 py-2 h-auto
              bg-white hover:bg-slate-50
              shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
              transition-all duration-300 ease-out
              hover:translate-y-[-2px] rounded-lg"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </div>
  )
} 
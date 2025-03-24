import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface HomeHeroProps {
  profile: any;
  onNavigate: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

export function HomeHero({ profile, onNavigate }: HomeHeroProps) {
  return (
    <section className="mb-20 pt-8">
      <div className="space-y-5 text-center">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium tracking-wider uppercase 
            bg-emerald-500/10 px-5 py-1.5 rounded-full border border-emerald-400/20">
            <Sparkles className="h-3.5 w-3.5" /> Welcome Back, {profile?.name || profile?.username || profile?.full_name || 'Investor'} <Sparkles className="h-3.5 w-3.5" />
          </span>
        </div>
        <h1>
          <span className="text-4xl md:text-5xl lg:text-7xl font-bold 
            bg-gradient-to-r from-zinc-200 via-white to-zinc-200 bg-clip-text 
            text-transparent tracking-tight leading-tight">
            Your Investment <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">Dashboard</span>
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
          Track your portfolio, discover opportunities, and manage your 
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent font-normal"> sustainable investments</span>
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-6 bg-emerald-600 hover:bg-emerald-500
              text-white text-base font-medium rounded-lg transition-all duration-300"
          >
            View My Dashboard
          </Button>
          <Button
            onClick={() => onNavigate('companies')}
            variant="outline"
            className="px-8 py-6 border-white/10 text-zinc-200 hover:text-white
              hover:bg-zinc-800/50 hover:border-emerald-500/30 text-base font-medium
              rounded-lg transition-all duration-300"
          >
            Explore Investments
          </Button>
        </div>
      </div>
    </section>
  )
} 
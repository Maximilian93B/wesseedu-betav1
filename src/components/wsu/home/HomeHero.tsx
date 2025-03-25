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
          <span className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium tracking-wider uppercase 
            bg-emerald-50 px-5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Welcome Back, {profile?.name || profile?.username || profile?.full_name || 'Investor'} <Sparkles className="h-3.5 w-3.5" />
          </span>
        </div>
        <h1>
          <span className="text-4xl md:text-5xl lg:text-7xl font-bold 
            bg-gradient-to-r from-slate-700 via-slate-900 to-slate-800 bg-clip-text 
            text-transparent tracking-tight leading-tight">
            Your Investment <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Dashboard</span>
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-lg md:text-xl leading-relaxed font-light">
          Track your portfolio, discover opportunities, and manage your 
          <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent font-normal"> sustainable investments</span>
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400
              text-white text-base font-medium rounded-lg transition-all duration-300 shadow-md"
          >
            View My Dashboard
          </Button>
          <Button
            onClick={() => onNavigate('companies')}
            variant="outline"
            className="px-8 py-6 border-slate-200 text-slate-700 hover:text-emerald-600
              hover:bg-slate-50 hover:border-emerald-200 text-base font-medium
              rounded-lg transition-all duration-300 shadow-sm"
          >
            Explore Investments
          </Button>
        </div>
      </div>
    </section>
  )
} 
import { Button } from "@/components/ui/button"
import { ArrowLeft, Leaf } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface NavProps {
  currentView: 'home' | 'dashboard' | 'companies' | 'company-details' | 'saved' | 'communities' | 'community-details'
  onNavigate: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void
  onSignOut: () => void
}

export function HomePageNav({ currentView, onNavigate, onSignOut }: NavProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-200 
        bg-white/95 backdrop-blur-xl shadow-sm sticky top-0 z-50"
    >
      <div className="flex-shrink-0">
        {currentView !== 'home' ? (
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="hover:bg-slate-50 text-slate-600 hover:text-emerald-500 transition-all duration-300"
          >
              <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        ) : (
          <Link className="flex items-center justify-center group" href="/home">
            <div className="relative">
              <div className="absolute -inset-1 bg-emerald-100 blur-sm rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <Leaf className="relative h-6 w-6 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300" />
            </div>
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">
              WeSeedU
            </span>
          </Link>
        )}
      </div>

      <nav className="flex-grow flex justify-center gap-4 sm:gap-6">
        {['home', 'dashboard', 'companies', 'communities', 'saved'].map((view) => (
          <Button
            key={view}
            variant="ghost"
            onClick={() => onNavigate(view as any)}
            className={`relative text-sm font-medium transition-all duration-300 px-3 py-2 ${
              (currentView === view || 
              (view === 'companies' && currentView === 'company-details') ||
              (view === 'communities' && currentView === 'community-details'))
                ? 'text-emerald-600' 
                : 'text-slate-600 hover:text-emerald-500'
            }`}
          >
            {(currentView === view || 
              (view === 'companies' && currentView === 'company-details') ||
              (view === 'communities' && currentView === 'community-details')) && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="capitalize">{view}</span>
          </Button>
        ))}
      </nav>

      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          onClick={onSignOut}
          className="text-sm font-medium text-slate-600 hover:text-emerald-500 hover:bg-slate-50 transition-all duration-300"
        >
          Sign Out
        </Button>
      </div>
    </motion.header>
  )
}
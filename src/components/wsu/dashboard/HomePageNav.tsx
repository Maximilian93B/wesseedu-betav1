"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Leaf } from "lucide-react"
import Link from "next/link"

interface NavProps {
  currentView: 'home' | 'dashboard' | 'companies' | 'company-details' | 'saved'
  onNavigate: (view: 'home' | 'dashboard' | 'companies' | 'saved') => void
  onSignOut: () => void
}

export function HomePageNav({ currentView, onNavigate, onSignOut }: NavProps) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-emerald-400/5 
      bg-black/50 backdrop-blur-sm relative z-10">
      <div className="flex items-center">
        {currentView !== 'home' ? (
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mr-4 hover:bg-white/5 text-zinc-400 hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        ) : (
          <Link className="flex items-center justify-center group" href="/home">
            <Leaf className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">
              WeSeedU
            </span>
          </Link>
        )}
      </div>

      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className={`text-sm font-medium ${
            currentView === 'home' ? 'text-emerald-400' : 'text-zinc-400'
          } hover:text-emerald-400 transition-colors`}
        >
          Home
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavigate('dashboard')}
          className={`text-sm font-medium ${
            currentView === 'dashboard' ? 'text-emerald-400' : 'text-zinc-400'
          } hover:text-emerald-400 transition-colors`}
        >
          Dashboard
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavigate('companies')}
          className={`text-sm font-medium ${
            currentView === 'companies' || currentView === 'company-details' 
              ? 'text-emerald-400' 
              : 'text-zinc-400'
          } hover:text-emerald-400 transition-colors`}
        >
          Companies
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavigate('saved')}
          className={`text-sm font-medium ${
            currentView === 'saved' ? 'text-emerald-400' : 'text-zinc-400'
          } hover:text-emerald-400 transition-colors`}
        >
          Saved
        </Button>
        <Button
          variant="ghost"
          onClick={onSignOut}
          className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          Sign Out
        </Button>
      </nav>
    </header>
  )
}
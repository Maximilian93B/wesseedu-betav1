'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, Zap, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import LoginForm from "@/components/wsu/LoginForm"
import { useLogin } from '@/hooks/use-login'


export function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { loading } = useLogin()

  const handleLoginSuccess = () => {
    setIsLoginOpen(false)
  }

  // Move the Dialog definition here
  const loginDialog = (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold 
            shadow-md hover:shadow-emerald-500/25 transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-emerald-500/20">
        <DialogTitle className="sr-only">Login Form</DialogTitle>
        <DialogDescription className="sr-only">
          Enter your credentials to log in to your account
        </DialogDescription>
        <LoginForm onSuccess={handleLoginSuccess} />
      </DialogContent>
    </Dialog>
  );

  return (
    <nav className="w-full z-50 backdrop-blur-sm border-b border-emerald-500/20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Zap className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                WeSeedU
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/mobile-first-weSeedU">The Platform</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/solutions">Solutions</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            
            {loginDialog}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-emerald-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/mobile-first-weSeedU">The Platform</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/solutions">Solutions</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/30" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            {loginDialog}
          </div>
        </div>
      )}
    </nav>
  )
}


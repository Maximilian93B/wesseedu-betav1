'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { GithubIcon, MoonIcon, Menu, Zap, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import LoginForm from "@/components/wsu/LoginForm"
import { useLogin } from '@/hooks/use-login'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { loading } = useLogin()


  const handleLoginSuccess = () => {
    setIsLoginOpen(false)
  }

  return (
    <nav className=" w-full z-50 backdrop-blur-sm border-b border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Zap className="w-8 h-8 text-teal-500 group-hover:text-teal-400 transition-colors" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                WeSeedU
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/mobile-first-weSeedU">The Platform</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/solutions">Solutions</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            
            {/* Login Button */}
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-teal-500 to-teal-400 
                    hover:from-teal-600 hover:to-teal-500 text-white font-semibold 
                    shadow-md hover:shadow-teal-500/25 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <LoginForm onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/mobile-first-weSeedU">The Platform</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/solutions">Solutions</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-400 
                    hover:from-teal-600 hover:to-teal-500 text-white"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <LoginForm onSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </nav>
  )
}


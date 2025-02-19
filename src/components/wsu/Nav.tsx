'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { GithubIcon, MoonIcon, Zap } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import LoginForm from "@/components/wsu/LoginForm"
import { useLogin } from '@/hooks/use-login'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { loading } = useLogin()
  const pathname = usePathname()

  const handleLoginSuccess = () => {
    setIsLoginOpen(false)
  }

  return (
    <nav className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Zap className="w-8 h-8 text-teal-500" />
            <span className="ml-2 text-xl font-bold text-white">WeSeedU</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-400 hover:text-white"
            asChild>
              <Link href="/mobile-first-weSeedU">
                The Platform
              </Link>
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white"
            asChild>
              <Link href="/solutions">
                Solutions
              </Link>
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white"
            asChild>
              <Link href="/about">
                About
              </Link>
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white"
            asChild>
              <Link href="/contact">
                Contact
              </Link>
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white p-2">
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white p-2">
              <MoonIcon className="h-5 w-5" />
            </Button>
            
            {/* Login Modal */}
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
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
      </div>
    </nav>
  )
}


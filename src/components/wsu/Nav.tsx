import { Button } from "@/components/ui/button"
import { GithubIcon, MoonIcon, Zap } from "lucide-react"

export function Navigation() {
  return (
    <nav className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Zap className="w-8 h-8 text-teal-500" />
            <span className="ml-2 text-xl font-bold text-white">WeSeedU</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Platform
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Solutions
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              About
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Contact
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white p-2">
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white p-2">
              <MoonIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}


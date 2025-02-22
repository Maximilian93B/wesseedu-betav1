"use client"

import { Sidebar } from "@/components/wsu/dashboard/Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu} from "lucide-react"

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-screen bg-black">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-40 bg-black text-emerald-400 border-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300 transition-all duration-200"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-black border-r border-emerald-500/20">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col h-full">
        <main className="flex-1 overflow-y-auto bg-black">
          <div className="container mx-auto py-6 px-4 md:px-6">{children}</div>
        </main>
      </div>
    </div>
  )
}



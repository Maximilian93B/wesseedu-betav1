import { Button } from "@/components/ui/button"

export function PromotionalBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 text-center text-sm text-white flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center gap-2">
            Over $35 trillion invested in sustainable assets globally 🌱
          </div>
          <div className="flex-1 text-right">
            <Button variant="link" className="text-white hover:text-white/90 p-0">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


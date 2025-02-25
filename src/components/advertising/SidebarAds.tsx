import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SponsoredAd {
  id: string
  name: string
  logo: string
  description: string
  impact_score: number
  cta: string
}

export function SidebarAds() {
  const sponsoredAds: SponsoredAd[] = [
    {
      id: "1",
      name: "EcoTech Solutions",
      logo: "/companies/eco-tech.png",
      description: "Revolutionary carbon capture technology",
      impact_score: 92,
      cta: "Learn More"
    },
    // Add more ads as needed
  ]

  return (
    <aside className="w-80 fixed left-0 top-14 h-[calc(100vh-3.5rem)] 
      border-r border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="h-full px-6 py-8 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 
        scrollbar-track-transparent">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <span className="text-sm font-medium text-zinc-400">
            Featured Opportunities
          </span>
          <Badge variant="outline" 
            className="bg-emerald-400/5 text-emerald-400 border-emerald-400/20 text-xs">
            Sponsored
          </Badge>
        </div>

        {/* Main Ads Section */}
        <div className="space-y-8">
          {sponsoredAds.map((ad) => (
            <Card key={ad.id} 
              className="group bg-black/30 border border-white/5 
                hover:border-emerald-400/20 transition-all duration-300">
              <CardContent className="p-6"> {/* Increased padding */}
                {/* Company Info - Better internal spacing */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden 
                    border border-white/10 flex-shrink-0">
                    <Image src={ad.logo} alt={ad.name} fill sizes="100vw"
                      className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <h3 className="text-sm font-medium text-white truncate">
                      {ad.name}
                    </h3>
                    <Badge className="bg-emerald-400/10 text-emerald-400 text-xs">
                      Impact Score: {ad.impact_score}
                    </Badge>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {ad.description}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full py-2 px-4 text-xs font-medium 
                  bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 
                  rounded-lg transition-colors">
                  {ad.cta}
                </button>
              </CardContent>
            </Card>
          ))}

          {/* Featured Project Card */}
          <Card className="bg-black/30 border border-white/5 overflow-hidden">
            <div className="relative h-40 w-full"> {/* Increased height */}
              <Image src="/projects/featured.png" alt="Featured Project" fill
                sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
              <div className="absolute bottom-4 left-4 right-4 space-y-3">
                <Badge className="bg-emerald-400/10 text-emerald-400 text-xs">
                  Featured Project
                </Badge>
                <h4 className="text-sm font-medium text-white">
                  Green Energy Initiative
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Join the revolution in sustainable energy production
                </p>
              </div>
            </div>
          </Card>


          {/* Newsletter Section */}
           <Card className="bg-gradient-to-br from-emerald-400/10 via-emerald-400/5 
            to-transparent border border-emerald-400/20">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <h4 className="text-sm font-medium text-white">
                  Stay Updated
                </h4>
                <p className="text-xs text-zinc-400">
                  Get weekly insights on sustainable investments
                </p>
              </div>
              
              <div className="space-y-3">
                <input type="email" placeholder="Enter your email"
                  className="w-full px-4 py-2.5 text-xs bg-black/30 border border-white/10 
                    rounded-lg text-white placeholder:text-zinc-500 focus:outline-none 
                    focus:border-emerald-400/50" />
                <button className="w-full py-2.5 px-4 text-xs font-medium 
                  bg-emerald-400 hover:bg-emerald-500 text-black 
                  rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-xs text-zinc-500 text-center">
            Interested in advertising? 
            <a href="#" className="text-emerald-400 ml-1.5 hover:text-emerald-300">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </aside>
  )
} 
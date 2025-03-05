import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

// Update interface to match your DB schema
interface SponsoredAd {
  id: string
  name: string
  logo: string
  description: string
  impact_score: number
  cta: string
  url: string
  company_id: string
  active: boolean
  priority: number
  placement: string
  created_at: string
  updated_at: string
}

export function SidebarAds() {
  const [sponsoredAd, setSponsoredAd] = useState<SponsoredAd | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        setIsLoading(true);
        // Fetch only one ad with sidebar placement
        const response = await fetch('/api/protected/sponsored-ads?placement=sidebar&limit=1');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sponsored ad');
        }
        
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setSponsoredAd(data[0]);
        } else if (data.error) {
          throw new Error(data.error);
        } else if (Array.isArray(data) && data.length === 0) {
          // No sidebar ads found
          setSponsoredAd(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching sponsored ad:', err);
        setError('Unable to load sponsored content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAd();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <aside className="w-80 fixed left-0 top-14 h-[calc(100vh-3.5rem)] 
        border-r border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="h-full px-6 py-8 flex items-center justify-center">
          <p className="text-sm text-zinc-400">Loading sponsored content...</p>
        </div>
      </aside>
    );
  }

  // Error state
  if (error) {
    return (
      <aside className="w-80 fixed left-0 top-14 h-[calc(100vh-3.5rem)] 
        border-r border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="h-full px-6 py-8 flex items-center justify-center">
          <p className="text-sm text-zinc-400">{error}</p>
        </div>
      </aside>
    );
  }

  // No sponsored ad available
  if (!sponsoredAd) {
    return (
      <aside className="w-80 fixed left-0 top-14 h-[calc(100vh-3.5rem)] 
        border-r border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="h-full px-6 py-8 flex items-center justify-center">
          <p className="text-sm text-zinc-400">No sponsored content available</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 fixed left-0 top-14 h-[calc(100vh-3.5rem)] 
      border-r border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="h-full px-6 py-8 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 
        scrollbar-track-transparent">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <span className="text-sm font-medium text-zinc-400">
            Featured Opportunity
          </span>
          <Badge variant="outline" 
            className="bg-emerald-400/5 text-emerald-400 border-emerald-400/20 text-xs">
            Sponsored
          </Badge>
        </div>

        {/* Sponsored Ad */}
        <Card key={sponsoredAd.id} 
          className="group bg-black/30 border border-white/5 
            hover:border-emerald-400/20 transition-all duration-300">
          <CardContent className="p-6">
            {/* Company Info */}
            <div className="flex items-start gap-5 mb-6">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden 
                border border-white/10 flex-shrink-0">
                <Image src={sponsoredAd.logo} alt={sponsoredAd.name} fill sizes="100vw"
                  className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <h3 className="text-sm font-medium text-white truncate">
                  {sponsoredAd.name}
                </h3>
                <Badge className="bg-emerald-400/10 text-emerald-400 text-xs">
                  Impact Score: {sponsoredAd.impact_score}
                </Badge>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {sponsoredAd.description}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a href={sponsoredAd.url} target="_blank" rel="noopener noreferrer">
              <button className="w-full py-2 px-4 text-xs font-medium 
                bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 
                rounded-lg transition-colors">
                {sponsoredAd.cta}
              </button>
            </a>
          </CardContent>
        </Card>

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
  );
} 
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles, Star, CheckCircle2 } from "lucide-react"

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
  benefits?: string[] // Add benefits field if available in your API
  tagline?: string // Add tagline field if available in your API
}

export function SidebarAds() {
  const [sponsoredAd, setSponsoredAd] = useState<SponsoredAd | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
          console.log('Fetched ad data:', data[0]); // Log the data to see its structure
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
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-12 h-12 rounded-full border-2 border-emerald-400/20 border-t-emerald-400 animate-spin mb-4"></div>
        <p className="text-sm text-zinc-400">Loading sponsored content...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-zinc-400">{error}</p>
      </div>
    );
  }

  // No sponsored ad available
  if (!sponsoredAd) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-zinc-400">No sponsored content available</p>
      </div>
    );
  }

  // Default benefits if none provided in the API
  const defaultBenefits = [
    "Higher long-term returns with positive impact",
    "Support innovation that addresses climate challenges",
    "Join a community of forward-thinking investors"
  ];

  // Use benefits from API if available, otherwise use defaults
  const benefits = sponsoredAd.benefits || defaultBenefits;

  return (
    <div className="overflow-y-auto h-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-emerald-400 mr-2" />
          <span className="text-sm font-medium text-zinc-200">
            {sponsoredAd.tagline || "Featured Opportunity"}
          </span>
        </div>
        <Badge variant="outline" 
          className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-xs px-2.5 py-0.5">
          Sponsored
        </Badge>
      </motion.div>

      {/* Sponsored Ad */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative bg-gradient-to-br from-black to-emerald-950/20 border border-white/5 
            hover:border-emerald-400/30 transition-all duration-300 overflow-hidden rounded-xl"
        >
          {/* Animated gradient background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-emerald-400/10 to-emerald-500/5 opacity-0 
            group-hover:opacity-100 transition-opacity duration-700 ${isHovered ? 'animate-gradient-x' : ''}`}></div>
          
          <CardContent className="p-6 relative z-10">
            {/* Company Info */}
            <div className="flex items-start gap-5 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-16 h-16 rounded-lg overflow-hidden 
                  border border-white/10 flex-shrink-0 shadow-lg shadow-emerald-900/20"
              >
                {sponsoredAd.logo ? (
                  <>
                    <Image 
                      src={sponsoredAd.logo} 
                      alt={`${sponsoredAd.name} logo`} 
                      fill 
                      sizes="100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-900/20">
                    <Sparkles className="h-8 w-8 text-emerald-400" />
                  </div>
                )}
              </motion.div>
              
              <div className="min-w-0 flex-1 space-y-3">
                <h3 className="text-base font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
                  {sponsoredAd.name}
                </h3>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(sponsoredAd.impact_score) 
                          ? 'text-emerald-400 fill-emerald-400' 
                          : 'text-zinc-700'
                      } ${isHovered && i < Math.floor(sponsoredAd.impact_score) ? 'animate-pulse' : ''}`} 
                    />
                  ))}
                  <span className="ml-2 text-xs font-medium text-emerald-400">
                    Impact Score: {sponsoredAd.impact_score}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                  {sponsoredAd.description}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a 
                href={sponsoredAd.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full py-3 px-4 text-sm font-medium 
                  bg-gradient-to-r from-emerald-500 to-emerald-600
                  hover:from-emerald-400 hover:to-emerald-500
                  text-white rounded-lg transition-all duration-300
                  flex items-center justify-center group shadow-lg shadow-emerald-900/20">
                  {sponsoredAd.cta}
                  <ArrowUpRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </a>
            </motion.div>
            
            {/* Benefits */}
            {benefits.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5 pt-4 border-t border-white/5 overflow-hidden"
              >
                <h4 className="text-xs font-medium text-emerald-400 mb-2">Why invest in {sponsoredAd.name}?</h4>
                <ul className="text-xs text-zinc-400 space-y-1.5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 pt-6 border-t border-white/5"
      >
        <p className="text-xs text-zinc-500 text-center">
          Interested in advertising? 
          <a href="/contact" className="text-emerald-400 ml-1.5 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">
            Learn more
          </a>
        </p>
      </motion.div>
    </div>
  );
} 
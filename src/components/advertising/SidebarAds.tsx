import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Sparkles, Star, CheckCircle2, ExternalLink } from "lucide-react"

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

  // Loading state with improved animation
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 relative bg-white rounded-xl">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-emerald-400/30"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin mb-4"></div>
          <motion.div
            className="absolute -inset-3 bg-emerald-500/10 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className="text-sm text-zinc-500 relative z-10">Loading sponsored content...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12 relative bg-white rounded-xl">
        <motion.div
          className="absolute inset-0 bg-red-500/5 rounded-xl"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <span className="text-sm text-zinc-500 relative z-10">{error}</span>
      </div>
    );
  }

  // No sponsored ad available
  if (!sponsoredAd) {
    return (
      <div className="flex items-center justify-center py-12 relative bg-white rounded-xl">
        <motion.div
          className="absolute inset-0 bg-emerald-500/5 rounded-xl"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <span className="text-sm text-zinc-500 relative z-10">No sponsored content available</span>
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
    <div className="overflow-y-auto h-full relative bg-white rounded-xl">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500/40"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Header with improved animation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6 relative z-10 p-6 pt-8"
      >
        <div className="flex items-center">
          <div className="relative">
            <Sparkles className="h-4 w-4 text-emerald-600 mr-2" />
            <motion.div
              className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-sm"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-sm font-medium bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            {sponsoredAd.tagline || "Featured Opportunity"}
          </span>
        </div>
        <Badge
          className="relative overflow-hidden bg-emerald-50 text-emerald-600 border-emerald-200 text-xs px-2.5 py-0.5"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          />
          <span className="relative z-10">Sponsored</span>
        </Badge>
      </motion.div>

      {/* Sponsored Ad with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 px-6"
      >
        <Card 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 
            hover:border-emerald-300 transition-all duration-300 overflow-hidden rounded-xl shadow-sm hover:shadow-md"
        >
          {/* Top wave decoration */}
          <div className="absolute top-0 left-0 w-full h-8 overflow-hidden opacity-60">
            <svg
              className="absolute top-0 w-full"
              preserveAspectRatio="none"
              viewBox="0 0 1200 120"
              height="12"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                animate={{ 
                  d: [
                    "M0,0 C400,40 800,0 1200,30 L1200,0 L0,0 Z",
                    "M0,0 C400,15 800,45 1200,30 L1200,0 L0,0 Z"
                  ]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }}
                fill="#10b981"
                opacity="0.15"
              />
            </svg>
          </div>
          
          {/* Animated gradient background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 
            group-hover:opacity-100 transition-opacity duration-700 ${isHovered ? 'animate-gradient-x' : ''}`}></div>
          
          <CardContent className="p-6 relative z-10">
            {/* Company Info with improved animations */}
            <div className="flex items-start gap-5 mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-16 h-16 rounded-lg overflow-hidden 
                  border border-emerald-100 flex-shrink-0 shadow-md shadow-emerald-100"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {sponsoredAd.logo ? (
                  <>
                    <Image 
                      src={sponsoredAd.logo} 
                      alt={`${sponsoredAd.name} logo`} 
                      fill 
                      sizes="100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                    <Sparkles className="h-8 w-8 text-emerald-500" />
                  </div>
                )}
              </motion.div>
              
              <div className="min-w-0 flex-1 space-y-3">
                <motion.h3 
                  whileHover={{ x: 3 }}
                  className="text-base font-semibold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent truncate group-hover:text-emerald-600 transition-colors"
                >
                  {sponsoredAd.name}
                </motion.h3>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={i < Math.floor(sponsoredAd.impact_score) && isHovered ? 
                        { rotate: [-5, 5, -5] } : {}
                      }
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <Star 
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(sponsoredAd.impact_score) 
                            ? 'text-emerald-500 fill-emerald-500' 
                            : 'text-zinc-200'
                        }`} 
                      />
                    </motion.div>
                  ))}
                  <span className="ml-2 text-xs font-medium text-emerald-600">
                    Impact Score: {sponsoredAd.impact_score}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-600 line-clamp-3 leading-relaxed group-hover:text-zinc-800 transition-colors">
                  {sponsoredAd.description}
                </p>
              </div>
            </div>

            {/* CTA Button with improved animation */}
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
                  bg-gradient-to-r from-emerald-600 to-emerald-500
                  hover:from-emerald-500 hover:to-emerald-400
                  text-white rounded-lg transition-all duration-300
                  flex items-center justify-center group shadow-md shadow-emerald-200 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0"
                    initial={{ x: -100, opacity: 0 }}
                    whileHover={{ x: 200, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <span className="relative z-10">{sponsoredAd.cta}</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 3, y: -3 }}
                    className="relative z-10 ml-2"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.div>
                </button>
              </a>
            </motion.div>
            
            {/* Benefits with improved animations */}
            <AnimatePresence>
              {isHovered && benefits.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 pt-4 border-t border-emerald-100 overflow-hidden"
                >
                  <h4 className="text-xs font-medium bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent mb-3">
                    Why invest in {sponsoredAd.name}?
                  </h4>
                  <ul className="text-xs text-zinc-600 space-y-2.5">
                    {benefits.map((benefit, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative mr-2 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                          <motion.div
                            className="absolute -inset-1 bg-emerald-400/20 rounded-full blur-sm"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                          />
                        </div>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden opacity-60">
              <svg
                className="absolute bottom-0 w-full"
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                height="12"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  animate={{ 
                    d: [
                      "M0,64 C400,30 800,110 1200,64 L1200,120 L0,120 Z",
                      "M0,64 C400,100 800,40 1200,64 L1200,120 L0,120 Z"
                    ]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                  fill="#10b981"
                  opacity="0.15"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer with enhanced styling */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 pt-4 border-t border-emerald-100 relative z-10 px-6 pb-6"
      >
        <div className="text-xs text-zinc-500 text-center group">
          Interested in advertising?
          <a href="/contact" className="relative inline-flex text-emerald-600 ml-1.5 hover:text-emerald-700 transition-colors group">
            <span>Learn more</span>
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-px left-0 right-0 h-px bg-emerald-500/50"
            />
            <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </motion.div>
    </div>
  );
} 
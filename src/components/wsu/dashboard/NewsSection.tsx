"use client"

import React, { useState, useEffect } from "react"
import { Newspaper, Calendar, Link2, ExternalLink, Bookmark, BookmarkCheck, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"

// Interface for news items
interface NewsItem {
  id: string
  title: string
  source: string
  url: string
  published_at: string
  category: string
  is_featured: boolean
  image_url: string // Make image_url required
  summary?: string
}

// Interface for saved article response
interface SavedArticle {
  article_id: string
}

// Placeholder news data
const PLACEHOLDER_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "CleanEco Secures $50M Funding for Carbon Capture Technology",
    source: "Green Investor",
    url: "#",
    published_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    category: "Funding",
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1569936708126-28188d1df943?q=80&w=800&auto=format&fit=crop",
    summary: "CleanEco's breakthrough carbon capture technology has secured significant funding to scale operations globally."
  },
  {
    id: "news-2", 
    title: "Solar Industries Reports Record Q3 Growth with 35% Increase in Installations",
    source: "EcoNews",
    url: "#",
    published_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    category: "Market",
    is_featured: false,
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    summary: "Solar adoption continues to accelerate with unprecedented growth in both residential and commercial sectors."
  },
  {
    id: "news-3",
    title: "New ESG Regulations Expected to Impact Investment Strategies in 2024",
    source: "Sustainable Finance",
    url: "#",
    published_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    category: "Regulation",
    is_featured: false,
    image_url: "https://images.unsplash.com/photo-1638913662295-9630035ef770?q=80&w=800&auto=format&fit=crop",
    summary: "Upcoming regulatory changes will require more stringent sustainability reporting from publicly traded companies."
  },
  {
    id: "news-4",
    title: "OceanClean Launches Revolutionary Plastic Removal System for Coastal Waters",
    source: "Marine Tech Today",
    url: "#",
    published_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    category: "Innovation",
    is_featured: true,
    image_url: "https://images.unsplash.com/photo-1565641644012-826582e2fe30?q=80&w=800&auto=format&fit=crop",
    summary: "The new system can remove up to 90% of microplastics from coastal waters without harming marine ecosystems."
  },
  {
    id: "news-5",
    title: "Green Building Materials Market Expected to Reach $650B by 2030",
    source: "Construction Weekly",
    url: "#",
    published_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    category: "Market",
    is_featured: false,
    image_url: "https://images.unsplash.com/photo-1599619585752-c3de37eec4a9?q=80&w=800&auto=format&fit=crop",
    summary: "Sustainable construction materials are seeing unprecedented demand as developers commit to carbon-neutral building practices."
  }
];

// Initial saved articles (first and third article are saved)
const INITIAL_SAVED_ARTICLES = new Set(["news-1", "news-4"]);

export function NewsSection() {
  const [hoveredNewsId, setHoveredNewsId] = useState<string | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch news items (now using placeholder data)
  useEffect(() => {
    // Simulate API delay
    const loadPlaceholderData = async () => {
      try {
        setLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Set placeholder news data
        setNewsItems(PLACEHOLDER_NEWS);
        
        // Set placeholder saved articles
        setSavedArticles(INITIAL_SAVED_ARTICLES);
      } catch (error) {
        console.error("Failed to load placeholder news:", error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlaceholderData();
  }, []);

  // Toggle saving an article
  const toggleSaveArticle = async (articleId: string) => {
    try {
      // For placeholder data, we'll just update the local state
      const isSaved = savedArticles.has(articleId);
      
      // Update local state
      const newSavedArticles = new Set(savedArticles);
      if (isSaved) {
        newSavedArticles.delete(articleId);
        toast({
          title: "Article removed from saved list",
          variant: "default"
        });
      } else {
        newSavedArticles.add(articleId);
        toast({
          title: "Article saved successfully",
          variant: "default"
        });
      }
      
      setSavedArticles(newSavedArticles);
    } catch (error) {
      console.error("Error toggling article save:", error);
      toast({
        title: "Failed to save article",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="h-full overflow-y-auto relative bg-white rounded-xl">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Newspaper className="w-4 h-4 text-emerald-600" />
            <motion.div
              className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-sm"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-sm font-medium bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            Latest Updates
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
          <span className="relative z-10">Live Feed</span>
        </Badge>
      </motion.div>

      {/* News Feed with enhanced animations */}
      <div className="space-y-4 relative z-10 px-6">
        {loading ? (
          // Enhanced skeleton loading state
          Array(5).fill(0).map((_, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gradient-to-r from-emerald-50/80 to-white border border-emerald-100 rounded-lg p-4 relative overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/3 to-emerald-500/0 animate-pulse"></div>
              <div className="flex gap-4">
                <Skeleton className="h-16 w-24 rounded-md bg-emerald-100/50 flex-shrink-0" />
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-emerald-100/50" />
                  <Skeleton className="h-4 w-1/2 bg-emerald-100/50" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20 bg-emerald-100/50" />
                    <Skeleton className="h-3 w-16 bg-emerald-100/50" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : newsItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-zinc-500">No news articles available</p>
          </div>
        ) : (
          // Enhanced news items
          newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              onMouseEnter={() => setHoveredNewsId(item.id)}
              onMouseLeave={() => setHoveredNewsId(null)}
              className={`relative group bg-gradient-to-r from-emerald-50/80 to-white border border-emerald-100
                hover:border-emerald-300 rounded-lg p-4 transition-all duration-300
                ${hoveredNewsId === item.id ? 'shadow-md shadow-emerald-100' : 'shadow-sm'}
                ${item.is_featured ? 'ring-1 ring-emerald-200' : ''}
                overflow-hidden
              `}
            >
              {/* Hovered state background effect */}
              <AnimatePresence>
                {hoveredNewsId === item.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Animated wave at bottom on hover */}
              <AnimatePresence>
                {hoveredNewsId === item.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 w-full h-10 overflow-hidden pointer-events-none"
                  >
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
                        opacity="0.1"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Featured badge with glow effect */}
              {item.is_featured && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-1.5 bg-emerald-500/20 rounded-full blur-md"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-600 to-emerald-500 text-white relative z-10">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Featured
                    </div>
                  </div>
                </div>
              )}
              
              {/* Article content with image */}
              <div className="flex gap-4 relative">
                {/* Article image with improved hover animation */}
                <div className="flex-shrink-0 w-24 h-16 overflow-hidden rounded-md relative shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Article text content */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-sm font-medium leading-snug text-zinc-800 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.summary && (
                    <p className="text-xs text-zinc-500 line-clamp-2 group-hover:text-zinc-600 transition-colors">
                      {item.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">{item.source}</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(item.published_at), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleSaveArticle(item.id)}
                        className={`h-7 w-7 p-0 rounded-full relative overflow-hidden
                          ${savedArticles.has(item.id) 
                            ? 'text-emerald-600 hover:text-emerald-700' 
                            : 'text-zinc-400 hover:text-zinc-500'} 
                          opacity-80 hover:opacity-100 hover:bg-emerald-50 transition-all duration-200`}
                      >
                        {savedArticles.has(item.id) && (
                          <motion.div
                            className="absolute inset-0 bg-emerald-500/10 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.5, 1] }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        {savedArticles.has(item.id) ? (
                          <BookmarkCheck className="h-3.5 w-3.5 relative z-10" />
                        ) : (
                          <Bookmark className="h-3.5 w-3.5 relative z-10" />
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(item.url, '_blank')}
                        className="h-7 w-7 p-0 rounded-full text-zinc-400 hover:text-zinc-500
                          opacity-80 hover:opacity-100 hover:bg-emerald-50 transition-all duration-200 relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-emerald-500/10 rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <ExternalLink className="h-3.5 w-3.5 relative z-10" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {/* View more button with enhanced styling */}
      {!loading && newsItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 mb-8 text-center relative z-10 px-6"
        >
          <div className="relative inline-block group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/10 to-emerald-500/10 rounded-md opacity-0 group-hover:opacity-100"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/news', '_self')}
              className="relative w-full px-8 py-5 text-sm border-emerald-200 text-emerald-700 
                hover:text-emerald-800 hover:border-emerald-300
                bg-white hover:bg-emerald-50
                transition-all duration-300 z-10 shadow-sm hover:shadow-md"
            >
              View All Updates
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Bottom wave decoration */}
      <div className="h-6 relative overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          height="20"
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
            opacity="0.1"
          />
        </svg>
      </div>
    </div>
  )
}


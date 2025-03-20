"use client"

import React, { useState, useEffect } from "react"
import { Newspaper, Calendar, Link2, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react"
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
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-zinc-200">Latest Updates</span>
        </div>
        <Badge variant="outline" 
          className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-xs px-2.5 py-0.5">
          Live Feed
        </Badge>
      </motion.div>

      {/* News Feed */}
      <div className="space-y-5">
        {loading ? (
          // Skeleton loading state
          Array(5).fill(0).map((_, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-zinc-900/30 border border-white/5 rounded-lg p-4"
            >
              <div className="flex gap-4">
                <Skeleton className="h-16 w-24 rounded-md bg-zinc-800/50 flex-shrink-0" />
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-zinc-800/50" />
                  <Skeleton className="h-4 w-1/2 bg-zinc-800/50" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20 bg-zinc-800/50" />
                    <Skeleton className="h-3 w-16 bg-zinc-800/50" />
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
          // Actual news items
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
              className={`relative group bg-zinc-900/30 border border-white/5 
                hover:border-emerald-500/20 rounded-lg p-4 transition-all duration-300
                ${hoveredNewsId === item.id ? 'bg-zinc-900/50 shadow-lg shadow-emerald-500/5' : ''}
                ${item.is_featured ? 'ring-1 ring-emerald-500/20' : ''}
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
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-lg pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              {/* Featured tag */}
              {item.is_featured && (
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/80 text-white">
                    Featured
                  </span>
                </div>
              )}
              
              {/* Article content with image */}
              <div className="flex gap-4">
                {/* Article image */}
                <div className="flex-shrink-0 w-24 h-16 overflow-hidden rounded-md">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Article text content */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-sm font-medium leading-snug text-zinc-200 line-clamp-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.summary && (
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {item.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="font-medium text-emerald-400/80">{item.source}</span>
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
                        className={`h-7 w-7 p-0 rounded-full
                          ${savedArticles.has(item.id) 
                            ? 'text-emerald-400 hover:text-emerald-300' 
                            : 'text-zinc-400 hover:text-zinc-300'} 
                          opacity-70 hover:opacity-100 hover:bg-white/5 transition-all duration-200`}
                      >
                        {savedArticles.has(item.id) ? (
                          <BookmarkCheck className="h-3.5 w-3.5" />
                        ) : (
                          <Bookmark className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(item.url, '_blank')}
                        className="h-7 w-7 p-0 rounded-full text-zinc-400 hover:text-zinc-300
                          opacity-70 hover:opacity-100 hover:bg-white/5 transition-all duration-200"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {/* View more button */}
      {!loading && newsItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('/news', '_self')}
            className="w-full text-xs border-white/10 text-zinc-400 
              hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 
              transition-all duration-300"
          >
            View All Updates
          </Button>
        </motion.div>
      )}
    </div>
  )
}


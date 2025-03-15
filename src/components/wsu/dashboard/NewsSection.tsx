"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Clock, ExternalLink, Newspaper, Share2, Sparkles, TrendingUp } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface NewsItem {
  id: number
  title: string
  category: string
  summary: string
  time: string
  image?: string
  source?: string
  trending?: boolean
}

export function NewsSection() {
  const [hoveredNewsId, setHoveredNewsId] = useState<number | null>(null);
  
  const news: NewsItem[] = [
    {
      id: 1,
      title: "New Sustainable Energy Project Launched",
      category: "Energy",
      summary: "Revolutionary solar project aims to power 100,000 homes with zero emissions and create thousands of green jobs in the process.",
      time: "2h ago",
      image: "/images/news/solar-panels.jpg",
      source: "CleanTech Today",
      trending: true
    },
    {
      id: 2,
      title: "Green Tech Startup Raises $50M in Funding",
      category: "Technology",
      summary: "Breakthrough in carbon capture technology attracts major investors including prominent venture capital firms focused on climate solutions.",
      time: "4h ago",
      image: "/images/news/startup-funding.jpg",
      source: "Tech Innovators"
    },
    {
      id: 3,
      title: "Global Climate Summit Announces New Initiatives",
      category: "Policy",
      summary: "World leaders commit to ambitious carbon reduction targets and pledge financial support for developing nations to transition to clean energy.",
      time: "6h ago",
      image: "/images/news/climate-summit.jpg",
      source: "Global News Network",
      trending: true
    },
    {
      id: 4,
      title: "Sustainable Fashion Brand Goes Public",
      category: "Business",
      summary: "Eco-friendly clothing manufacturer completes successful IPO, highlighting growing investor interest in sustainable consumer goods.",
      time: "12h ago",
      image: "/images/news/sustainable-fashion.jpg",
      source: "Business Insider"
    },
  ]

  return (
    <aside className="w-80 fixed right-0 top-14 h-[calc(100vh-3.5rem)] 
      border-l border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="h-full px-6 py-8 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 
        scrollbar-track-transparent">
        
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
        <div className="space-y-4">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredNewsId(item.id)}
              onMouseLeave={() => setHoveredNewsId(null)}
            >
              <Card className="group relative bg-gradient-to-br from-black to-zinc-950/20 border border-white/5 
                hover:border-emerald-400/30 transition-all duration-300 overflow-hidden rounded-xl">
                
                {/* Animated gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-emerald-400/10 to-emerald-500/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-700 ${hoveredNewsId === item.id ? 'animate-gradient-x' : ''}`}></div>
                
                <CardContent className="p-4 space-y-3 relative z-10">
                  {/* Header with category and time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-400/10 text-emerald-400 text-xs">
                        {item.category}
                      </Badge>
                      {item.trending && (
                        <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-zinc-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.time}
                    </div>
                  </div>
                  
                  {/* News content */}
                  <div className="flex gap-3">
                    {item.image && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden 
                        border border-white/10 flex-shrink-0 shadow-lg shadow-emerald-900/10">
                        <div className="absolute inset-0 bg-emerald-900/20 z-10"></div>
                        <div className="w-full h-full bg-emerald-900/20 flex items-center justify-center">
                          <Newspaper className="h-6 w-6 text-emerald-400/50" />
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-white mb-1 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 group-hover:text-zinc-300 transition-colors">
                        {item.summary}
                      </p>
                      {item.source && (
                        <p className="text-xs text-zinc-500 mt-1 flex items-center">
                          <span>Source:</span>
                          <span className="ml-1 text-emerald-400">{item.source}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <motion.div 
                    className="flex items-center justify-between pt-2"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: hoveredNewsId === item.id ? 1 : 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="ghost" 
                        className="text-xs text-emerald-400 hover:text-emerald-300 
                          hover:bg-emerald-400/10 px-2 py-1 h-auto flex items-center"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        className="text-xs text-zinc-400 hover:text-zinc-300 
                          hover:bg-white/5 px-2 py-1 h-auto flex items-center"
                      >
                        Share
                        <Share2 className="h-3 w-3 ml-1" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Breaking News Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-br from-emerald-950/40 via-emerald-900/20 to-black 
            border border-emerald-400/20 overflow-hidden relative rounded-xl">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <CardContent className="p-5 relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <Badge className="bg-emerald-400/20 text-emerald-400 border-emerald-400/30 text-xs">
                  Breaking News
                </Badge>
              </div>
              <h4 className="text-base font-semibold text-white mb-2 leading-tight">
                Major Breakthrough in Renewable Energy Storage
              </h4>
              <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
                Scientists announce revolutionary battery technology with 10x capacity and 50% lower production costs.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600
                    hover:from-emerald-400 hover:to-emerald-500
                    text-white text-sm shadow-lg shadow-emerald-900/20
                    flex items-center justify-center group"
                >
                  Full Coverage
                  <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 pt-6 border-t border-white/5"
        >
          <p className="text-xs text-zinc-500 text-center">
            Subscribe to our 
            <Button variant="link" className="text-emerald-400 px-1 py-0 h-auto hover:text-emerald-300 transition-colors underline-offset-2 hover:underline">
              newsletter
            </Button>
            for daily updates
          </p>
        </motion.div>
      </div>
    </aside>
  )
}


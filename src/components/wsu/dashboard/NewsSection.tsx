"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Newspaper } from "lucide-react"

export function NewsSection() {
  const news = [
    {
      id: 1,
      title: "New Sustainable Energy Project Launched",
      category: "Energy",
      summary: "Revolutionary solar project aims to power 100,000 homes",
      time: "2h ago"
    },
    {
      id: 2,
      title: "Green Tech Startup Raises $50M in Funding",
      category: "Technology",
      summary: "Breakthrough in carbon capture technology attracts major investors",
      time: "4h ago"
    },
    {
      id: 3,
      title: "Global Climate Summit Announces New Initiatives",
      category: "Policy",
      summary: "World leaders commit to ambitious carbon reduction targets",
      time: "6h ago"
    },
  ]

  return (
    <aside className="w-80 fixed right-0 top-14 h-[calc(100vh-3.5rem)] 
      border-l border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="h-full px-6 py-8 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 
        scrollbar-track-transparent">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-zinc-400">Latest Updates</span>
          </div>
          <Badge variant="outline" 
            className="bg-emerald-400/5 text-emerald-400 border-emerald-400/20 text-xs">
            Live Feed
          </Badge>
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group bg-black/30 border border-white/5 
                hover:border-emerald-400/20 transition-all duration-300">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-emerald-400/10 text-emerald-400 text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-zinc-500">{item.time}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button 
                      variant="ghost" 
                      className="text-xs text-emerald-400 hover:text-emerald-300 
                        hover:bg-emerald-400/10 p-0"
                    >
                      Read More
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-zinc-400 hover:text-zinc-300 
                        hover:bg-white/5 p-0"
                    >
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Breaking News Section */}
        <Card className="mt-6 bg-gradient-to-br from-emerald-400/10 
          via-emerald-400/5 to-transparent border border-emerald-400/20">
          <CardContent className="p-4">
            <Badge className="bg-emerald-400/20 text-emerald-400 text-xs mb-2">
              Breaking
            </Badge>
            <h4 className="text-sm font-medium text-white mb-2">
              Major Breakthrough in Renewable Energy Storage
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Scientists announce revolutionary battery technology with 10x capacity
            </p>
            <Button 
              className="w-full bg-emerald-400/10 hover:bg-emerald-400/20 
                text-emerald-400 text-xs"
            >
              Full Coverage
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-zinc-500 text-center">
            Subscribe to our 
            <Button variant="link" className="text-emerald-400 px-1 py-0 h-auto">
              newsletter
            </Button>
            for daily updates
          </p>
        </div>
      </div>
    </aside>
  )
}


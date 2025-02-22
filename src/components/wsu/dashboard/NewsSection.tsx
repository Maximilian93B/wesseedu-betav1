"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function NewsSection() {
  // Mock news data
  const news = [
    { id: 1, title: "New Sustainable Energy Project Launched", category: "Energy" },
    { id: 2, title: "Green Tech Startup Raises $50M in Funding", category: "Technology" },
    { id: 3, title: "Global Climate Summit Announces New Initiatives", category: "Policy" },
  ]

  return (
    <Card className="bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Sustainability News</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {news.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 border border-emerald-500/20 p-4 rounded-lg hover:border-emerald-400/40 transition-all duration-200"
            >
              <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-2">Category: {item.category}</p>
              <Button 
                variant="ghost" 
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 p-0"
              >
                Read More
              </Button>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


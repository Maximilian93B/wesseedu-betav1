"use client"

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Bookmark } from "lucide-react"
import { motion } from "framer-motion"

export const dynamic = "force-dynamic"

interface SavedCompany {
  id: string
  companies: {
    id: string
    name: string
    description: string
    mission_statement: string
    score: number
    pitch_deck_url: string
    sustainability_data: any
  }
}

export function SavedCompaniesView() {
  const [savedCompanies, setSavedCompanies] = useState<SavedCompany[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchSavedCompanies()
  }, [])

  const fetchSavedCompanies = async () => {
    try {
      const { data, error } = await supabase.from("company_saves").select("*, companies(*)")
      if (error) throw error
      setSavedCompanies(data)
    } catch (error) {
      console.error("Error fetching saved companies:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnsave = async (companyId: string) => {
    try {
      const { error } = await supabase.from("company_saves").delete().eq("company_id", companyId)
      if (error) throw error
      fetchSavedCompanies()
    } catch (error) {
      console.error("Error unsaving company:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-400">
        Loading...
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 17 }}
      className="absolute inset-0 bg-black overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8 mb-12">
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2 bg-zinc-800/50 
              backdrop-blur-sm border border-zinc-700/50 px-6 py-2 rounded-full 
              shadow-[0_2px_10px_-3px_rgba(0,0,0,0.3)]">
              <Bookmark className="w-5 h-5 text-emerald-400" />
              <span className="text-base font-medium bg-gradient-to-r from-white to-zinc-300 
                bg-clip-text text-transparent">
                Saved Companies
              </span>
            </div>
          </div>
        </div>

        {savedCompanies.length === 0 ? (
          <Card className="bg-[#0A0A0A] border-2 border-white/5">
            <CardContent className="flex flex-col items-center justify-center h-48">
              <p className="text-zinc-400 text-center">You haven't saved any companies yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedCompanies.map((saved) => (
              <Card key={saved.id} className="bg-[#0A0A0A] border-2 border-white/5 
                hover:border-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white">
                    {saved.companies.name}
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Score: <span className="text-emerald-400 font-medium">{saved.companies.score}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 mb-4">
                    {saved.companies.description?.substring(0, 150)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="destructive"
                      onClick={() => handleUnsave(saved.companies.id)}
                      className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    >
                      Unsave
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`/companies/${saved.companies.id}`, "_blank")}
                      className="border-emerald-500/20 text-emerald-400 
                        hover:bg-emerald-500/10 hover:border-emerald-500/30"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}


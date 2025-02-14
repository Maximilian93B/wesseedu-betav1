"use client"

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

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

export default function SavedCompaniesPage() {
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
    return <div className="flex items-center justify-center h-96">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Saved Companies</h2>
        <p className="text-gray-600">View and manage your saved companies.</p>
      </div>

      {savedCompanies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-48">
            <p className="text-gray-500 text-center">You haven't saved any companies yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedCompanies.map((saved) => (
            <Card key={saved.id} className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">{saved.companies.name}</CardTitle>
                <CardDescription className="text-gray-500">
                  Score: <span className="text-green-600 font-medium">{saved.companies.score}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{saved.companies.description?.substring(0, 150)}...</p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="destructive"
                    onClick={() => handleUnsave(saved.companies.id)}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Unsave
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`/companies/${saved.companies.id}`, "_blank")}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
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
  )
}


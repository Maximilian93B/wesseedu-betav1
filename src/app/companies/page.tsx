"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SaveCompanyButton from "@/components/company/SaveCompanyButton"
import { Search, Building2 } from "lucide-react"

interface Company {
  id: string
  name: string
  description: string
  mission_statement: string
  financials: {
    annual_revenue: number
    funding_raised: number
    burn_rate: number
  }
  pitch_deck_url: string
  sustainability_data: {
    [key: string]: number
  }
  score: number
}

export default function MarketplacePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchCompanies = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)

      const response = await fetch(`/api/companies?${params}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setCompanies(data.companies || [])
    } catch (error) {
      console.error("Error fetching companies:", error)
      setCompanies([])
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCompanies()
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchCompanies])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">WeSeedU Marketplace</h2>
        <p className="text-muted-foreground">Discover and invest in promising startups and growing businesses</p>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" onClick={fetchCompanies}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card key={company.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <CardTitle>{company.name}</CardTitle>
                  </div>
                  <SaveCompanyButton companyId={company.id} size="icon" variant="ghost" />
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-2">
                  Score: {company.score}
                </Badge>
                <CardDescription className="line-clamp-3 mb-4">{company.description}</CardDescription>
                <p className="text-sm text-muted-foreground italic mb-4">"{company.mission_statement}"</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Funding: ${company.financials.funding_raised.toLocaleString()}
                </span>
                <Button asChild>
                  <Link href={`/companies/${company.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


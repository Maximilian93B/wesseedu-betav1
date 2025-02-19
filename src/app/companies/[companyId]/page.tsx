"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import SaveCompanyButton from "@/components/company/SaveCompanyButton"
import { ArrowLeft, Download, Building2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
  community_members: number
}

export default function CompanyDetailPage() {
  const params = useParams()
  const companyId = params?.companyId as string
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/companies/${companyId}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }

        setCompany(data.company)
      } catch (err) {
        console.error("Error fetching company:", err)
        setError(err instanceof Error ? err.message : "Failed to load company")
      } finally {
        setLoading(false)
      }
    }

    if (companyId) {
      fetchCompany()
    }
  }, [companyId])

  const handlePitchDeckDownload = async () => {
    if (!company) return

    setIsDownloading(true)
    try {
      const response = await fetch(`/api/companies/${company.id}/pitch-deck`)
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.error || "Failed to get download URL")
      }

      const data = await response.json()
      window.open(data.url, "_blank")
    } catch (error) {
      console.error("Error during pitch deck download:", error)
      alert(`Error: ${(error as Error).message}`)
    } finally {
      setIsDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-[300px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    )
  }

  if (error || !company) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error || "Company not found"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/companies">Return to Companies</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/companies">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <CardTitle>{company.name}</CardTitle>
                <CardDescription>Sustainability Score: {company.score}</CardDescription>
              </div>
            </div>
            <SaveCompanyButton companyId={company.id} size="default" variant="outline" />
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="mb-2 text-sm px-2 py-1 gap-2">
            <Users className="h-4 w-4" />
            Community Members: {company.community_members}
          </Badge>  
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{company.description}</p>
            <h3 className="font-semibold mb-2">Mission Statement</h3>
            <p>{company.mission_statement}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sustainability Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(company.sustainability_data).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Annual Revenue</span>
                <span className="font-medium">${company.financials.annual_revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Funding Raised</span>
                <span className="font-medium">${company.financials.funding_raised.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Burn Rate</span>
                <span className="font-medium">${company.financials.burn_rate.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {company.pitch_deck_url && (
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handlePitchDeckDownload} disabled={isDownloading}>
                {isDownloading ? (
                  <span>Downloading...</span>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Pitch Deck
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


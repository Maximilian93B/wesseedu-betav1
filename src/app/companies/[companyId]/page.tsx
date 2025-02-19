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
import Image from "next/image"

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
  image_url: string
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
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="hover:bg-muted/50">
          <Link href="/companies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Link>
        </Button>
        <SaveCompanyButton companyId={company.id} size="default" variant="outline" />
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center space-x-8">
              {company.image_url ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-muted">
                  <Image
                    src={company.image_url}
                    alt={`${company.name} logo`}
                    fill
                    className="object-cover"
                    sizes="96px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
              )}
              <div>
                <CardTitle className="text-4xl font-bold mb-4">{company.name}</CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="text-sm px-4 py-1.5 gap-2">
                    <Users className="h-4 w-4" />
                    {company.community_members.toLocaleString()} Members
                  </Badge>
                  <Badge variant="default" className="text-sm px-4 py-1.5">
                    Score: {company.score}/100
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="border-2 hover:border-primary/50 transition-colors shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl flex items-center gap-3">
              About
              <div className="h-1.5 w-12 bg-primary rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-muted-foreground leading-relaxed text-lg">{company.description}</p>
            <div>
              <h3 className="font-semibold mb-4 text-xl">Mission Statement</h3>
              <p className="text-muted-foreground italic leading-relaxed text-lg">{company.mission_statement}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              Sustainability Metrics
              <div className="h-1 w-10 bg-primary rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(company.sustainability_data).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                  <span className="font-medium text-primary">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              Financial Overview
              <div className="h-1 w-10 bg-primary rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(company.financials).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                  <span className="font-medium text-primary">${value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {company.pitch_deck_url && (
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                Resources
                <div className="h-1 w-10 bg-primary rounded-full" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handlePitchDeckDownload} 
                disabled={isDownloading}
                className="w-full justify-center py-6 text-lg"
              >
                {isDownloading ? (
                  <span>Downloading...</span>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
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


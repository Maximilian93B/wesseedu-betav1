"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import SaveCompanyButton from "@/components/company/SaveCompanyButton"
import { ArrowLeft, Download, Building2, Users, FileText } from "lucide-react"
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

interface CompanyDetailsViewProps {
  companyId: string
  onClose: () => void
}

export function CompanyDetailsView({ companyId, onClose }: CompanyDetailsViewProps) {
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
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        if (data.error) throw new Error(data.error)
        setCompany(data.company)
      } catch (err) {
        console.error("Error fetching company:", err)
        setError(err instanceof Error ? err.message : "Failed to load company")
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
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
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", stiffness: 80, damping: 17 }}
        className="absolute inset-0 bg-black overflow-y-auto"
      >
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-[300px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </motion.div>
    )
  }

  if (error || !company) {
    return (
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", stiffness: 80, damping: 17 }}
        className="absolute inset-0 bg-black overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-2 border-white/5 bg-[#0A0A0A]">
            <CardHeader>
              <CardTitle className="text-white">Error</CardTitle>
              <p className="text-zinc-400">{error || "Company not found"}</p>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => onClose()}
                variant="ghost"
                className="mr-4 hover:bg-white/5 text-zinc-400 hover:text-emerald-400"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
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
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-12">
            <Button
              onClick={() => onClose()}
              variant="ghost"
              className="hover:bg-white/5 text-zinc-400 hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Button>
            <div className="flex gap-4">
              <Button
                onClick={() => window.location.href = `/admin/companies/${company.id}`}
                variant="outline"
                className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10"
              >
                View Details
              </Button>
              <SaveCompanyButton companyId={company.id} size="default" variant="outline" />
            </div>
          </div>

          <div className="space-y-8 mb-16">
            <div className="flex items-start gap-8 max-w-full">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden 
                border-2 border-white/5 bg-[#0A0A0A] flex-shrink-0">
                {company.image_url ? (
                  <Image
                    src={company.image_url}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain p-4"
                    sizes="128px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-400/10 
                    flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-emerald-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-grow min-w-0">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r 
                  from-zinc-200 via-white to-zinc-300 bg-clip-text text-transparent 
                  mb-6">
                  {company.name}
                </h1>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge variant="outline" 
                    className="px-4 py-1.5 border-emerald-400/20 bg-emerald-400/10 
                      text-emerald-400">
                    <Users className="h-4 w-4 mr-2" />
                    {company.community_members.toLocaleString()}
                  </Badge>
                  <Badge variant="outline" 
                    className="px-4 py-1.5 border-emerald-400/20 bg-emerald-400/10 
                      text-emerald-400">
                    Score: {company.score}/100
                  </Badge>
                </div>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
                  {company.description}
                </p>
              </div>
            </div>

            <Card className="bg-[#0A0A0A] border-2 border-white/5">
              <CardContent className="p-8">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-medium text-white mb-4">Mission Statement</h3>
                  <p className="text-zinc-400 italic text-lg">
                    "{company.mission_statement}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-bold text-white mb-8">Key Performance Indicators</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(company.financials).map(([key, value]) => (
                  <Card key={key} className="bg-[#0A0A0A] border-2 border-white/5 
                    hover:border-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <p className="text-zinc-400 capitalize mb-2 truncate">
                        {key.replace(/_/g, " ")}
                      </p>
                      <div>
                        <p className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">
                          ${value.toLocaleString()}
                        </p>
                        <p className="text-sm text-zinc-500">+15% from previous year</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-8">Sustainability Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(company.sustainability_data).map(([key, value]) => (
                  <Card key={key} className="bg-[#0A0A0A] border-2 border-white/5 
                    hover:border-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-zinc-400 capitalize truncate mr-4">
                          {key.replace(/_/g, " ")}
                        </p>
                        <span className="text-xl font-bold text-emerald-400 whitespace-nowrap">
                          {value}
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div 
                          className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(value, 100)}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-8">Market Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#0A0A0A] border-2 border-white/5 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Market Position</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Market Share", value: "12%" },
                      { label: "Industry Ranking", value: "#3" },
                      { label: "Growth Rate", value: "+25% YoY" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between 
                        p-3 rounded-lg bg-white/5">
                        <span className="text-zinc-400">{item.label}</span>
                        <span className="text-emerald-400 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-[#0A0A0A] border-2 border-white/5 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Competitive Advantage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Proprietary Technology",
                        "Strong Patent Portfolio",
                        "Global Distribution Network"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-3 p-3 
                          rounded-lg bg-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 
                            flex-shrink-0" />
                          <span className="text-zinc-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


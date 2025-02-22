import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ImageIcon, Users, BarChart } from "lucide-react"
import SaveCompanyButton from "@/components/company/SaveCompanyButton"


interface CompanyCardProps {
  company: {
    id: string
    name: string
    description: string
    mission_statement: string
    image_url?: string
    financials: {
      annual_revenue: number
      funding_raised: number
      burn_rate: number
    }
    sustainability_data: {
      [key: string]: number
    }
    score: number
    community_members: number
  }
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="group relative bg-[#0A0A0A] hover:bg-[#111111] border-2 
      border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all 
      duration-300 max-w-sm shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] 
      hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]">
      <div className="relative w-full aspect-[16/9] bg-[#0A0A0A]">
        {company.image_url ? (
          <>
            <Image
              src={company.image_url}
              alt={`${company.name} company image`}
              fill
              className="object-contain p-6 transition-transform duration-500 
                group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = '/images/company-placeholder.jpg'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t 
              from-[#0A0A0A] via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <ImageIcon className="w-12 h-12 text-gray-700" />
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-white group-hover:text-emerald-400 
            transition-colors line-clamp-1">
            {company.name}
          </CardTitle>
          <SaveCompanyButton companyId={company.id} size="sm" variant="ghost" 
            className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardDescription className="text-sm text-gray-400 line-clamp-2">
          {company.description}
        </CardDescription>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Users className="w-4 h-4" />
              {company.community_members}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <BarChart className="w-4 h-4" />
              {company.score}/10
            </span>
          </div>
          <Button 
            asChild
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-400 text-white 
              transition-colors shadow-sm hover:shadow-emerald-500/25"
          >
            <Link href={`/companies/${company.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

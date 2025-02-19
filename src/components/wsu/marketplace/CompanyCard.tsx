import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, ImageIcon } from "lucide-react"
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
    <Card className="glass-effect border-white/10 hover-glow transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-[200px] flex-shrink-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
        {company.image_url ? (
          <>
            <Image
              src={company.image_url}
              alt={`${company.name} company image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = '/images/company-placeholder.jpg'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ImageIcon className="w-10 h-10 mb-2" />
            <span className="text-sm">No image available</span>
          </div>
        )}
        
        <div className="absolute -bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center ring-4 ring-black">
          <Building2 className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <CardHeader className="pt-8 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white line-clamp-1">{company.name}</CardTitle>
            <SaveCompanyButton companyId={company.id} size="icon" variant="ghost" />
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 min-h-[28px]">
              <Badge className="bg-teal-500/10 text-teal-500 hover:bg-teal-500/20">
                Impact Score: {company.score}
              </Badge>
              <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                {company.community_members} Supporters
              </Badge>
            </div>

            <CardDescription className="text-gray-400 line-clamp-2 min-h-[40px]">
              {company.description}
            </CardDescription>

            <div className="min-h-[60px]">
              <p className="text-sm text-gray-500 italic border-l-2 border-teal-500/30 pl-3 line-clamp-2">
                "{company.mission_statement}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm max-h-[120px] overflow-y-auto">
              {Object.entries(company.sustainability_data).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 rounded-md bg-white/5">
                  <span className="text-gray-400 capitalize truncate mr-2">{key.replace('_', ' ')}</span>
                  <span className="text-teal-500">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-auto border-t border-white/10 pt-4">
          <div className="flex justify-between items-center w-full">
            <div className="space-y-1">
              <span className="text-sm font-medium text-teal-500">
                ${company.financials.funding_raised.toLocaleString()}
              </span>
              <p className="text-xs text-gray-500">
                Annual Revenue: ${company.financials.annual_revenue.toLocaleString()}
              </p>
            </div>
            <Button 
              asChild
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
            >
              <Link href={`/companies/${company.id}`}>View Impact</Link>
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

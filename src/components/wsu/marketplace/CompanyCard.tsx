import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Users, BarChart, ChevronRight, TrendingUp, Shield } from "lucide-react"
import SaveCompanyButton from "@/components/company/SaveCompanyButton"
import { motion } from "framer-motion"

interface CompanyCardProps {
  company: {
    id: string
    name: string
    description: string
    mission_statement: string
    image_url?: string
    financials?: {
      annual_revenue: number
      funding_raised: number
      burn_rate: number
    }
    sustainability_data?: {
      [key: string]: number
    }
    score: number
    community_members?: number
  }
  onCompanySelect: (id: string) => void
}

export function CompanyCard({ company, onCompanySelect }: CompanyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group relative bg-gradient-to-b from-zinc-900/80 via-zinc-900/90 to-black 
        border border-zinc-800/50 hover:border-emerald-500/30 rounded-xl overflow-hidden transition-all 
        duration-300 shadow-[0_15px_30px_-12px_rgba(0,0,0,0.3)] 
        hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)]">
        
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-600/80 via-emerald-500/20 to-transparent z-10" />
        
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-zinc-900 to-black overflow-hidden">
          {company.image_url ? (
            <>
              <Image
                src={company.image_url}
                alt={`${company.name} company image`}
                fill
                className="object-contain p-8 transition-transform duration-700 
                  group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  e.currentTarget.src = '/images/company-placeholder.jpg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t 
                from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 
                flex items-center justify-center border border-emerald-700/20 shadow-lg shadow-black/10">
                <ImageIcon className="w-12 h-12 text-emerald-400/70" />
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-7 space-y-5 relative">
          {/* Background subtle gradient for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/5 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-xl font-bold text-white group-hover:text-emerald-300 
                transition-colors line-clamp-1 drop-shadow-sm">
                {company.name}
              </CardTitle>
              <SaveCompanyButton companyId={company.id} size="sm" variant="ghost" 
                className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <CardDescription className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-5">
              {company.description || company.mission_statement || "No description available"}
            </CardDescription>

            <div className="pt-4 mt-2 border-t border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center text-emerald-400 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{company.community_members?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center text-emerald-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>{company.score || 0}/10</span>
                </div>
              </div>
              
              <Button 
                onClick={() => onCompanySelect(company.id)}
                className="bg-emerald-500 hover:bg-emerald-400 text-white 
                  transition-colors shadow-md shadow-black/20 px-5 py-2.5"
                size="sm"
              >
                <span>Details</span>
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

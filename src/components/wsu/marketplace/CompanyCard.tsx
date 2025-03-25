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
      <Card className="group relative bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 rounded-xl overflow-hidden transition-all 
        duration-300 shadow-md 
        hover:shadow-lg">
        
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/80 via-emerald-500/20 to-transparent z-10" />
        
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
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
                from-white/80 dark:from-slate-950/80 via-white/40 dark:via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30
                flex items-center justify-center border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                <ImageIcon className="w-12 h-12 text-emerald-500/70 dark:text-emerald-400/70" />
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-7 space-y-5 relative">
          {/* Background subtle gradient for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 dark:from-emerald-900/20 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400
                transition-colors line-clamp-1">
                {company.name}
              </CardTitle>
              <SaveCompanyButton companyId={company.id} size="sm" variant="ghost" 
                className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <CardDescription className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-5">
              {company.description || company.mission_statement || "No description available"}
            </CardDescription>

            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{company.community_members?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>{company.score || 0}/10</span>
                </div>
              </div>
              
              <Button 
                onClick={() => onCompanySelect(company.id)}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white 
                  transition-colors shadow-sm px-5 py-2.5"
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

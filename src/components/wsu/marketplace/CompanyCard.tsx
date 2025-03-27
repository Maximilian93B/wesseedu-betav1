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
      <Card 
        className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-all duration-500"
        style={{ 
          backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
        }}
      >
        {/* Subtle texture pattern for depth */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }} 
        />
        
        {/* Top edge shadow line for definition */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
        
        {/* Inner shadow effects for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
        
        <div className="relative w-full aspect-[16/9] overflow-hidden">
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
                from-white/80 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 rounded-full bg-slate-100
                flex items-center justify-center border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <ImageIcon className="w-12 h-12 text-slate-500/70" />
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-7 space-y-5 relative z-10">
          {/* Background subtle gradient for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-xl font-medium text-slate-800 group-hover:text-slate-700
                transition-colors line-clamp-1">
                {company.name}
              </CardTitle>
              <SaveCompanyButton companyId={company.id} size="sm" variant="ghost" 
                className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <CardDescription className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-5">
              {company.description || company.mission_statement || "No description available"}
            </CardDescription>

            <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center text-slate-600 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{company.community_members?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>{company.score || 0}/10</span>
                </div>
              </div>
              
              <Button 
                onClick={() => onCompanySelect(company.id)}
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
                  hover:translate-y-[-2px] rounded-lg"
                size="sm"
              >
                <span>Details</span>
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        
        {/* Bottom shadow effect */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
      </Card>
    </motion.div>
  )
}

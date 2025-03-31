"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Users, ChevronRight, TrendingUp, Shield } from "lucide-react"
import SaveCompanyButton from "@/components/company/SaveCompanyButton"
import { motion } from "framer-motion"
import { useState } from "react"

interface CompanyCardProps {
  company: {
    id: string
    name: string
    description: string
    mission_statement: string
    image_url: string | null
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
      whileHover={{ 
        y: -4,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.06)",
        borderColor: "rgb(226, 232, 240)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={() => onCompanySelect(company.id)}
      className="rounded-xl border border-slate-200 bg-white overflow-hidden 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group"
    >
      {/* Subtle top accent line for definition */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
      
      {/* Inner shadow effects for depth at the top */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      
      {/* Image section with enhanced depth */}
      <div className="relative w-full h-52 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {company.image_url ? (
          <>
            {/* Image container with subtle overlay */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={company.image_url}
                alt={`${company.name} logo`}
                fill
                className="object-cover"
                onError={(e) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.style.display = 'none';
                  
                  const parent = imgElement.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full flex items-center justify-center';
                    fallback.innerHTML = `
                      <div class="text-slate-400 flex flex-col items-center">
                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="text-sm">No image available</span>
                      </div>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
              {/* Subtle gradient overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 to-slate-100">
            <div className="text-slate-400 flex flex-col items-center">
              <svg 
                className="w-14 h-14 mb-2 text-slate-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span className="text-sm text-slate-500 font-medium">No image available</span>
            </div>
          </div>
        )}
        
        {/* Score indicator - small floating badge */}
        {company.score > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-slate-200">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-xs font-medium text-slate-700">{company.score} Score</span>
            </div>
          </div>
        )}
      </div>

      {/* Content with enhanced depth and styling */}
      <div className="p-6 relative">
        {/* Subtle depth effect at the top of content area */}
        <div className="absolute left-0 top-0 w-full h-4 bg-gradient-to-b from-slate-50/40 to-transparent"></div>
        
        <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-200">
          {company.name}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4 group-hover:text-slate-700 transition-colors duration-200">
          {company.description}
        </p>
        
        {/* Additional stats with subtle styling */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          {company.community_members ? (
            <div className="flex items-center text-slate-500 text-xs">
              <Users className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              <span>{company.community_members.toLocaleString()} members</span>
            </div>
          ) : (
            <div className="flex-1"></div>
          )}
          
          <div className="flex items-center text-xs text-slate-600 font-medium">
            <span>View Details</span>
            <ChevronRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
      
      {/* Bottom shadow effect for depth */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  )
}

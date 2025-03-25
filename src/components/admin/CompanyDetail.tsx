'use client'

import React from 'react'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Edit, Save, X, CheckCircle } from 'lucide-react'

interface Company {
  id: string
  name: string
  logo_url?: string
  website_url?: string
  industry: string
  location: string
  year_founded: number
  mission_statement: string
  company_description: string
  problem_statement: string
  solution_description: string
  target_market: string
  competitive_advantage: string
  team_members?: Record<string, any> // Adjust based on the JSON structure
  funding_stage: string
  funding_goal: number
  current_funding: number
  pre_money_valuation: number
  equity_available: number
  esg_score?: number
  sdg_alignment?: string[]
  sustainability_impact?: string
  created_at: string
  updated_at: string
  is_active: boolean
  is_verified: boolean
  application_status: string
  admin_notes?: string
  reviewed_by?: string
  reviewed_at?: string
}

export default function CompanyDetail({ company }: { company: Company }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(company)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const { data, error } = await supabase
        .from('companies')
        .update(formData)
        .eq('id', company.id)
        .select()
        .single()

      if (!error) {
        setIsEditing(false)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-black border border-zinc-800/50 
        hover:border-emerald-500/20 transition-all rounded-xl overflow-hidden shadow-lg shadow-black/20">
        {/* Subtle top accent */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-600/80 via-emerald-500/20 to-transparent z-10" />
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b border-zinc-800/50 pb-4">
              <CardTitle className="text-lg text-emerald-300 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Editing Company Details
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-zinc-900/90 border border-zinc-700/50 
                      text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30
                      shadow-inner transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 rounded-md bg-zinc-900/90 border border-zinc-700/50 
                        text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30
                        shadow-inner transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-md bg-zinc-900/90 border border-zinc-700/50 
                        text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30
                        shadow-inner transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    Mission Statement
                  </label>
                  <textarea
                    value={formData.mission_statement}
                    onChange={(e) => setFormData({ ...formData, mission_statement: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md bg-zinc-900/90 border border-zinc-700/50 
                      text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30
                      shadow-inner transition-colors"
                  />
                </div>
                
                {/* Add more form fields based on your needs */}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-800/30">
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white transition-colors shadow-md shadow-emerald-950/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </form>
        ) : (
          <>
            <CardHeader className="border-b border-zinc-800/50 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center mr-3 border border-emerald-400/20">
                    <Building2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  {company.name}
                </CardTitle>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-950/30 transition-colors"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-1">Industry</h3>
                      <p className="text-white">{company.industry}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-1">Location</h3>
                      <p className="text-white">{company.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-1">Year Founded</h3>
                      <p className="text-white">{company.year_founded}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-1">Status</h3>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${company.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className="text-white">{company.is_active ? 'Active' : 'Inactive'}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-1">Verification</h3>
                      <div className="flex items-center">
                        {company.is_verified ? (
                          <div className="flex items-center text-emerald-400">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>Verified</span>
                          </div>
                        ) : (
                          <p className="text-yellow-500">Pending Verification</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm text-zinc-400 mb-1">Application Status</h3>
                      <p className={`font-medium ${
                        company.application_status === 'approved' ? 'text-emerald-400' : 
                        company.application_status === 'pending' ? 'text-yellow-500' : 
                        company.application_status === 'rejected' ? 'text-red-500' : 'text-white'
                      }`}>
                        {company.application_status.charAt(0).toUpperCase() + company.application_status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-zinc-800/30">
                  <h3 className="text-sm text-zinc-400 mb-2">Mission Statement</h3>
                  <p className="text-white italic">{company.mission_statement}</p>
                </div>
                
                <div className="pt-4 border-t border-zinc-800/30">
                  <h3 className="text-sm text-zinc-400 mb-2">Problem Statement</h3>
                  <p className="text-white">{company.problem_statement}</p>
                </div>
                
                <div className="pt-4 border-t border-zinc-800/30 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-zinc-400 mb-2">Funding Details</h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Stage:</span>
                        <span className="text-white">{company.funding_stage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Goal:</span>
                        <span className="text-white">${company.funding_goal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Current:</span>
                        <span className="text-white">${company.current_funding.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Valuation:</span>
                        <span className="text-white">${company.pre_money_valuation.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-zinc-400 mb-2">Sustainability Metrics</h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">ESG Score:</span>
                        <span className="text-emerald-400 font-medium">{company.esg_score || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-zinc-500">SDG Alignment:</span>
                        <div className="text-right text-white">
                          {company.sdg_alignment?.join(', ') || 'None specified'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {company.admin_notes && (
                  <div className="pt-4 border-t border-zinc-800/30">
                    <h3 className="text-sm text-zinc-400 mb-2">Admin Notes</h3>
                    <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-md p-3 text-zinc-300">
                      {company.admin_notes}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </motion.div>
  )
} 
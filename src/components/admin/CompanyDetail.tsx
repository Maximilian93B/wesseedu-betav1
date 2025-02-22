'use client'

import React from 'react'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase
      .from('companies')
      .update(formData)
      .eq('id', company.id)
      .select()
      .single()

    if (!error) {
      setIsEditing(false)
    }
  }

  return (
    <div className="bg-black border-2 border-emerald-500/20 rounded-lg shadow-lg p-6">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Company Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md bg-black border-emerald-500/20 
                  text-white focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            {/* Add more form fields with similar styling */}
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-emerald-500/20 text-emerald-400 
                rounded-md hover:bg-emerald-950/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 
                text-white rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-white">{company.name}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-emerald-950/30 text-emerald-400 
                rounded-md hover:bg-emerald-950/50 transition-colors"
            >
              Edit
            </button>
          </div>
          {/* Display more company details with appropriate text colors */}
        </div>
      )}
    </div>
  )
} 
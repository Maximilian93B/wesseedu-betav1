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
      // Show success message
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Add form fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            {/* Add more form fields */}
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div>
          {/* Display company details */}
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">{company.name}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-100 rounded-md"
            >
              Edit
            </button>
          </div>
          {/* Display more company details */}
        </div>
      )}
    </div>
  )
} 
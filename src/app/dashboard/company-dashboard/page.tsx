'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ChartBar,
  Building2
} from "lucide-react"

interface CompanyData {
  id: string
  name: string
  verification_status: 'pending' | 'verified' | 'incomplete' | 'rejected'
  profile_completion: number
  documents_submitted: boolean
  esg_score?: number
  industry?: string
  location?: string
}

const capitalizeStatus = (status?: string) => {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Incomplete'
}

export default function CompanyDashboard() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          const { data, error } = await supabase
            .from('companies')
            .select('*')
            .eq('user_id', session.user.id)
            .single()
          
          if (error) throw error
          setCompanyData(data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [supabase])

  if (loading) return <div>Loading...</div>

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600'
      case 'pending': return 'text-yellow-600'
      case 'rejected': return 'text-red-600'
      default: return 'text-blue-600'
    }
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />
      case 'rejected': return <AlertCircle className="h-5 w-5 text-red-600" />
      default: return <Building2 className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <Button asChild>
          <Link href="/company-dashboard/profile">
            Update Profile
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getVerificationIcon(companyData?.verification_status || 'incomplete')}
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className={`font-medium ${getVerificationStatusColor(companyData?.verification_status || 'incomplete')}`}>
                {capitalizeStatus(companyData?.verification_status)}
              </p>
              <p className="text-sm text-muted-foreground">
                {companyData?.verification_status === 'verified' 
                  ? 'Your company is verified and visible to investors'
                  : 'Complete your profile and submit for verification'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{companyData?.profile_completion || 0}%</span>
                <Button asChild variant="outline" size="sm">
                  <Link href="/company-dashboard/profile">Complete Profile</Link>
                </Button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${companyData?.profile_completion || 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ESG Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBar className="h-5 w-5" />
              ESG Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {companyData?.verification_status === 'verified' ? (
              <div className="space-y-2">
                <p className="font-medium text-2xl">{companyData?.esg_score || 'N/A'}</p>
                <p className="text-sm text-muted-foreground">ESG Score</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/company-dashboard/metrics">View Details</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                ESG metrics will be available after verification
              </p>
            )}
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Documents Submitted</span>
                {companyData?.documents_submitted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/company-dashboard/documents">Upload</Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

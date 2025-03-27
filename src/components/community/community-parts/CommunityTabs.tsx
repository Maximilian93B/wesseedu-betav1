import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Users } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Ambassador } from '@/types/community'

// Import tab content components
import { AboutTab } from './tabs/AboutTab'
import { UpdatesTab } from './tabs/UpdatesTab'
import { AmbassadorsTab } from './tabs/AmbassadorsTab'
import { InvestorsTab } from './tabs/InvestorsTab'

interface CommunityData {
  name: string
  description: string
  logoUrl: string
  bannerUrl: string | null
  formattedDate: Date
  score: number
}

interface CommunityTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  companyData: CommunityData
  hasAmbassadors: boolean | undefined
  ambassadors: Ambassador[]
  variants?: any
}

export const CommunityTabs = ({
  activeTab,
  setActiveTab,
  companyData,
  hasAmbassadors,
  ambassadors,
  variants
}: CommunityTabsProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  
  return (
    <motion.div variants={variants} className="space-y-6">
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white backdrop-blur-sm border border-slate-200 p-1 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <TabsTrigger 
            value="about"
            className="data-[state=active]:bg-slate-50 data-[state=active]:text-slate-800 rounded-lg text-slate-600"
          >
            About
          </TabsTrigger>
          
          <TabsTrigger 
            value="updates"
            className="data-[state=active]:bg-slate-50 data-[state=active]:text-slate-800 rounded-lg text-slate-600"
          >
            Updates
          </TabsTrigger>
          
          {hasAmbassadors && (
            <TabsTrigger 
              value="ambassadors"
              className="data-[state=active]:bg-slate-50 data-[state=active]:text-slate-700 rounded-lg text-slate-600"
            >
              <Award className="h-3 w-3 mr-1" />
              Ambassadors
            </TabsTrigger>
          )}
          
          <TabsTrigger 
            value="investors"
            className="data-[state=active]:bg-slate-50 data-[state=active]:text-slate-800 rounded-lg text-slate-600"
          >
            <Users className="h-3 w-3 mr-1" />
            Investors
          </TabsTrigger>
        </TabsList>
        
        {/* About Tab Content */}
        <AboutTab 
          description={companyData.description}
          showFullDescription={showFullDescription}
          setShowFullDescription={setShowFullDescription}
        />
        
        {/* Updates Tab Content */}
        <UpdatesTab />
        
        {/* Ambassadors Tab Content */}
        {hasAmbassadors && (
          <AmbassadorsTab ambassadors={ambassadors} />
        )}
        
        {/* Investors Tab Content */}
        <InvestorsTab />
      </Tabs>
    </motion.div>
  )
} 
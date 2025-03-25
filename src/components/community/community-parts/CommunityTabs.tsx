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
        <TabsList className="bg-white dark:bg-slate-900 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-sm">
          <TabsTrigger 
            value="about"
            className="data-[state=active]:bg-slate-50 dark:data-[state=active]:bg-slate-800 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 rounded-lg text-slate-600 dark:text-slate-400"
          >
            About
          </TabsTrigger>
          
          <TabsTrigger 
            value="updates"
            className="data-[state=active]:bg-slate-50 dark:data-[state=active]:bg-slate-800 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 rounded-lg text-slate-600 dark:text-slate-400"
          >
            Updates
          </TabsTrigger>
          
          {hasAmbassadors && (
            <TabsTrigger 
              value="ambassadors"
              className="data-[state=active]:bg-orange-50 dark:data-[state=active]:bg-orange-900/30 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 rounded-lg text-slate-600 dark:text-slate-400"
            >
              <Award className="h-3 w-3 mr-1" />
              Ambassadors
            </TabsTrigger>
          )}
          
          <TabsTrigger 
            value="investors"
            className="data-[state=active]:bg-slate-50 dark:data-[state=active]:bg-slate-800 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 rounded-lg text-slate-600 dark:text-slate-400"
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
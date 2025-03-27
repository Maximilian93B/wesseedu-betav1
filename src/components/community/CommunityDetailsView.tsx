import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Community } from '@/types/community'

// Import sub-components
import { CommunityHeader } from './community-parts/CommunityHeader'
import { CommunityTabs } from './community-parts/CommunityTabs'
import { BackButton } from './community-parts/BackButton'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

interface CommunityDetailsViewProps {
  community: Community
  onBack: () => void
}

export default function CommunityDetailsView({ community, onBack }: CommunityDetailsViewProps) {
  const [activeTab, setActiveTab] = useState('about')
  const [isFollowing, setIsFollowing] = useState(community.isMember || false)
  const [hasError, setHasError] = useState(false)
  
  // Use useMemo to compute derived values
  const companyData = useMemo(() => {
    return {
      name: community.companies?.name || 'Unknown Company',
      description: community.companies?.mission_statement || community.companies?.description || 'No description available',
      logoUrl: community.companies?.image_url || '/placeholder-logo.png',
      bannerUrl: null, // No banner_url in Community type
      formattedDate: community.created_at ? new Date(community.created_at) : new Date(),
      score: community.companies?.score || 0
    }
  }, [community]);
  
  // Safely access ambassador data with error handling
  const hasAmbassadors = !hasError && community.ambassadors && community.ambassadors.length > 0
  const ambassadors = !hasError && community.ambassadors ? community.ambassadors : []
  
  // Check for database schema errors when accessing ambassadors
  useEffect(() => {
    try {
      // Just attempt to access the data to see if it triggers an error
      if (community.ambassadors) {
        const test = community.ambassadors.map(a => a.name)
      }
    } catch (error) {
      console.error('Error accessing ambassador data:', error)
      setHasError(true)
    }
  }, [community.ambassadors])
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    // Here you would typically call an API to update the follow status
  }
  
  return (
    <motion.div 
      className="w-full bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen transition-colors"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      {/* Back Button */}
      <BackButton onBack={onBack} variants={itemVariants} />
      
      {/* Community Header with Banner */}
      <CommunityHeader 
        companyData={companyData}
        isFollowing={isFollowing}
        hasAmbassadors={hasAmbassadors}
        ambassadors={ambassadors}
        handleFollowToggle={handleFollowToggle}
        community={community}
        variants={itemVariants}
      />
      
      {/* Main Content Area with Tabs */}
      <CommunityTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        companyData={companyData}
        hasAmbassadors={hasAmbassadors}
        ambassadors={ambassadors}
        variants={itemVariants}
      />
    </motion.div>
  )
} 
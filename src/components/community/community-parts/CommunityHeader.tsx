import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Calendar, Users, Building, Award, Leaf, MessageCircle, Bell, Heart, Share2, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Ambassador, Community } from '@/types/community'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Memoized components for better performance
const MemoizedButton = memo(Button);

interface CommunityData {
  name: string
  description: string
  logoUrl: string
  bannerUrl: string | null
  formattedDate: Date
  score: number
}

interface CommunityHeaderProps {
  companyData: CommunityData
  isFollowing: boolean
  hasAmbassadors: boolean | undefined
  ambassadors: Ambassador[]
  handleFollowToggle: () => void
  community: Community
  variants?: any
}

export const CommunityHeader = ({ 
  companyData, 
  isFollowing, 
  hasAmbassadors, 
  ambassadors, 
  handleFollowToggle, 
  community, 
  variants 
}: CommunityHeaderProps) => {
  
  // Get score class based on score value
  const scoreClass = companyData.score > 70 
    ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50' 
    : companyData.score > 40 
      ? 'bg-amber-900/40 text-amber-400 border-amber-700/50'
      : 'bg-red-900/40 text-red-400 border-red-700/50';
  
  const formattedDate = format(companyData.formattedDate, 'MMM dd, yyyy');
  
  return (
    <motion.div 
      variants={variants}
      className="rounded-xl overflow-hidden mb-8 relative border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 to-zinc-950"
    >
      {/* Banner with overlay effect */}
      {companyData.bannerUrl && (
        <div className="relative h-64 w-full">
          <Image 
            src={companyData.bannerUrl} 
            alt={`${companyData.name} banner`} 
            fill 
            className="object-cover"
            loading="eager"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20 backdrop-blur-[1px]" />
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-soft-light" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-950/20 to-transparent" />
      
      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Logo with enhanced design */}
          <div className="relative h-28 w-28 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 shadow-xl ring-1 ring-white/10 transform -translate-y-4">
            {companyData.logoUrl ? (
              <Image 
                src={companyData.logoUrl} 
                alt={companyData.name} 
                fill 
                className="object-cover"
                loading="eager"
              />
            ) : (
              <Building className="h-14 w-14 text-zinc-400 m-auto" />
            )}
          </div>
          
          <div className="flex-1 mt-2">
            {/* Main content header with value proposition */}
            <div className="mb-6">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight"
              >
                {companyData.name}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-zinc-300 text-lg max-w-2xl"
              >
                Join a community of like-minded private equity investors focused on {companyData.name}'s mission and opportunities.
              </motion.p>
            </div>
            
            {/* Stats row with improved badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Badge className={`${scoreClass} text-sm py-1.5 pl-1.5 pr-2.5`}>
                        <div className="bg-white/10 rounded-full p-1 mr-1.5">
                          <Leaf className="h-3.5 w-3.5" />
                        </div>
                        {companyData.score} Impact Score
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/90 border border-zinc-700 text-white">
                    <span className="text-xs">ESG impact score measuring environmental and social governance</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {hasAmbassadors && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Badge className="bg-amber-900/30 text-amber-400 border border-amber-700/30 text-sm py-1.5 pl-1.5 pr-2.5">
                          <div className="bg-white/10 rounded-full p-1 mr-1.5">
                            <Award className="h-3.5 w-3.5" />
                          </div>
                          {ambassadors.length} Ambassador{ambassadors.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border border-zinc-700 text-white">
                      <span className="text-xs">Celebrity ambassadors supporting this community</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <Badge className="bg-zinc-800/60 text-zinc-300 border border-zinc-700/30 text-sm py-1.5 pl-1.5 pr-2.5">
                <div className="bg-white/10 rounded-full p-1 mr-1.5">
                  <Users className="h-3.5 w-3.5" />
                </div>
                {community.ambassadorCount || 0} members
              </Badge>
              
              <Badge className="bg-indigo-900/30 text-indigo-400 border border-indigo-700/30 text-sm py-1.5 pl-1.5 pr-2.5">
                <div className="bg-white/10 rounded-full p-1 mr-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                Exclusive Insights
              </Badge>
              
              <div className="ml-auto flex items-center text-sm text-zinc-400">
                <Calendar className="h-4 w-4 mr-1.5 text-emerald-400" />
                <span>Community since {formattedDate}</span>
              </div>
            </div>
            
            {/* Action buttons with improved design */}
            <div className="flex flex-wrap gap-3 mt-2">
              <MemoizedButton 
                className={isFollowing 
                  ? "bg-emerald-700/40 hover:bg-emerald-700/60 text-emerald-400 border border-emerald-700/50 font-medium py-5 px-6"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-medium py-5 px-6 shadow-lg shadow-emerald-900/20"}
                onClick={handleFollowToggle}
              >
                {isFollowing ? (
                  <>
                    <Heart className="h-5 w-5 mr-2 fill-emerald-400 text-emerald-400" />
                    Following
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Join Community
                  </>
                )}
              </MemoizedButton>
              
              <MemoizedButton variant="outline" className="border-zinc-700/60 bg-zinc-900/60 backdrop-blur-sm text-white hover:bg-zinc-800/60 py-5 px-6">
                <Bell className="h-5 w-5 mr-2 text-emerald-400" />
                Get Alerts
              </MemoizedButton>
              
              <MemoizedButton variant="outline" className="border-zinc-700/60 bg-zinc-900/60 backdrop-blur-sm text-white hover:bg-zinc-800/60 py-5 px-6">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-400" />
                Contact
              </MemoizedButton>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MemoizedButton variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/60 ml-auto h-11 w-11">
                      <Share2 className="h-5 w-5" />
                    </MemoizedButton>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/90 border border-zinc-700 text-white">
                    <span className="text-xs">Share this community</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 
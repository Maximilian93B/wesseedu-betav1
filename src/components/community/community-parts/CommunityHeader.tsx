import { memo } from 'react'
import { format } from 'date-fns'
import { Calendar, Users, Building, Award, Leaf, MessageCircle, Bell, Heart, Share2, TrendingUp, Shield, ExternalLink, Zap, LightbulbIcon, Globe } from 'lucide-react'
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
  community
}: CommunityHeaderProps) => {
  
  // Get score class based on score value - Updated for light/dark theme
  const scoreClass = companyData.score > 70 
    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' 
    : companyData.score > 40 
      ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
      : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50';
  
  const formattedDate = format(companyData.formattedDate, 'MMM dd, yyyy');
  
  return (
    <div className="rounded-xl overflow-hidden mb-8 relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/80 via-orange-400/20 to-transparent z-10" />
      <div className="absolute top-1 right-0 w-[40%] h-px bg-gradient-to-l from-slate-300/40 dark:from-slate-700/40 to-transparent" />
      
      {/* Banner section with enhanced gradient overlay */}
      <div className="relative h-64 w-full">
        {companyData.bannerUrl ? (
          <div 
            className="absolute inset-0 bg-center bg-cover opacity-70"
            style={{backgroundImage: `url(${companyData.bannerUrl})`}}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 dark:from-orange-950/20 via-white dark:via-slate-900 to-slate-50 dark:to-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-slate-900/50 via-white/60 dark:via-slate-900/60 to-white/95 dark:to-slate-900/95" />
      </div>
      
      <div className="relative z-10 p-6 sm:p-8 -mt-36">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Logo section with enhanced styling */}
          <div className="relative h-32 w-32 rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 dark:from-slate-800 to-white dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-md ring-2 ring-white/80 dark:ring-slate-800/80">
            {companyData.logoUrl ? (
              <div 
                className="h-full w-full bg-center bg-cover"
                style={{backgroundImage: `url(${companyData.logoUrl})`}}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-orange-50 dark:from-orange-900/30 to-white dark:to-slate-800">
                <Building className="h-16 w-16 text-orange-500 dark:text-orange-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 mt-8 sm:mt-2">
            {/* Main content header with enhanced typography and community value prop */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Badge className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 px-3 py-1 rounded-full text-xs font-medium mr-3">
                  <Globe className="h-3 w-3 mr-1.5" />
                  Active Community
                </Badge>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3 tracking-tight">
                {companyData.name}
              </h1>
              
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mb-2">
                Connect with forward-thinking investors and industry experts focused on {companyData.name}'s sustainable growth and impact initiatives.
              </p>
            </div>
            
            {/* Community benefits section - NEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7 mt-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-start">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                  <LightbulbIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-200 text-sm font-medium">Exclusive Insights</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Gain access to proprietary market research</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg mr-3">
                  <Zap className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-200 text-sm font-medium">Direct Engagement</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Connect with industry leaders and ambassadors</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-lg mr-3">
                  <Award className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-200 text-sm font-medium">Premium Opportunities</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">First access to sustainable investment deals</p>
                </div>
              </div>
            </div>
            
            {/* Stats row with modern badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Badge className={`${scoreClass} text-sm py-1.5 pl-1.5 pr-2.5 shadow-sm`}>
                        <div className="bg-white dark:bg-slate-800 rounded-full p-1 mr-1.5 border border-slate-200 dark:border-slate-700">
                          <Leaf className="h-3.5 w-3.5" />
                        </div>
                        {companyData.score} Impact Score
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                    <span className="text-xs">ESG impact score measuring environmental and social governance</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {hasAmbassadors && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Badge className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 text-sm py-1.5 pl-1.5 pr-2.5 shadow-sm">
                          <div className="bg-white dark:bg-slate-800 rounded-full p-1 mr-1.5 border border-orange-100 dark:border-orange-900/50">
                            <Award className="h-3.5 w-3.5" />
                          </div>
                          {ambassadors.length} Ambassador{ambassadors.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                      <span className="text-xs">Thought leaders and industry experts guiding this community</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <Badge className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-sm py-1.5 pl-1.5 pr-2.5 shadow-sm">
                <div className="bg-white dark:bg-slate-900 rounded-full p-1 mr-1.5 border border-slate-200 dark:border-slate-700">
                  <Users className="h-3.5 w-3.5" />
                </div>
                {community.ambassadorCount || 0} active members
              </Badge>
              
              <Badge className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 text-sm py-1.5 pl-1.5 pr-2.5 shadow-sm">
                <div className="bg-white dark:bg-slate-800 rounded-full p-1 mr-1.5 border border-blue-100 dark:border-blue-900/50">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                Market Updates
              </Badge>
              
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 ml-auto">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-md px-3 py-1 border border-slate-200 dark:border-slate-700 flex items-center gap-2 shadow-sm">
                  <Calendar className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Since {formattedDate}</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons with premium design and community-focused CTAs */}
            <div className="flex flex-wrap gap-3 mt-6">
              <MemoizedButton 
                className={isFollowing 
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-medium py-5 px-6 shadow-sm"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-5 px-6 shadow-md"}
                onClick={handleFollowToggle}
              >
                {isFollowing ? (
                  <>
                    <Heart className="h-5 w-5 mr-2 fill-emerald-500 text-emerald-500 dark:fill-emerald-400 dark:text-emerald-400" />
                    Following
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Join Community
                  </>
                )}
              </MemoizedButton>
              
              <MemoizedButton 
                variant="outline" 
                className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-5 px-6 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm"
              >
                <Bell className="h-5 w-5 mr-2 text-emerald-500 dark:text-emerald-400" />
                Get Updates
              </MemoizedButton>
              
              <MemoizedButton 
                variant="outline" 
                className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-5 px-6 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
              >
                <MessageCircle className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                Discussion Forum
              </MemoizedButton>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MemoizedButton 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 ml-auto h-12 w-12 rounded-full bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/30 border border-slate-200 dark:border-slate-700 shadow-sm"
                    >
                      <Share2 className="h-5 w-5" />
                    </MemoizedButton>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                    <span className="text-xs">Share this community with your network</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
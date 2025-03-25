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
  
  // Get score class based on score value
  const scoreClass = companyData.score > 70 
    ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50' 
    : companyData.score > 40 
      ? 'bg-amber-900/40 text-amber-400 border-amber-700/50'
      : 'bg-red-900/40 text-red-400 border-red-700/50';
  
  const formattedDate = format(companyData.formattedDate, 'MMM dd, yyyy');
  
  return (
    <div className="rounded-xl overflow-hidden mb-8 relative border border-zinc-800/70 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.3)]">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/80 via-indigo-500/20 to-transparent z-10" />
      <div className="absolute top-1 right-0 w-[40%] h-px bg-gradient-to-l from-zinc-400/10 to-transparent" />
      
      {/* Banner section with enhanced gradient overlay */}
      <div className="relative h-64 w-full">
        {companyData.bannerUrl ? (
          <div 
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{backgroundImage: `url(${companyData.bannerUrl})`}}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black/20 to-black/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95" />
      </div>
      
      <div className="relative z-10 p-6 sm:p-8 -mt-36">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Logo section with enhanced styling */}
          <div className="relative h-32 w-32 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] ring-2 ring-black/60">
            {companyData.logoUrl ? (
              <div 
                className="h-full w-full bg-center bg-cover"
                style={{backgroundImage: `url(${companyData.logoUrl})`}}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-zinc-800/80 to-black">
                <Building className="h-16 w-16 text-indigo-400 drop-shadow-[0_1px_2px_rgba(99,102,241,0.4)]" />
              </div>
            )}
          </div>
          
          <div className="flex-1 mt-8 sm:mt-2">
            {/* Main content header with enhanced typography and community value prop */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Badge className="bg-indigo-900/40 text-indigo-300 border border-indigo-700/30 px-3 py-1 rounded-full text-xs font-medium mr-3">
                  <Globe className="h-3 w-3 mr-1.5" />
                  Active Community
                </Badge>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight drop-shadow-sm">
                {companyData.name}
              </h1>
              
              <p className="text-zinc-300 text-lg max-w-2xl mb-2">
                Connect with forward-thinking investors and industry experts focused on {companyData.name}'s sustainable growth and impact initiatives.
              </p>
            </div>
            
            {/* Community benefits section - NEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7 mt-4 bg-black/30 p-4 rounded-xl border border-zinc-800/30">
              <div className="flex items-start">
                <div className="bg-indigo-900/30 p-2 rounded-lg mr-3">
                  <LightbulbIcon className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium">Exclusive Insights</h3>
                  <p className="text-zinc-400 text-xs">Gain access to proprietary market research</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-emerald-900/30 p-2 rounded-lg mr-3">
                  <Zap className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium">Direct Engagement</h3>
                  <p className="text-zinc-400 text-xs">Connect with industry leaders and ambassadors</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-900/30 p-2 rounded-lg mr-3">
                  <Award className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium">Premium Opportunities</h3>
                  <p className="text-zinc-400 text-xs">First access to sustainable investment deals</p>
                </div>
              </div>
            </div>
            
            {/* Stats row with modern badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Badge className={`${scoreClass} text-sm py-1.5 pl-1.5 pr-2.5 shadow-md shadow-black/20`}>
                        <div className="bg-white/10 rounded-full p-1 mr-1.5">
                          <Leaf className="h-3.5 w-3.5 drop-shadow-sm" />
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
                        <Badge className="bg-amber-900/30 text-amber-400 border border-amber-700/30 text-sm py-1.5 pl-1.5 pr-2.5 shadow-md shadow-black/20">
                          <div className="bg-white/10 rounded-full p-1 mr-1.5">
                            <Award className="h-3.5 w-3.5 drop-shadow-sm" />
                          </div>
                          {ambassadors.length} Ambassador{ambassadors.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border border-zinc-700 text-white">
                      <span className="text-xs">Thought leaders and industry experts guiding this community</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <Badge className="bg-zinc-800/60 text-zinc-300 border border-zinc-700/30 text-sm py-1.5 pl-1.5 pr-2.5 shadow-md shadow-black/20">
                <div className="bg-white/10 rounded-full p-1 mr-1.5">
                  <Users className="h-3.5 w-3.5 drop-shadow-sm" />
                </div>
                {community.ambassadorCount || 0} active members
              </Badge>
              
              <Badge className="bg-indigo-900/30 text-indigo-400 border border-indigo-700/30 text-sm py-1.5 pl-1.5 pr-2.5 shadow-md shadow-black/20">
                <div className="bg-white/10 rounded-full p-1 mr-1.5">
                  <TrendingUp className="h-3.5 w-3.5 drop-shadow-sm" />
                </div>
                Market Updates
              </Badge>
              
              <div className="flex items-center text-sm text-zinc-400 ml-auto">
                <div className="bg-black/30 rounded-md px-3 py-1 border border-zinc-800/50 flex items-center gap-2 shadow-inner">
                  <Calendar className="h-4 w-4 text-emerald-400 drop-shadow-sm" />
                  <span>Since {formattedDate}</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons with premium design and community-focused CTAs */}
            <div className="flex flex-wrap gap-3 mt-6">
              <MemoizedButton 
                className={isFollowing 
                  ? "bg-emerald-700/40 text-emerald-400 border border-emerald-700/50 font-medium py-5 px-6 shadow-md shadow-black/20"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-medium py-5 px-6 shadow-md shadow-black/20"}
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
              
              <MemoizedButton 
                variant="outline" 
                className="border-zinc-700/60 bg-black/40 backdrop-blur-sm text-white py-5 px-6 hover:bg-black/60 shadow-md shadow-black/20"
              >
                <Bell className="h-5 w-5 mr-2 text-emerald-400 drop-shadow-sm" />
                Get Updates
              </MemoizedButton>
              
              <MemoizedButton 
                variant="outline" 
                className="border-zinc-700/60 bg-black/40 backdrop-blur-sm text-white py-5 px-6 hover:bg-black/60 shadow-md shadow-black/20"
              >
                <MessageCircle className="h-5 w-5 mr-2 text-blue-400 drop-shadow-sm" />
                Discussion Forum
              </MemoizedButton>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MemoizedButton 
                      variant="ghost" 
                      size="icon" 
                      className="text-zinc-400 hover:text-zinc-300 ml-auto h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 border border-zinc-800/60 shadow-md shadow-black/30"
                    >
                      <Share2 className="h-5 w-5 drop-shadow-sm" />
                    </MemoizedButton>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/90 border border-zinc-700 text-white">
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
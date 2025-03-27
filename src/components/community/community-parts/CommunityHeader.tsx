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
  
  // Get score class based on score value (now uses monochromatic slate palette)
  const scoreClass = 'bg-slate-50 text-slate-700 border-slate-200';
  
  const formattedDate = format(companyData.formattedDate, 'MMM dd, yyyy');
  
  return (
    <div 
      className="rounded-2xl overflow-hidden mb-8 relative border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      style={{ 
        backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
      }}
    >
      {/* Subtle texture pattern for depth */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Top edge shadow line for definition */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30 z-10"></div>
      <div className="absolute top-1 right-0 w-[40%] h-px bg-gradient-to-l from-slate-300/40 to-transparent"></div>
      
      {/* Banner section with gradient overlay */}
      <div className="relative h-64 w-full">
        {companyData.bannerUrl ? (
          <div 
            className="absolute inset-0 bg-center bg-cover opacity-70"
            style={{backgroundImage: `url(${companyData.bannerUrl})`}}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/60 to-white/95"></div>
      </div>
      
      {/* Inner shadow effects for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
      
      <div className="relative z-10 p-6 sm:p-8 -mt-36">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Logo section with enhanced styling */}
          <div className="relative h-32 w-32 rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-2 ring-white/80">
            {companyData.logoUrl ? (
              <div 
                className="h-full w-full bg-center bg-cover"
                style={{backgroundImage: `url(${companyData.logoUrl})`}}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-slate-50 to-white">
                <Building className="h-16 w-16 text-slate-600" />
              </div>
            )}
          </div>
          
          <div className="flex-1 mt-8 sm:mt-2">
            {/* Main content header with enhanced typography and community value prop */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Badge className="bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs font-medium mr-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <Globe className="h-3 w-3 mr-1.5" />
                  Active Community
                </Badge>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 tracking-tight">
                {companyData.name}
              </h1>
              
              <p className="text-slate-600 text-lg max-w-2xl mb-2">
                Connect with forward-thinking investors and industry experts focused on {companyData.name}'s sustainable growth and impact initiatives.
              </p>
            </div>
            
            {/* Community benefits section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7 mt-4 bg-white/80 p-4 rounded-xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-lg mr-3">
                  <LightbulbIcon className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-slate-800 text-sm font-medium">Exclusive Insights</h3>
                  <p className="text-slate-500 text-xs">Gain access to proprietary market research</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-lg mr-3">
                  <Zap className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-slate-800 text-sm font-medium">Direct Engagement</h3>
                  <p className="text-slate-500 text-xs">Connect with industry leaders and ambassadors</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-lg mr-3">
                  <Award className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-slate-800 text-sm font-medium">Premium Opportunities</h3>
                  <p className="text-slate-500 text-xs">First access to sustainable investment deals</p>
                </div>
              </div>
            </div>
            
            {/* Stats row with modern badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Badge className={`${scoreClass} text-sm py-1.5 pl-1.5 pr-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]`}>
                        <div className="bg-white rounded-full p-1 mr-1.5 border border-slate-200">
                          <Leaf className="h-3.5 w-3.5 text-slate-600" />
                        </div>
                        {companyData.score} Impact Score
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border border-slate-200 text-slate-800">
                    <span className="text-xs">ESG impact score measuring environmental and social governance</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {hasAmbassadors && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Badge className="bg-slate-50 text-slate-700 border border-slate-200 text-sm py-1.5 pl-1.5 pr-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <div className="bg-white rounded-full p-1 mr-1.5 border border-slate-200">
                            <Award className="h-3.5 w-3.5 text-slate-600" />
                          </div>
                          {ambassadors.length} Ambassador{ambassadors.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white border border-slate-200 text-slate-800">
                      <span className="text-xs">Thought leaders and industry experts guiding this community</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <Badge className="bg-slate-50 text-slate-600 border border-slate-200 text-sm py-1.5 pl-1.5 pr-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="bg-white rounded-full p-1 mr-1.5 border border-slate-200">
                  <Users className="h-3.5 w-3.5 text-slate-600" />
                </div>
                {community.ambassadorCount || 0} active members
              </Badge>
              
              <Badge className="bg-slate-50 text-slate-700 border border-slate-200 text-sm py-1.5 pl-1.5 pr-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="bg-white rounded-full p-1 mr-1.5 border border-slate-200">
                  <TrendingUp className="h-3.5 w-3.5 text-slate-600" />
                </div>
                Market Updates
              </Badge>
              
              <div className="flex items-center text-sm text-slate-600 ml-auto">
                <div className="bg-slate-50 rounded-md px-3 py-1 border border-slate-200 flex items-center gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <Calendar className="h-4 w-4 text-slate-600" />
                  <span>Since {formattedDate}</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons with premium design and community-focused CTAs */}
            <div className="flex flex-wrap gap-3 mt-6">
              <MemoizedButton 
                className={isFollowing 
                  ? "bg-slate-50 text-slate-700 border border-slate-200 font-medium py-5 px-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:bg-slate-100 transition-all duration-300 ease-out hover:translate-y-[-2px]"
                  : "bg-slate-900 hover:bg-slate-800 text-white font-medium py-5 px-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:translate-y-[-2px] rounded-lg"}
                onClick={handleFollowToggle}
              >
                {isFollowing ? (
                  <>
                    <Heart className="h-5 w-5 mr-2 fill-slate-500 text-slate-500" />
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
                className="border-slate-200 bg-white text-slate-700 py-5 px-6 hover:bg-slate-50 hover:text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out hover:translate-y-[-2px]"
              >
                <Bell className="h-5 w-5 mr-2 text-slate-600" />
                Get Updates
              </MemoizedButton>
              
              <MemoizedButton 
                variant="outline" 
                className="border-slate-200 bg-white text-slate-700 py-5 px-6 hover:bg-slate-50 hover:text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out hover:translate-y-[-2px]"
              >
                <MessageCircle className="h-5 w-5 mr-2 text-slate-600" />
                Discussion Forum
              </MemoizedButton>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MemoizedButton 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 hover:text-slate-700 ml-auto h-12 w-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out hover:translate-y-[-2px]"
                    >
                      <Share2 className="h-5 w-5" />
                    </MemoizedButton>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border border-slate-200 text-slate-800">
                    <span className="text-xs">Share this community</span>
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
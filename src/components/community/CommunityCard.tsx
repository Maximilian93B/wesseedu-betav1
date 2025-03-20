import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Building, Calendar, ArrowRight, Leaf, TrendingUp, Award } from 'lucide-react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import { CommunityCardProps } from '@/types/community'

export default function CommunityCard({ community, onSelect }: CommunityCardProps) {
  const companyName = community.companies?.name || 'Unknown Company'
  const companyDescription = community.companies?.mission_statement || community.companies?.description || 'No description available'
  const logoUrl = community.companies?.image_url || '/placeholder-logo.png'
  const formattedDate = formatDistanceToNow(new Date(community.created_at), { addSuffix: true })
  const isMember = community.isMember === true
  
  // Safely handle potentially undefined ambassador properties
  const hasAmbassadors = 
    community.hasAmbassadors === true || 
    (community.ambassadorCount !== undefined && community.ambassadorCount > 0)
  
  // Derive sustainability score for visualization
  const score = community.companies?.score || 0
  const scoreClass = score > 70 
    ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50' 
    : score > 40 
      ? 'bg-amber-900/40 text-amber-400 border-amber-700/50'
      : 'bg-red-900/40 text-red-400 border-red-700/50'
  
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 hover:border-emerald-600/20 relative group">
      {/* Ambassador Badge */}
      {hasAmbassadors && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="font-medium bg-amber-900/30 text-amber-400 border border-amber-700/30">
            <Award className="h-3 w-3 mr-1" />
            With Ambassadors
          </Badge>
        </div>
      )}
      
      {/* Member Badge */}
      {isMember && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="font-medium bg-emerald-900/40 text-emerald-400 border-emerald-700/50">
            Member
          </Badge>
        </div>
      )}
      
      {/* Score Badge - position depends on if member badge exists */}
      <div className={`absolute ${isMember ? 'top-11' : 'top-3'} right-3 z-10`}>
        <Badge className={`font-medium ${scoreClass}`}>
          <Leaf className="h-3 w-3 mr-1" />
          {score} Impact Score
        </Badge>
      </div>
      
      <CardHeader className="pb-0">
        <div className="flex items-center space-x-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-emerald-700/50 transition-all">
            {logoUrl ? (
              <Image 
                src={logoUrl} 
                alt={companyName} 
                fill 
                className="object-cover"
              />
            ) : (
              <Building className="h-6 w-6 text-zinc-400" />
            )}
          </div>
          <div>
            <CardTitle className="text-lg text-white">{companyName}</CardTitle>
            <div className="flex items-center text-xs text-zinc-400">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Created {formattedDate}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pt-4">
        <div className="space-y-3">
          <CardDescription className="line-clamp-3 text-sm text-zinc-400">
            {companyDescription}
          </CardDescription>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="bg-zinc-800/50 text-xs font-normal border-zinc-700">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-400" />
              Sustainability
            </Badge>
            <Badge variant="outline" className="bg-zinc-800/50 text-xs font-normal border-zinc-700">
              <Users className="h-3 w-3 mr-1 text-blue-400" />
              Private Equity
            </Badge>
          </div>
          
          {/* Featured Ambassador Section */}
          {community.featuredAmbassador && (
            <div className="pt-3 mt-3 border-t border-zinc-800">
              <div className="flex items-center">
                <Award className="h-3 w-3 text-amber-400 mr-1" />
                <span className="text-xs font-medium text-zinc-400">Featured Ambassador</span>
              </div>
              <div className="flex items-center mt-2 gap-2">
                <Avatar className="h-6 w-6 border border-amber-700/50">
                  <AvatarImage src={community.featuredAmbassador.avatar_url || undefined} />
                  <AvatarFallback className="bg-amber-900/30 text-amber-400 text-xs">
                    {community.featuredAmbassador.name?.substring(0, 2).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-zinc-400 truncate">
                  {community.featuredAmbassador.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={() => onSelect(community.id)}
            className={`w-full ${isMember 
              ? 'bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-400 border border-emerald-700/50' 
              : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-600/30 text-white'} group`}
          >
            <span className={`mr-auto ${!isMember && 'text-emerald-400 group-hover:text-white transition-colors'}`}>
              {isMember ? 'View Your Community' : 'View Community'}
            </span>
            <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
} 
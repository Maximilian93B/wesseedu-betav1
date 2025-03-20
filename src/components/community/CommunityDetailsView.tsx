import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Building, ArrowLeft, Award, Leaf, TrendingUp, MessageCircle, Bell, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion, AnimatePresence } from 'framer-motion'
import { Community } from '@/types/community'

interface CommunityDetailsViewProps {
  community: Community
  onBack: () => void
}

export default function CommunityDetailsView({ community, onBack }: CommunityDetailsViewProps) {
  const [activeTab, setActiveTab] = useState('about')
  const [isFollowing, setIsFollowing] = useState(community.isMember || false)
  
  const companyName = community.companies?.name || 'Unknown Company'
  const companyDescription = community.companies?.mission_statement || community.companies?.description || 'No description available'
  const logoUrl = community.companies?.image_url || '/placeholder-logo.png'
  const formattedDate = community.created_at ? format(new Date(community.created_at), 'MMM dd, yyyy') : 'Unknown date'
  
  // Derive sustainability score for visualization
  const score = community.companies?.score || 0
  const scoreClass = score > 70 
    ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50' 
    : score > 40 
      ? 'bg-amber-900/40 text-amber-400 border-amber-700/50'
      : 'bg-red-900/40 text-red-400 border-red-700/50'
  
  const hasAmbassadors = community.ambassadors && community.ambassadors.length > 0
  const ambassadors = community.ambassadors || []
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    // Here you would typically call an API to update the follow status
  }
  
  return (
    <div className="w-full">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBack}
        className="mb-6 bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-800 text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-2 text-emerald-400" />
        Back to Communities
      </Button>
      
      {/* Community Header */}
      <div className="rounded-xl overflow-hidden mb-8 relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-emerald-950/10 to-transparent" />
        
        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
              {logoUrl ? (
                <Image 
                  src={logoUrl} 
                  alt={companyName} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <Building className="h-10 w-10 text-zinc-400 m-auto" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className={scoreClass}>
                  <Leaf className="h-3 w-3 mr-1" />
                  {score} Impact Score
                </Badge>
                
                {hasAmbassadors && (
                  <Badge className="bg-amber-900/30 text-amber-400 border border-amber-700/30">
                    <Award className="h-3 w-3 mr-1" />
                    With Ambassadors ({ambassadors.length})
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{companyName}</h1>
              
              <div className="flex items-center text-sm text-zinc-400 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Community since {formattedDate}</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  className={isFollowing 
                    ? "bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-400 border border-emerald-700/50"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? (
                    <>
                      <Heart className="h-4 w-4 mr-2 fill-emerald-400 text-emerald-400" />
                      Following
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-700">
                  <Bell className="h-4 w-4 mr-2 text-emerald-400" />
                  Get Alerts
                </Button>
                
                <Button variant="outline" className="border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-700">
                  <MessageCircle className="h-4 w-4 mr-2 text-emerald-400" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
          <TabsTrigger 
            value="about"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
          >
            About
          </TabsTrigger>
          
          <TabsTrigger 
            value="updates"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
          >
            Updates
          </TabsTrigger>
          
          {hasAmbassadors && (
            <TabsTrigger 
              value="ambassadors"
              className="data-[state=active]:bg-amber-900/30 data-[state=active]:text-amber-400"
            >
              <Award className="h-3 w-3 mr-1" />
              Ambassadors
            </TabsTrigger>
          )}
          
          <TabsTrigger 
            value="investors"
            className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
          >
            <Users className="h-3 w-3 mr-1" />
            Investors
          </TabsTrigger>
        </TabsList>
        
        {/* About Tab Content */}
        <TabsContent value="about" className="mt-6">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">About Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Mission Statement</h3>
                <p className="text-zinc-400">{companyDescription}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400 mr-2" />
                    <h4 className="font-medium text-white">Sustainability Goals</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    This community is focused on sustainable investments in the renewable energy sector,
                    aiming to reduce carbon footprint while delivering strong financial returns.
                  </p>
                </div>
                
                <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-blue-400 mr-2" />
                    <h4 className="font-medium text-white">Investor Profile</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Ideal for impact investors looking for long-term growth in sustainable technologies
                    and companies with strong environmental governance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Updates Tab Content */}
        <TabsContent value="updates" className="mt-6">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Latest Updates</CardTitle>
              <CardDescription className="text-zinc-400">Stay informed about the latest news and developments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-2 border-emerald-600 pl-4 py-1">
                  <h3 className="text-lg font-medium text-white mb-1">Quarterly Sustainability Report Released</h3>
                  <p className="text-sm text-zinc-400 mb-2">
                    Our latest sustainability metrics show a 15% reduction in carbon emissions across our investments.
                  </p>
                  <div className="flex items-center text-xs text-zinc-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Posted 2 weeks ago</span>
                  </div>
                </div>
                
                <div className="border-l-2 border-emerald-600 pl-4 py-1">
                  <h3 className="text-lg font-medium text-white mb-1">New Investment Opportunity</h3>
                  <p className="text-sm text-zinc-400 mb-2">
                    We've identified a promising new venture in renewable energy storage technology.
                  </p>
                  <div className="flex items-center text-xs text-zinc-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Posted 1 month ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Ambassadors Tab Content */}
        {hasAmbassadors && (
          <TabsContent value="ambassadors" className="mt-6">
            <Card className="bg-zinc-900/60 border-zinc-800">
              <CardHeader>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-400 mr-2" />
                  <CardTitle className="text-xl text-white">Community Ambassadors</CardTitle>
                </div>
                <CardDescription className="text-zinc-400">
                  Our ambassadors provide exclusive insights and connect investors with opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {ambassadors.map((ambassador) => (
                      <motion.div 
                        key={ambassador.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-amber-700/40 transition-colors"
                      >
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12 border-2 border-amber-700/50">
                            <AvatarImage src={ambassador.avatar_url || undefined} />
                            <AvatarFallback className="bg-amber-900/30 text-amber-400">
                              {ambassador.name?.substring(0, 2).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-white text-lg">{ambassador.name}</h3>
                            <p className="text-amber-400 text-sm mb-1">{ambassador.role}</p>
                            <p className="text-zinc-400 text-sm mb-2 line-clamp-2">{ambassador.bio}</p>
                            <div className="flex items-center text-xs text-zinc-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Ambassador since {format(new Date(ambassador.joined_date), 'MMM yyyy')}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-amber-900/30 to-transparent border-t border-amber-800/20 px-6 py-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-400 mr-2" />
                  <p className="text-amber-300 text-sm">
                    Ambassadors provide exclusive insights and early access to investment opportunities.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
        
        {/* Investors Tab Content */}
        <TabsContent value="investors" className="mt-6">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Active Investors</CardTitle>
              <CardDescription className="text-zinc-400">Community members who have invested in our opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                This feature is coming soon. Stay tuned for updates on active investors in this community.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Building2, Filter, SlidersHorizontal, Search, Award } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from 'framer-motion'
import CommunityCard from './CommunityCard'
import { Community } from '@/types/community'
import { useCommunities } from '@/hooks/use-communities'

interface CommunitiesViewProps {
  onCommunitySelect: (id: string) => void
}

export default function CommunitiesView({ onCommunitySelect }: CommunitiesViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all-communities')

  const { 
    communities, 
    loading, 
    fetchCommunities, 
    filterCommunities,
    hasAmbassadorCommunities 
  } = useCommunities()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchCommunities(searchQuery)
  }

  // Filter communities based on active tab and search query
  const filteredCommunities = filterCommunities(activeTab, searchQuery)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 items-center bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Building2 className="h-6 w-6 mr-2 text-emerald-400" />
            <span>Explore Communities</span>
          </h2>
          <p className="text-zinc-400 mt-1">Discover sustainable communities working towards a better future</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search communities..."
              className="pl-10 min-w-[200px] bg-zinc-900/60 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-emerald-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full sm:w-[180px] bg-zinc-900/60 border-zinc-800 text-white">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-emerald-400" />
                  <SelectValue placeholder="Filter by" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="all-communities">All Communities</SelectItem>
                {hasAmbassadorCommunities() && (
                  <SelectItem value="ambassador-communities" className="flex items-center">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-amber-400" />
                      With Ambassadors
                    </div>
                  </SelectItem>
                )}
                <SelectItem value="my-communities">My Communities</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-zinc-900/60 border-zinc-800 text-white hover:bg-zinc-800"
              onClick={() => fetchCommunities(searchQuery)}
            >
              <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
            </Button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-14 h-14 border-2 border-t-emerald-500 border-r-emerald-400/40 border-b-emerald-400/20 border-l-emerald-400/60 rounded-full animate-spin"></div>
        </div>
      ) : filteredCommunities.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCommunities.map((community) => (
            <motion.div key={community.id} variants={item}>
              <CommunityCard 
                community={community} 
                onSelect={onCommunitySelect}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/30 rounded-xl border border-zinc-800 text-center">
          <Users className="h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-xl font-medium text-white">No communities found</h3>
          <p className="text-zinc-400 mt-2 max-w-md">
            We couldn't find any communities matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <Button 
            onClick={() => {
              setSearchQuery('')
              setActiveTab('all-communities')
              fetchCommunities()
            }}
            className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
} 
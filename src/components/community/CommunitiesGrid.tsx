import { motion } from 'framer-motion'
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { CommunityCard } from './CommunityCard'
import { ExtendedCommunity } from './CommunitiesView'

interface CommunitiesGridProps {
  filteredCommunities: ExtendedCommunity[]
  isLoading: boolean
  handleCardSelect: (id: string) => void
  clearFilters: () => void
}

export function CommunitiesGrid({
  filteredCommunities,
  isLoading,
  handleCardSelect,
  clearFilters
}: CommunitiesGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} className="h-[350px] w-full bg-zinc-900/40 rounded-xl" />
        ))}
      </div>
    )
  }
  
  if (filteredCommunities.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 text-center bg-black/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl"
      >
        <div className="max-w-sm mx-auto">
          <Filter className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-2">No matching communities</h3>
          <p className="text-sm text-zinc-500 mb-4">Try adjusting your filters or search query to find what you're looking for.</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilters} 
            className="bg-black/60 text-zinc-300 border-zinc-700/50"
          >
            Clear all filters
          </Button>
        </div>
      </motion.div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCommunities.map((community) => (
        <div 
          key={`community-${community.id}`}
          onClick={() => handleCardSelect(community.id)}
        >
          <CommunityCard
            key={community.id}
            id={community.id}
            name={community.name}
            slug={community.slug}
            description={community.description || ''}
            image={community.image}
            memberCount={community.memberCount}
            postCount={community.postCount}
            ambassadorCount={community.ambassadorCount || 0}
            ambassadors={community.ambassadors?.map(a => ({
              id: typeof a === 'object' && 'id' in a ? a.id : '',
              name: typeof a === 'object' && 'name' in a ? a.name : '',
              image: typeof a === 'object' && 'avatar_url' in a ? a.avatar_url as string : undefined
            }))}
            tags={community.tags || []}
            variant={community.featured ? 'featured' : 'default'}
          />
        </div>
      ))}
    </div>
  )
} 
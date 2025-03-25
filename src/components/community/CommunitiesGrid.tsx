import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button'
import { Filter, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react'
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
  // Loading state with elegant skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="relative overflow-hidden">
            <Skeleton className="h-[350px] w-full bg-gradient-to-b from-zinc-900/60 via-zinc-900/80 to-black/80 rounded-xl border border-zinc-800/50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/40 via-indigo-500/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Skeleton className="h-6 w-2/3 bg-zinc-800/40 rounded-md mb-3" />
              <Skeleton className="h-4 w-full bg-zinc-800/30 rounded-md mb-2" />
              <Skeleton className="h-4 w-4/5 bg-zinc-800/30 rounded-md mb-3" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-7 w-16 bg-zinc-800/40 rounded-md" />
                <Skeleton className="h-7 w-20 bg-zinc-800/40 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Empty state with premium design
  if (filteredCommunities.length === 0) {
    return (
      <div className="py-16 text-center bg-gradient-to-b from-black/80 to-zinc-900/30 border border-zinc-800/40 rounded-xl shadow-[0_10px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-zinc-900 to-black rounded-full mx-auto flex items-center justify-center mb-6 border border-zinc-800/40 shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
            <AlertCircle className="h-8 w-8 text-indigo-500 drop-shadow-[0_1px_2px_rgba(99,102,241,0.3)]" />
          </div>
          <h3 className="text-xl font-medium text-white mb-4 drop-shadow-sm">No communities available</h3>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            Contact your administrator to request access to private equity communities or adjust your search filters.
          </p>
          <Button 
            onClick={clearFilters}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white border-none shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset filters
          </Button>
        </div>
      </div>
    )
  }
  
  // Community cards with refined layout and shadowing
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {filteredCommunities.map((community) => {
        // Ensure we have valid data for each community
        if (!community || !community.id) {
          return null
        }
        
        return (
          <div 
            key={`community-${community.id}`}
            onClick={() => handleCardSelect(community.id)}
            className="cursor-pointer relative"
          >
            <CommunityCard
              id={community.id}
              name={community.name || 'Unnamed Community'}
              slug={community.slug || community.id}
              description={community.description || 'No description available'}
              image={community.image || undefined}
              memberCount={community.memberCount || 0}
              postCount={community.postCount || 0}
              ambassadorCount={community.ambassadorCount || 0}
              ambassadors={Array.isArray(community.ambassadors) ? community.ambassadors.map(a => ({
                id: typeof a === 'object' && a && 'id' in a ? a.id : `ambassador-${Math.random().toString(36).substring(2, 9)}`,
                name: typeof a === 'object' && a && 'name' in a ? a.name : 'Anonymous',
                image: typeof a === 'object' && a && 'avatar_url' in a ? a.avatar_url as string : undefined
              })) : []}
              tags={Array.isArray(community.tags) ? community.tags : []}
              variant={community.featured ? 'featured' : 'default'}
            />
          </div>
        )
      })}
    </div>
  )
} 
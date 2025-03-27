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
          <div key={`skeleton-${index}`} className="relative overflow-hidden rounded-2xl">
            <Skeleton className="h-[350px] w-full bg-gradient-to-b from-slate-100 via-slate-50 to-white/80 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Skeleton className="h-6 w-2/3 bg-slate-100/70 rounded-md mb-3" />
              <Skeleton className="h-4 w-full bg-slate-100/60 rounded-md mb-2" />
              <Skeleton className="h-4 w-4/5 bg-slate-100/60 rounded-md mb-3" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-7 w-16 bg-slate-100/70 rounded-md" />
                <Skeleton className="h-7 w-20 bg-slate-100/70 rounded-md" />
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
      <div 
        className="py-16 text-center border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative"
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
        
        {/* Inner shadow effects for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="w-16 h-16 bg-slate-50 rounded-full mx-auto flex items-center justify-center mb-6 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <AlertCircle className="h-8 w-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-4">No communities available</h3>
          <p className="text-slate-600 mb-8 max-w-sm mx-auto">
            Contact your administrator to request access to private equity communities or adjust your search filters.
          </p>
          <Button 
            onClick={clearFilters}
            className="bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]
              hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
              hover:translate-y-[-2px] rounded-lg px-6 py-3"
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
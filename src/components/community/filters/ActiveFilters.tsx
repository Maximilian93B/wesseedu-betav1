import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Award, Users, Leaf, X } from 'lucide-react'

interface ActiveFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  showAmbassadors: boolean
  setShowAmbassadors: (show: boolean) => void
  selectedSectors: string[]
  handleSectorToggle: (sector: string) => void
  clearFilters: () => void
}

export function ActiveFilters({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  showAmbassadors,
  setShowAmbassadors,
  selectedSectors,
  handleSectorToggle,
  clearFilters,
}: ActiveFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs text-zinc-500">Active filters:</span>
      
      {searchQuery && (
        <Badge 
          variant="secondary" 
          className="bg-zinc-800/60 text-zinc-300 pl-2 pr-1 py-1 flex items-center gap-1"
        >
          <Search className="h-3 w-3 text-zinc-400" />
          <span>{searchQuery}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/40 rounded-full p-0"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        </Badge>
      )}
      
      {activeTab !== 'all-communities' && (
        <Badge 
          variant="secondary" 
          className={`${
            activeTab === 'ambassador-communities' 
              ? 'bg-amber-900/20 text-amber-300 border-amber-700/40'
              : 'bg-emerald-900/20 text-emerald-300 border-emerald-700/40'
          } pl-2 pr-1 py-1 flex items-center gap-1`}
        >
          {activeTab === 'ambassador-communities' ? (
            <Award className="h-3 w-3 text-amber-400" />
          ) : (
            <Users className="h-3 w-3 text-emerald-400" />
          )}
          <span>
            {activeTab === 'ambassador-communities' 
              ? 'Ambassador Communities'
              : 'My Communities'
            }
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-4 w-4 ml-1 ${
              activeTab === 'ambassador-communities'
                ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-800/40'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-800/40'
            } rounded-full p-0`}
            onClick={() => setActiveTab('all-communities')}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        </Badge>
      )}
      
      {showAmbassadors && (
        <Badge 
          variant="secondary" 
          className="bg-amber-900/20 text-amber-300 border-amber-700/40 pl-2 pr-1 py-1 flex items-center gap-1"
        >
          <Award className="h-3 w-3 text-amber-400" />
          <span>With Ambassadors</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 text-amber-400 hover:text-amber-300 hover:bg-amber-800/40 rounded-full p-0"
            onClick={() => setShowAmbassadors(false)}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        </Badge>
      )}
      
      {selectedSectors.map(sector => (
        <Badge 
          key={sector}
          variant="secondary" 
          className="bg-emerald-900/20 text-emerald-300 border-emerald-700/40 pl-2 pr-1 py-1 flex items-center gap-1"
        >
          <Leaf className="h-3 w-3 text-emerald-400" />
          <span>{sector}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-800/40 rounded-full p-0"
            onClick={() => handleSectorToggle(sector)}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        </Badge>
      ))}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-6 text-xs text-zinc-400 hover:text-zinc-300"
        onClick={clearFilters}
      >
        Clear all
      </Button>
    </div>
  )
} 
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, SlidersHorizontal, Award, Leaf, X } from 'lucide-react'
import { Users } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeTab?: string
  setActiveTab?: (tab: string) => void
  sortOption?: 'newest' | 'popular' | 'alphabetical'
  setSortOption?: (option: 'newest' | 'popular' | 'alphabetical') => void
  showAmbassadors?: boolean
  setShowAmbassadors?: (show: boolean) => void
  selectedSectors?: string[]
  handleSectorToggle?: (sector: string) => void
  clearFilters?: () => void
  allSectors?: string[]
  hasActiveFilters?: boolean
  checkAmbassadorCommunities?: () => boolean
  fetchCommunities?: (query?: string) => void
  fullWidth?: boolean
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  sortOption,
  setSortOption,
  showAmbassadors,
  setShowAmbassadors,
  selectedSectors,
  handleSectorToggle,
  clearFilters,
  allSectors,
  hasActiveFilters,
  checkAmbassadorCommunities,
  fetchCommunities,
  fullWidth
}: FilterBarProps) {
  // Header style filter bar (compact)
  if (!fullWidth && activeTab && setActiveTab && fetchCommunities) {
    return (
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
              {checkAmbassadorCommunities && checkAmbassadorCommunities() && (
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
    )
  }

  // Full width filter bar with more options
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input 
          placeholder="Search communities..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-black/60 border-zinc-800/70 focus:border-zinc-700 rounded-lg"
        />
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-zinc-400 hover:text-zinc-300"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {setSortOption && sortOption && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-black/60 border-zinc-800/70 text-zinc-300 hover:bg-zinc-900/60">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black/90 backdrop-blur-md border-zinc-800 min-w-[180px]">
            <DropdownMenuLabel className="text-zinc-400">Sort Communities</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800/50" />
            <DropdownMenuItem 
              className={`cursor-pointer ${sortOption === 'popular' ? 'text-emerald-400' : 'text-zinc-300'}`}
              onClick={() => setSortOption('popular')}
            >
              <Users className="mr-2 h-4 w-4" />
              Most Popular
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`cursor-pointer ${sortOption === 'newest' ? 'text-emerald-400' : 'text-zinc-300'}`}
              onClick={() => setSortOption('newest')}
            >
              <Filter className="mr-2 h-4 w-4" />
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={`cursor-pointer ${sortOption === 'alphabetical' ? 'text-emerald-400' : 'text-zinc-300'}`}
              onClick={() => setSortOption('alphabetical')}
            >
              <Filter className="mr-2 h-4 w-4" />
              Alphabetical
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {setShowAmbassadors && showAmbassadors !== undefined && handleSectorToggle && allSectors && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-black/60 border-zinc-800/70 text-zinc-300 hover:bg-zinc-900/60">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black/90 backdrop-blur-md border-zinc-800 min-w-[220px]">
            <DropdownMenuLabel className="text-zinc-400">Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800/50" />
            <DropdownMenuItem 
              className={`cursor-pointer ${showAmbassadors ? 'text-amber-400' : 'text-zinc-300'}`}
              onClick={() => setShowAmbassadors(!showAmbassadors)}
            >
              <Award className={`mr-2 h-4 w-4 ${showAmbassadors ? 'text-amber-400' : ''}`} />
              With Ambassadors
              {showAmbassadors && <div className="ml-auto h-2 w-2 rounded-full bg-amber-400" />}
            </DropdownMenuItem>
            
            {allSectors.length > 0 && (
              <>
                <DropdownMenuSeparator className="bg-zinc-800/50" />
                <DropdownMenuLabel className="text-zinc-400">Filter by Sector</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800/50" />
                {allSectors.map((sector) => (
                  <DropdownMenuItem 
                    key={sector}
                    className={`cursor-pointer ${selectedSectors?.includes(sector) ? 'text-emerald-400' : 'text-zinc-300'}`}
                    onClick={() => handleSectorToggle(sector)}
                  >
                    <Leaf className={`mr-2 h-4 w-4 ${selectedSectors?.includes(sector) ? 'text-emerald-400' : ''}`} />
                    {sector}
                    {selectedSectors?.includes(sector) && <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />}
                  </DropdownMenuItem>
                ))}
              </>
            )}
            
            {hasActiveFilters && clearFilters && (
              <>
                <DropdownMenuSeparator className="bg-zinc-800/50" />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-400"
                  onClick={clearFilters}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All Filters
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
} 
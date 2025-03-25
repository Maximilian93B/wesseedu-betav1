import { memo, useMemo } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Memoized Button for better performance
const MemoizedButton = memo(Button);

interface AboutTabProps {
  description: string
  showFullDescription: boolean
  setShowFullDescription: (show: boolean) => void
}

export const AboutTab = ({ 
  description, 
  showFullDescription, 
  setShowFullDescription 
}: AboutTabProps) => {
  
  // Truncate description if it's too long and not showing full version
  const displayDescription = useMemo(() => {
    return showFullDescription || description.length <= 300
      ? description
      : `${description.slice(0, 300)}...`
  }, [description, showFullDescription]);
  
  return (
    <TabsContent value="about" className="mt-6">
      <Card className="bg-white dark:bg-slate-900 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-200">About Community</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">Mission Statement</h3>
            <p className="text-slate-600 dark:text-slate-400">{displayDescription}</p>
            
            {description.length > 300 && (
              <MemoizedButton 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-2 h-8"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <>
                    Show Less <ChevronUp className="h-3.5 w-3.5 ml-1" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </>
                )}
              </MemoizedButton>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2" />
                <h4 className="font-medium text-slate-800 dark:text-slate-200">Sustainability Goals</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                This community is focused on sustainable investments in the renewable energy sector,
                aiming to reduce carbon footprint while delivering strong financial returns.
              </p>
            </div>
            
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                <h4 className="font-medium text-slate-800 dark:text-slate-200">Investor Profile</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ideal for impact investors looking for long-term growth in sustainable technologies
                and companies with strong environmental governance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
} 
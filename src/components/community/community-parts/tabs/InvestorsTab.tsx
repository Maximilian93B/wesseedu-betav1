import { memo } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Memoized Button for better performance
const MemoizedButton = memo(Button);

export const InvestorsTab = () => {
  return (
    <TabsContent value="investors" className="mt-6">
      <Card className="bg-white dark:bg-slate-900 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-200 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
            Community Investors
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Meet the people investing in this sustainable community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-5 max-w-md w-full">
                <div className="text-center">
                  <Users className="h-10 w-10 text-blue-500 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">Join Our Community</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Be part of our growing network of investors making a positive impact on the world.
                  </p>
                  <MemoizedButton className="bg-blue-600 hover:bg-blue-500 text-white">
                    Become an Investor
                  </MemoizedButton>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-slate-200 dark:border-slate-800/50 py-4">
          <div className="w-full">
            <div className="text-xs text-slate-500 dark:text-slate-500 mb-3">Investment Statistics</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Investors</div>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">27</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Average Investment</div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">$15,300</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Growth Rate</div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">+12.4%</div>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  )
} 
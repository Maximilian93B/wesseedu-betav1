import { memo } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, TrendingUp, Bell, ChevronDown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

// Memoized Button for better performance
const MemoizedButton = memo(Button);

export const UpdatesTab = () => {
  return (
    <TabsContent value="updates" className="mt-6">
      <Card className="bg-black/60 backdrop-blur-sm border-zinc-800/70 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-400" />
            Latest Updates
          </CardTitle>
          <CardDescription className="text-zinc-400">Stay informed about the latest news and developments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Placeholder update content */}
            <AnimatePresence>
              <motion.div
                key="sustainability-report"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <div className="rounded-xl border border-zinc-800/70 bg-black/40 backdrop-blur-sm p-5 hover:bg-zinc-900/20 transition-colors group-hover:border-zinc-700/70">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 p-2.5 border border-emerald-600/30">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white group-hover:text-emerald-300 transition-colors">
                        Quarterly Sustainability Report Released
                      </h3>
                      <div className="flex items-center text-xs text-zinc-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="pl-11">
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                      Our latest sustainability metrics show a 15% reduction in carbon emissions across our investments.
                      We've also increased our renewable energy portfolio by 22% this quarter.
                    </p>
                    <MemoizedButton 
                      variant="outline" 
                      size="sm" 
                      className="bg-black/60 text-emerald-400 border-emerald-800/30 hover:bg-emerald-950/20"
                    >
                      View Report
                      <ExternalLink className="h-3.5 w-3.5 ml-2" />
                    </MemoizedButton>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                key="investor-webinar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <div className="rounded-xl border border-zinc-800/70 bg-black/40 backdrop-blur-sm p-5 hover:bg-zinc-900/20 transition-colors group-hover:border-zinc-700/70">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="rounded-full bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-2.5 border border-blue-600/30">
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                        Upcoming Investor Webinar
                      </h3>
                      <div className="flex items-center text-xs text-zinc-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>1 month ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="pl-11">
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                      Join us for an exclusive webinar where we'll discuss new investment opportunities
                      and meet with our celebrity ambassadors. Reserve your spot today.
                    </p>
                    <MemoizedButton 
                      variant="outline" 
                      size="sm" 
                      className="bg-black/60 text-blue-400 border-blue-800/30 hover:bg-blue-950/20"
                    >
                      Register Now
                      <ExternalLink className="h-3.5 w-3.5 ml-2" />
                    </MemoizedButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800/50 py-4">
          <MemoizedButton 
            variant="ghost" 
            className="ml-auto text-zinc-400 hover:text-zinc-300"
          >
            View All Updates
            <ChevronDown className="ml-2 h-4 w-4" />
          </MemoizedButton>
        </CardFooter>
      </Card>
    </TabsContent>
  )
} 
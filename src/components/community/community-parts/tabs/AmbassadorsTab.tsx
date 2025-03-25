import { memo } from 'react'
import Image from 'next/image'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Ambassador } from '@/types/community'

// Memoized Button for better performance
const MemoizedButton = memo(Button);

interface AmbassadorsTabProps {
  ambassadors: Ambassador[]
}

export const AmbassadorsTab = ({ ambassadors }: AmbassadorsTabProps) => {
  return (
    <TabsContent value="ambassadors" className="mt-6">
      <Card className="bg-white dark:bg-slate-900 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-200 flex items-center">
            <Award className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
            Celebrity Ambassadors
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Meet the influential figures supporting this community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ambassadors.map((ambassador: Ambassador, index: number) => (
              <motion.div 
                key={ambassador.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="rounded-xl overflow-hidden border border-orange-200 dark:border-orange-900/30 bg-gradient-to-b from-white to-orange-50 dark:from-slate-900 dark:to-orange-950/10 shadow-md">
                  <div className="relative h-48 w-full">
                    {ambassador.avatar_url ? (
                      <Image 
                        src={ambassador.avatar_url} 
                        alt={`${ambassador.name} cover`} 
                        fill 
                        className="object-cover"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-orange-100 to-white dark:from-orange-900/20 dark:to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-900/90 to-transparent" />
                  </div>
                  
                  <div className="p-5 relative">
                    <div className="flex items-start gap-4">
                      <div className="relative -mt-12 border-4 border-white dark:border-slate-800 rounded-full overflow-hidden h-20 w-20 bg-orange-50 dark:bg-orange-900/30 shadow-md">
                        {ambassador.avatar_url ? (
                          <Image 
                            src={ambassador.avatar_url} 
                            alt={ambassador.name} 
                            fill 
                            className="object-cover"
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-orange-500 dark:text-orange-400 text-lg font-bold">
                            {ambassador.name?.substring(0, 2).toUpperCase() || "A"}
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-2 flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {ambassador.name}
                        </h3>
                        
                        <div className="flex items-center text-xs text-orange-600 dark:text-orange-500 mb-2">
                          <Award className="h-3.5 w-3.5 mr-1" />
                          <span>{ambassador.role || 'Community Ambassador'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                      {ambassador.bio || 'This ambassador is committed to promoting sustainable investments and creating a positive impact on the environment and society.'}
                    </p>
                  </div>
                  
                  <div className="flex border-t border-orange-100 dark:border-orange-900/20 bg-gradient-to-r from-orange-50/50 to-white dark:from-slate-900 dark:to-orange-950/10">
                    <div className="flex-1 px-5 py-3">
                      <div className="text-xs text-slate-500 dark:text-slate-500">Joined</div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">{ambassador.joined_date || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-slate-200 dark:border-slate-800/50 py-4">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-slate-500 dark:text-slate-500">Want to become an ambassador?</span>
            <MemoizedButton 
              variant="ghost" 
              size="sm"
              className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20"
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </MemoizedButton>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  )
} 
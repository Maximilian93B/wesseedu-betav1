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
      <Card className="bg-black/60 backdrop-blur-sm border-zinc-800/70 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-400" />
            Celebrity Ambassadors
          </CardTitle>
          <CardDescription className="text-zinc-400">
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
                <div className="rounded-xl overflow-hidden border border-amber-700/20 bg-gradient-to-b from-black to-amber-950/10 shadow-lg">
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
                      <div className="h-full w-full bg-gradient-to-br from-amber-900/20 to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>
                  
                  <div className="p-5 relative">
                    <div className="flex items-start gap-4">
                      <div className="relative -mt-12 border-4 border-amber-950 rounded-full overflow-hidden h-20 w-20 bg-amber-900/20 shadow-xl">
                        {ambassador.avatar_url ? (
                          <Image 
                            src={ambassador.avatar_url} 
                            alt={ambassador.name} 
                            fill 
                            className="object-cover"
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-amber-300 text-lg font-bold">
                            {ambassador.name?.substring(0, 2).toUpperCase() || "A"}
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-2 flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
                          {ambassador.name}
                        </h3>
                        
                        <div className="flex items-center text-xs text-amber-500/70 mb-2">
                          <Award className="h-3.5 w-3.5 mr-1" />
                          <span>{ambassador.role || 'Community Ambassador'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                      {ambassador.bio || 'This ambassador is committed to promoting sustainable investments and creating a positive impact on the environment and society.'}
                    </p>
                  </div>
                  
                  <div className="flex border-t border-amber-800/20 bg-gradient-to-r from-black to-amber-950/10">
                    <div className="flex-1 px-5 py-3">
                      <div className="text-xs text-zinc-500">Joined</div>
                      <div className="text-sm text-amber-300">{ambassador.joined_date || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-zinc-800/50 py-4">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-zinc-500">Want to become an ambassador?</span>
            <MemoizedButton 
              variant="ghost" 
              size="sm"
              className="text-amber-400 hover:text-amber-300 hover:bg-amber-950/20"
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
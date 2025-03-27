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
      <Card 
        className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
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
        
        <CardHeader className="relative z-10">
          <CardTitle className="text-xl text-slate-800 flex items-center">
            <Award className="h-5 w-5 mr-2 text-slate-600" />
            Celebrity Ambassadors
          </CardTitle>
          <CardDescription className="text-slate-600">
            Meet the influential figures supporting this community
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10">
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
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.05)] transition-all duration-300">
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
                      <div className="h-full w-full bg-gradient-to-br from-slate-100 to-white" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                  </div>
                  
                  <div className="p-5 relative">
                    <div className="flex items-start gap-4">
                      <div className="relative -mt-12 border-4 border-white rounded-full overflow-hidden h-20 w-20 bg-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                        {ambassador.avatar_url ? (
                          <Image 
                            src={ambassador.avatar_url} 
                            alt={ambassador.name} 
                            fill 
                            className="object-cover"
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-600 text-lg font-bold">
                            {ambassador.name?.substring(0, 2).toUpperCase() || "A"}
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-2 flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-600 transition-colors">
                          {ambassador.name}
                        </h3>
                        
                        <div className="flex items-center text-xs text-slate-600 mb-2">
                          <Award className="h-3.5 w-3.5 mr-1" />
                          <span>{ambassador.role || 'Community Ambassador'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {ambassador.bio || 'This ambassador is committed to promoting sustainable investments and creating a positive impact on the environment and society.'}
                    </p>
                  </div>
                  
                  <div className="flex border-t border-slate-200 bg-slate-50">
                    <div className="flex-1 px-5 py-3">
                      <div className="text-xs text-slate-500">Joined</div>
                      <div className="text-sm text-slate-700">{ambassador.joined_date || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-slate-200 py-4 relative z-10">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-slate-500">Want to become an ambassador?</span>
            <MemoizedButton 
              variant="ghost" 
              size="sm"
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:translate-y-[-2px]"
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
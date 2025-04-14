import { memo } from 'react'
import Image from 'next/image'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Ambassador } from '@/types/community'

// Memoized Button for better performance
const MemoizedButton = memo(Button);

interface AmbassadorsTabProps {
  ambassadors: Ambassador[]
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

export const AmbassadorsTab = ({ ambassadors }: AmbassadorsTabProps) => {
  return (
    <TabsContent value="ambassadors" className="mt-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card 
          className="relative overflow-hidden rounded-xl sm:rounded-2xl border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.1)] bg-white"
        >
          {/* Green accent bar */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>
          
          {/* Green background accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-50 via-transparent to-transparent opacity-70"></div>
          
          <CardHeader className="relative z-10">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#70f570] to-[#49c628] h-10 w-10 rounded-lg flex items-center justify-center mr-4 border-2 border-white shadow-md">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-green-800 font-display">
                  Celebrity Ambassadors
                </CardTitle>
                <CardDescription className="text-green-700 font-body">
                  Meet the influential figures supporting this community
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ambassadors.map((ambassador: Ambassador, index: number) => (
                <motion.div 
                  key={ambassador.id || index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden border border-green-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300">
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
                        <div className="h-full w-full bg-gradient-to-br from-green-50 to-white" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      
                      {/* Green accent corner */}
                      <div className="absolute top-0 right-0 w-24 h-24">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#70f570] to-[#49c628] transform rotate-45 translate-x-12 -translate-y-12"></div>
                      </div>
                    </div>
                    
                    <div className="p-5 relative">
                      <div className="flex items-start gap-4">
                        <div className="relative -mt-12 border-4 border-white rounded-full overflow-hidden h-20 w-20 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                          {ambassador.avatar_url ? (
                            <Image 
                              src={ambassador.avatar_url} 
                              alt={ambassador.name} 
                              fill 
                              className="object-cover"
                              loading={index < 2 ? "eager" : "lazy"}
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#70f570] to-[#49c628] text-white text-lg font-bold">
                              {ambassador.name?.substring(0, 2).toUpperCase() || "A"}
                            </div>
                          )}
                        </div>
                        
                        <div className="pt-2 flex-1">
                          <h3 className="text-lg font-semibold text-green-800 group-hover:text-green-700 transition-colors font-display">
                            {ambassador.name}
                          </h3>
                          
                          <div className="flex items-center text-xs text-green-700 mb-2">
                            <div className="bg-green-50 p-1 rounded-full mr-1.5">
                              <Award className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="font-helvetica">{ambassador.role || 'Community Ambassador'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-green-700 mt-3 leading-relaxed font-body">
                        {ambassador.bio || 'This ambassador is committed to promoting sustainable investments and creating a positive impact on the environment and society.'}
                      </p>
                    </div>
                    
                    <div className="flex border-t border-green-100 bg-green-50">
                      <div className="flex-1 px-5 py-3">
                        <div className="text-xs text-green-600 font-helvetica">Joined</div>
                        <div className="text-sm text-green-800 font-helvetica">{ambassador.joined_date || 'Unknown'}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-green-100 py-4 relative z-10">
            <div className="w-full flex justify-between items-center">
              <span className="text-xs text-green-700 font-body">Want to become an ambassador?</span>
              <MemoizedButton 
                className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:translate-y-[-2px] text-sm font-helvetica"
                size="sm"
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </MemoizedButton>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </TabsContent>
  )
} 
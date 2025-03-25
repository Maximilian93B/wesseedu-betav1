import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Award, Crown, ArrowRight, Users, TrendingUp, Shield, Quote } from 'lucide-react';
import { Ambassador } from '@/types/community';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AmbassadorShowcaseProps {
  ambassadors: Ambassador[];
  className?: string;
}

export function AmbassadorShowcase({ ambassadors, className }: AmbassadorShowcaseProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Auto-rotate featured ambassadors every 8 seconds
  useEffect(() => {
    if (ambassadors.length <= 1) return;
    
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % ambassadors.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [ambassadors.length]);

  // If no ambassadors provided, don't render anything
  if (!ambassadors || ambassadors.length === 0) {
    return null;
  }

  const featuredAmbassador = ambassadors[featuredIndex];

  return (
    <div className={cn("mb-24", className)}>
      <div className="relative">
        {/* Background gradient effects */}
        <div className="absolute -left-32 -top-10 w-64 h-64 rounded-full bg-orange-100/30 blur-[120px] z-0" />
        <div className="absolute right-10 bottom-0 w-80 h-80 rounded-full bg-orange-50/30 blur-[150px] z-0" />
        
        {/* Section heading with decorative elements */}
        <div className="flex items-center mb-10">
          <div className="flex items-center mr-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/70 flex items-center justify-center border border-orange-200 shadow-md">
              <Award className="h-7 w-7 text-orange-500" />
            </div>
            <div className="ml-4">
              <div className="text-xs uppercase tracking-widest text-orange-600 font-medium mb-1">
                MEET OUR ADVISORS
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Celebrity Ambassadors
              </h2>
            </div>
          </div>
          <div className="h-px flex-grow bg-gradient-to-r from-orange-300/50 via-slate-200 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-orange-500 ml-2"></div>
        </div>
        
        {/* Main showcase container */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/80 via-orange-400/20 to-transparent z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 relative">
            {/* Featured ambassador column */}
            <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-orange-50 to-white lg:min-h-[460px]">
              {featuredAmbassador.avatar_url && (
                <div 
                  className="absolute inset-0 bg-center bg-cover opacity-15"
                  style={{ backgroundImage: `url(${featuredAmbassador.avatar_url})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
              
              <motion.div 
                key={featuredAmbassador.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 p-10 lg:p-12 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200 shadow-sm mb-7">
                    <Crown className="h-3.5 w-3.5 text-orange-500" />
                    <span className="text-xs font-medium text-orange-600">Featured Ambassador</span>
                  </div>
                  
                  <div className="flex items-center gap-5 mb-7">
                    <Avatar className="h-20 w-20 rounded-full border-2 border-white ring-2 ring-orange-200 shadow-md">
                      {featuredAmbassador.avatar_url ? (
                        <AvatarImage src={featuredAmbassador.avatar_url} alt={featuredAmbassador.name} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-orange-100 to-white text-orange-600 text-lg font-medium">
                          {featuredAmbassador.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {featuredAmbassador.name}
                      </h3>
                      <p className="text-sm text-orange-600 flex items-center">
                        <Award className="h-3.5 w-3.5 mr-1.5" />
                        {featuredAmbassador.role || 'Community Ambassador'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-slate-600 text-sm leading-relaxed relative px-4 py-2">
                      <Quote className="absolute -left-2 -top-2 h-4 w-4 text-orange-300 transform -scale-x-100" />
                      {featuredAmbassador.bio || 
                        'Committed to driving sustainable investments and creating positive impact through innovative community leadership in financial markets.'}
                      <Quote className="absolute -right-2 bottom-0 h-4 w-4 text-orange-300" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm px-5 py-6"
                    asChild
                  >
                    <Link href={`/ambassadors/${featuredAmbassador.id}`}>
                      <span>View Profile</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Ambassador grid */}
            <div className="lg:col-span-3 bg-slate-50 p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-slate-800 font-medium flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2.5 text-orange-500" />
                  <span>Our Network</span>
                </h4>
                
                <div className="flex gap-3">
                  {ambassadors.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFeaturedIndex(idx)}
                      className={cn(
                        "h-1.5 rounded-full",
                        idx === featuredIndex 
                          ? "w-8 bg-orange-500" 
                          : "w-3 bg-slate-300 hover:bg-slate-400"
                      )}
                      aria-label={`View ambassador ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ambassadors.map((ambassador, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={ambassador.id}
                    className={cn(
                      "p-5 rounded-xl border border-slate-200 bg-white shadow-sm",
                      index === featuredIndex && "ring-1 ring-orange-300"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                        {ambassador.avatar_url ? (
                          <AvatarImage src={ambassador.avatar_url} alt={ambassador.name} />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-orange-50 to-white text-orange-600 text-xs">
                            {ambassador.name?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div>
                        <h5 className="text-slate-800 font-medium text-sm">
                          {ambassador.name}
                        </h5>
                        <p className="text-slate-500 text-xs mt-1">
                          {ambassador.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <div className="flex items-center text-slate-600 text-sm">
                    <Shield className="h-4 w-4 mr-2 text-orange-500" />
                    <span>{ambassadors.length} ambassadors</span>
                  </div>
                  
                  <div className="flex items-center text-slate-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Industry leaders</span>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-4 py-2.5"
                  asChild
                >
                  <Link href="/ambassadors">
                    <span>View All</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
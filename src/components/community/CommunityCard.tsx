import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface CommunityCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  memberCount: number;
  postCount: number;
  ambassadorCount: number;
  ambassadors?: {
    id: string;
    name: string;
    image?: string;
  }[];
  tags?: string[];
  variant?: 'default' | 'featured';
}

export function CommunityCard({
  id,
  name,
  slug,
  description,
  image,
  memberCount,
  postCount,
  ambassadorCount,
  ambassadors = [],
  tags = [],
  variant = 'default',
}: CommunityCardProps) {
  const isFeatured = variant === 'featured';
  
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  return (
    <motion.div 
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "relative h-full overflow-hidden rounded-xl sm:rounded-2xl border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.15)] transition-all duration-500 bg-white",
        isFeatured && "ring-2 ring-green-400 shadow-[0_10px_30px_rgb(0,0,0,0.15)]"
      )}
      >
        {/* Green accent bar */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>
        
        {/* Green background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-50 via-transparent to-transparent opacity-70"></div>
        
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-0 right-0 z-20">
            <div className="font-medium text-xs tracking-wider text-white bg-gradient-to-r from-[#70f570] to-[#49c628] py-1 px-4 rounded-bl-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)] font-helvetica">
              FEATURED
            </div>
          </div>
        )}
        
        <div className="relative z-10 p-6">
          {/* Header section */}
          <div className="flex flex-col space-y-3">
            {/* Community name */}
            <h3 className="text-xl font-medium leading-tight tracking-tight text-green-800 font-display">
              {name}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-green-700 line-clamp-2 mb-2 font-body">
              {description || 'No description available'}
            </p>
          </div>
          
          {/* Stats row with Green-White design */}
          <div className="flex items-center gap-5 mt-4 mb-5 bg-green-50 rounded-lg p-2 border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center text-green-700">
              <div className="bg-white p-1.5 rounded-md mr-2 shadow-sm border border-green-100">
                <Users className="h-3.5 w-3.5 text-green-600" />
              </div>
              <span className="text-xs font-medium font-helvetica">{formatNumber(memberCount)}</span>
            </div>
            <div className="flex items-center text-green-700">
              <div className="bg-white p-1.5 rounded-md mr-2 shadow-sm border border-green-100">
                <MessageSquare className="h-3.5 w-3.5 text-green-600" />
              </div>
              <span className="text-xs font-medium font-helvetica">{formatNumber(postCount)}</span>
            </div>
            <div className="ml-auto">
              <ExternalLink className="h-4 w-4 text-green-500" />
            </div>
          </div>
          
          {/* Tags with Green-White design */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.slice(0, 3).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-white border-green-100 text-green-700 rounded-md font-medium shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-white border-green-100 text-green-700 rounded-md font-medium shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Ambassadors section with Green-White design */}
          {ambassadors && ambassadors.length > 0 && (
            <div className="mt-6 bg-green-50 rounded-lg p-3 border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-green-800 font-helvetica">Network Advisors</span>
                {ambassadorCount > ambassadors.length && (
                  <span className="text-xs text-green-600 font-helvetica">+{ambassadorCount - ambassadors.length} more</span>
                )}
              </div>
              <div className="flex -space-x-2">
                {ambassadors.slice(0, 5).map((ambassador) => (
                  <Avatar 
                    key={ambassador.id}
                    className="h-8 w-8 border-2 border-white ring-1 ring-green-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                  >
                    {ambassador.image ? (
                      <AvatarImage src={ambassador.image} alt={ambassador.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-[#70f570] to-[#49c628] text-white text-xs font-medium">
                        {ambassador.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
} 
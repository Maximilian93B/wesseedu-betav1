import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="h-full">
      <Card className={cn(
        "relative h-full overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-all duration-500",
        isFeatured && "ring-1 ring-slate-400/50 shadow-[0_10px_30px_rgb(0,0,0,0.06)]"
      )}
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
        
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-0 right-0 z-20">
            <div className="font-medium text-xs tracking-wider text-white bg-slate-800 py-1 px-4 rounded-bl-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              FEATURED
            </div>
          </div>
        )}
        
        {/* Top edge shadow line for definition */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
        
        {/* Inner shadow effects for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
        
        <div className="relative z-10 p-6">
          {/* Header section */}
          <div className="flex flex-col space-y-3">
            {/* Community name */}
            <h3 className="text-xl font-medium leading-tight tracking-tight text-slate-800">
              {name}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-slate-600 line-clamp-2 mb-2">
              {description || 'No description available'}
            </p>
          </div>
          
          {/* Stats row with updated design */}
          <div className="flex items-center gap-5 mt-4 mb-5 bg-white/70 rounded-lg p-2 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center text-slate-600">
              <div className="bg-white p-1.5 rounded-md mr-2 shadow-sm border border-slate-200">
                <Users className="h-3.5 w-3.5 text-slate-600" />
              </div>
              <span className="text-xs font-medium">{formatNumber(memberCount)}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <div className="bg-white p-1.5 rounded-md mr-2 shadow-sm border border-slate-200">
                <MessageSquare className="h-3.5 w-3.5 text-slate-600" />
              </div>
              <span className="text-xs font-medium">{formatNumber(postCount)}</span>
            </div>
            <div className="ml-auto">
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </div>
          </div>
          
          {/* Tags with improved design */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.slice(0, 3).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-white border-slate-200 text-slate-600 rounded-md font-medium shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-white border-slate-200 text-slate-600 rounded-md font-medium shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Ambassadors section with improved design */}
          {ambassadors && ambassadors.length > 0 && (
            <div className="mt-6 bg-white/80 rounded-lg p-3 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-slate-700">Network Advisors</span>
                {ambassadorCount > ambassadors.length && (
                  <span className="text-xs text-slate-400">+{ambassadorCount - ambassadors.length} more</span>
                )}
              </div>
              <div className="flex -space-x-2">
                {ambassadors.slice(0, 5).map((ambassador) => (
                  <Avatar 
                    key={ambassador.id}
                    className="h-8 w-8 border-2 border-white ring-1 ring-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                  >
                    {ambassador.image ? (
                      <AvatarImage src={ambassador.image} alt={ambassador.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-slate-100 to-white text-slate-600 text-xs font-medium">
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
    </div>
  );
} 
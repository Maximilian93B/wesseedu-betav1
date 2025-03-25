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
        "h-full overflow-hidden border border-zinc-800/50 bg-gradient-to-b from-zinc-900/90 via-zinc-900/95 to-black",
        "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] backdrop-blur-sm",
        isFeatured && "ring-1 ring-indigo-500/40 shadow-[0_10px_50px_-12px_rgba(79,70,229,0.15)]"
      )}>
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-0 right-0 z-20">
            <div className="font-medium text-xs tracking-wider text-white bg-gradient-to-r from-indigo-600 to-indigo-700 py-1 px-4 rounded-bl-lg shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              FEATURED
            </div>
          </div>
        )}
        
        {/* Accent decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/80 via-indigo-500/20 to-transparent" />
        <div className="absolute top-1 right-0 w-[40%] h-px bg-gradient-to-l from-zinc-400/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[70%] h-px bg-gradient-to-r from-zinc-800/50 via-zinc-700/20 to-transparent" />
        
        <div className="relative z-10 p-6">
          {/* Header section */}
          <div className="flex flex-col space-y-3">
            {/* Community name */}
            <h3 className="text-xl font-medium leading-tight tracking-tight text-white drop-shadow-sm">
              {name}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-zinc-400 line-clamp-2 mb-2">
              {description || 'No description available'}
            </p>
          </div>
          
          {/* Stats row with updated design */}
          <div className="flex items-center gap-5 mt-4 mb-5 bg-gradient-to-r from-black/40 to-black/30 rounded-lg p-2 border border-zinc-800/20 shadow-inner">
            <div className="flex items-center text-zinc-400">
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 p-1.5 rounded-md mr-2 shadow-sm">
                <Users className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-medium">{formatNumber(memberCount)}</span>
            </div>
            <div className="flex items-center text-zinc-400">
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 p-1.5 rounded-md mr-2 shadow-sm">
                <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-medium">{formatNumber(postCount)}</span>
            </div>
            <div className="ml-auto">
              <ExternalLink className="h-4 w-4 text-zinc-600 drop-shadow-sm" />
            </div>
          </div>
          
          {/* Tags with improved design */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.slice(0, 3).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-black/40 border-zinc-800/60 text-zinc-400 rounded-md font-medium shadow-sm"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-black/40 border-zinc-800/60 text-zinc-400 rounded-md font-medium shadow-sm"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Ambassadors section with improved design */}
          {ambassadors && ambassadors.length > 0 && (
            <div className="mt-6 bg-gradient-to-br from-black/30 to-zinc-900/20 rounded-lg p-3 border border-zinc-800/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-indigo-300 drop-shadow-sm">Network Advisors</span>
                {ambassadorCount > ambassadors.length && (
                  <span className="text-xs text-zinc-600">+{ambassadorCount - ambassadors.length} more</span>
                )}
              </div>
              <div className="flex -space-x-2">
                {ambassadors.slice(0, 5).map((ambassador) => (
                  <Avatar 
                    key={ambassador.id}
                    className="h-8 w-8 border-2 border-black/70 ring-1 ring-indigo-500/30 shadow-md"
                  >
                    {ambassador.image ? (
                      <AvatarImage src={ambassador.image} alt={ambassador.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/30 text-indigo-300 text-xs font-medium">
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
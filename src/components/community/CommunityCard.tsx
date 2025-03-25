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
        "h-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950",
        "shadow-md backdrop-blur-sm",
        isFeatured && "ring-1 ring-orange-400 dark:ring-orange-500/50 shadow-[0_10px_50px_-12px_rgba(249,115,22,0.15)] dark:shadow-[0_10px_50px_-12px_rgba(249,115,22,0.1)]"
      )}>
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-0 right-0 z-20">
            <div className="font-medium text-xs tracking-wider text-white bg-gradient-to-r from-orange-500 to-orange-600 py-1 px-4 rounded-bl-lg shadow-sm">
              FEATURED
            </div>
          </div>
        )}
        
        {/* Accent decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/80 via-orange-400/20 to-transparent" />
        <div className="absolute top-1 right-0 w-[40%] h-px bg-gradient-to-l from-slate-300/30 dark:from-slate-700/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[70%] h-px bg-gradient-to-r from-slate-200/70 dark:from-slate-800/70 via-slate-200/40 dark:via-slate-800/40 to-transparent" />
        
        <div className="relative z-10 p-6">
          {/* Header section */}
          <div className="flex flex-col space-y-3">
            {/* Community name */}
            <h3 className="text-xl font-medium leading-tight tracking-tight text-slate-800 dark:text-slate-200">
              {name}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
              {description || 'No description available'}
            </p>
          </div>
          
          {/* Stats row with updated design */}
          <div className="flex items-center gap-5 mt-4 mb-5 bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-950/40 dark:to-orange-900/20 rounded-lg p-2 border border-orange-100 dark:border-orange-900/50 shadow-sm">
            <div className="flex items-center text-slate-600 dark:text-slate-300">
              <div className="bg-white dark:bg-slate-800 p-1.5 rounded-md mr-2 shadow-sm border border-orange-100 dark:border-orange-900/50">
                <Users className="h-3.5 w-3.5 text-orange-500" />
              </div>
              <span className="text-xs font-medium">{formatNumber(memberCount)}</span>
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-300">
              <div className="bg-white dark:bg-slate-800 p-1.5 rounded-md mr-2 shadow-sm border border-orange-100 dark:border-orange-900/50">
                <MessageSquare className="h-3.5 w-3.5 text-orange-500" />
              </div>
              <span className="text-xs font-medium">{formatNumber(postCount)}</span>
            </div>
            <div className="ml-auto">
              <ExternalLink className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
          
          {/* Tags with improved design */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.slice(0, 3).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-md font-medium shadow-sm"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="px-2.5 py-1 text-[0.65rem] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-md font-medium shadow-sm"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Ambassadors section with improved design */}
          {ambassadors && ambassadors.length > 0 && (
            <div className="mt-6 bg-gradient-to-br from-orange-50 to-orange-50/50 dark:from-orange-950/40 dark:to-orange-900/20 rounded-lg p-3 border border-orange-100 dark:border-orange-900/50 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-orange-600 dark:text-orange-500">Network Advisors</span>
                {ambassadorCount > ambassadors.length && (
                  <span className="text-xs text-slate-400 dark:text-slate-500">+{ambassadorCount - ambassadors.length} more</span>
                )}
              </div>
              <div className="flex -space-x-2">
                {ambassadors.slice(0, 5).map((ambassador) => (
                  <Avatar 
                    key={ambassador.id}
                    className="h-8 w-8 border-2 border-white dark:border-slate-800 ring-1 ring-orange-300 dark:ring-orange-700 shadow-sm"
                  >
                    {ambassador.image ? (
                      <AvatarImage src={ambassador.image} alt={ambassador.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-orange-100 to-white dark:from-orange-900/50 dark:to-slate-800 text-orange-600 dark:text-orange-400 text-xs font-medium">
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
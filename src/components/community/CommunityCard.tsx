import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Share2, MessageCircle, Award, ArrowRight } from 'lucide-react';

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

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24,
      duration: 0.4 
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  }
};

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
  // Limit description to 120 characters
  const truncatedDescription = description.length > 120
    ? description.substring(0, 120) + '...'
    : description;

  const isFeatured = variant === 'featured';
  
  // Display at most 3 ambassadors
  const displayAmbassadors = ambassadors.slice(0, 3);
  const hasMoreAmbassadors = ambassadors.length > 3;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <Card className="h-full overflow-hidden border border-green-700/30 bg-black rounded-xl shadow-lg hover:border-green-600/50 transition-all duration-300 relative z-10">
        <div className="aspect-video w-full relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <Users className="h-16 w-16 text-green-600/80" />
            </div>
          )}
          
          {isFeatured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-green-600 text-white font-medium border-none px-3 py-1 rounded-md">
                Featured Opportunity
              </Badge>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-black/80 text-green-400 font-medium border border-green-600/40 px-3 py-1 rounded-md">
              Sustainable Investment
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{name}</h3>
              <p className="text-sm text-zinc-400 mt-2">{truncatedDescription}</p>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-black border-green-700/30 text-green-400 hover:bg-green-950/30 text-xs px-3 py-1 rounded-md"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center text-green-400 text-xs">
                <Users className="h-4 w-4 mr-2" />
                <span>{memberCount} investors</span>
              </div>
              
              <div className="flex items-center text-green-400 text-xs">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>{postCount} updates</span>
              </div>
              
              <div className="flex items-center text-green-400 text-xs">
                <Award className="h-4 w-4 mr-2" />
                <span>{ambassadorCount} partners</span>
              </div>
            </div>

            {ambassadors.length > 0 && (
              <div className="mt-4">
                <div className="text-xs text-green-600 mb-2 font-medium">Key Stakeholders</div>
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-2">
                    {displayAmbassadors.map((ambassador, index) => (
                      <Avatar key={ambassador.id} className={`border-2 ${isFeatured ? 'border-green-900/60' : 'border-zinc-900'} h-8 w-8 ring-0`}>
                        <AvatarImage 
                          src={ambassador.image} 
                          alt={ambassador.name} 
                        />
                        <AvatarFallback className={`text-xs bg-gradient-to-br ${
                          isFeatured 
                            ? 'from-green-900/60 to-green-950/80 text-green-200' 
                            : 'from-zinc-800 to-zinc-900 text-zinc-300'
                        }`}>
                          {ambassador.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    
                    {hasMoreAmbassadors && (
                      <Avatar className={`border-2 ${isFeatured ? 'border-green-900/60' : 'border-zinc-900'} h-8 w-8 ring-0`}>
                        <AvatarFallback className={`text-xs ${
                          isFeatured 
                            ? 'bg-green-900/60 text-green-200' 
                            : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          +{ambassadors.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 border-t border-green-900/20 bg-black/50">
          <div className="flex justify-between items-center w-full">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-green-400 hover:text-white hover:bg-green-600 transition-colors duration-200 px-4 py-2 rounded-md"
            >
              <Link href={`/communities/${slug}`}>
                View Investment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-green-400 hover:text-white hover:bg-green-600/20 rounded-full p-2 h-9 w-9"
              aria-label="Share investment opportunity"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 
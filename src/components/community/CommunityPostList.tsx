import { useState } from 'react'
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth'
import { useToast } from '@/hooks/use-toast'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Award, 
  Clock, 
  Image as ImageIcon,
  Send,
  Plus,
  ThumbsUp
} from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import React from "react"

interface Post {
  id: string
  title?: string
  content: string
  is_company_update?: boolean
  created_at: string
  updated_at?: string
  profiles?: {
    id: string
    name: string
  }
  likes: number
  comments: number
  author: {
    id: string
    name: string
    avatar_url?: string
    role?: string
    isAmbassador?: boolean
  }
  media?: {
    type: 'image' | 'video'
    url: string
  }[]
}

interface CommentType {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar_url?: string
  }
  created_at: string
}

interface CommunityPostListProps {
  communityId: string
  filter?: string
  posts?: Post[]
  isLoading?: boolean
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

export function CommunityPostList({ communityId, filter = '', posts = [], isLoading = false }: CommunityPostListProps) {
  const [newPostContent, setNewPostContent] = useState('')
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const { toast } = useToast()
  
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return
    
    // Here you would typically call an API to create the post
    console.log('Creating post:', { communityId, content: newPostContent })
    
    // Clear the input after posting
    setNewPostContent('')
  }
  
  const handleToggleComments = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId)
  }
  
  const handleLikePost = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    )
    
    // Here you would typically call an API to like/unlike the post
    console.log('Toggling like on post:', postId)
  }
  
  const formatTimestamp = (timestamp: string): string => {
    const now = new Date()
    const postDate = new Date(timestamp)
    const diffTime = Math.abs(now.getTime() - postDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60))
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    } else {
      return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }
  
  // Sample comments for demo purposes
  const getCommentsForPost = (postId: string): CommentType[] => {
    // In a real app, you would fetch these from an API
    return [
      {
        id: `comment-1-${postId}`,
        content: "This is very insightful! I'm looking forward to seeing how this initiative develops.",
        author: {
          id: 'user-1',
          name: 'Alex Johnson',
          avatar_url: undefined
        },
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
      },
      {
        id: `comment-2-${postId}`,
        content: "Great point! How can we get more involved with this project?",
        author: {
          id: 'user-2',
          name: 'Morgan Smith',
          avatar_url: undefined
        },
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
      }
    ]
  }
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full bg-zinc-900/40 rounded-xl" />
        <Skeleton className="h-64 w-full bg-zinc-900/40 rounded-xl" />
        <Skeleton className="h-48 w-full bg-zinc-900/40 rounded-xl" />
      </div>
    )
  }
  
  const samplePosts: Post[] = [
    {
      id: 'post-1',
      title: 'New Partnership Announcement',
      content: "We're excited to announce our new partnership with GreenTech Solutions to accelerate investment in sustainable technologies. This collaboration will allow us to fund innovative projects that address climate change and promote environmental sustainability.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      is_company_update: true,
      profiles: {
        id: 'profile-1',
        name: 'Company Account'
      },
      likes: 24,
      comments: 5,
      author: {
        id: 'ambassador-1',
        name: 'Emma Richards',
        avatar_url: undefined,
        role: 'Sustainability Ambassador',
        isAmbassador: true
      },
      media: [
        {
          type: 'image',
          url: '/sample-sustainability.jpg'
        }
      ]
    },
    {
      id: 'post-2',
      title: 'Global Summit Highlights',
      content: "Just attended the Global Sustainability Summit where we discussed how impact investing can drive positive change. Our community members' investments are already making a difference, with a 15% reduction in carbon emissions across our portfolio companies this quarter.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      is_company_update: false,
      profiles: {
        id: 'profile-2',
        name: 'Community Manager'
      },
      likes: 42,
      comments: 8,
      author: {
        id: 'user-1',
        name: 'Michael Chang',
        avatar_url: undefined,
        role: 'Community Manager'
      }
    }
  ]
  
  const displayPosts = posts.length > 0 ? posts : samplePosts
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Create Post Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-black/60 backdrop-blur-sm border-zinc-800/70 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="pt-6 pb-4 px-5">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 bg-zinc-800 border border-zinc-700">
                <AvatarFallback className="text-zinc-300 bg-gradient-to-br from-zinc-800 to-zinc-900">
                  ME
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <textarea
                  placeholder="Share an update with the community..." 
                  value={newPostContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPostContent(e.target.value)}
                  className="flex min-h-20 w-full rounded-md resize-none border border-zinc-800/50 bg-zinc-900/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-700"
                />
                
                <div className="flex justify-between mt-3">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-black/40 border-zinc-800/70 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/40"
                    >
                      <ImageIcon className="h-4 w-4 mr-1" />
                      <span className="text-xs">Media</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-black/40 border-zinc-800/70 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/40"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="text-xs">More</span>
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="bg-blue-600 hover:bg-blue-500 text-white disabled:bg-blue-900/30 disabled:text-zinc-400"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Post List */}
      <AnimatePresence>
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => (
            <motion.div 
              key={post.id}
              variants={itemVariants}
              layout
              className="w-full"
            >
              <Card className="bg-black/60 backdrop-blur-sm border-zinc-800/70 shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="px-5 py-4 border-b border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-zinc-700">
                      <AvatarImage src={post.author.avatar_url} />
                      <AvatarFallback className={`text-sm ${
                        post.author.isAmbassador 
                          ? 'bg-gradient-to-br from-amber-900/70 to-amber-950 text-amber-300' 
                          : 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300'
                      }`}>
                        {post.author.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{post.author.name}</span>
                        {post.author.isAmbassador && (
                          <div className="bg-amber-900/30 border border-amber-700/40 text-amber-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            Ambassador
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center text-xs text-zinc-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTimestamp(post.created_at)}</span>
                        {post.author.role && (
                          <>
                            <span className="mx-1.5">•</span>
                            <span>{post.author.role}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-5 py-4">
                  {post.title && (
                    <h3 className="text-lg font-medium text-white mb-2">{post.title}</h3>
                  )}
                  <p className="text-zinc-300 mb-4 whitespace-pre-line">{post.content}</p>
                  
                  {post.media && post.media.length > 0 && (
                    <div className="mt-3 mb-4 rounded-lg overflow-hidden border border-zinc-800/70 bg-zinc-900/30">
                      {/* This would be replaced with proper image rendering with next/image */}
                      <div className="aspect-video w-full bg-zinc-900 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-zinc-700" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-zinc-500 mt-2">
                    <div className="flex items-center">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1 text-blue-400 fill-blue-400" />
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes</span>
                    </div>
                    <span className="mx-1.5">•</span>
                    <div className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1 text-zinc-400" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="px-5 py-3 border-t border-zinc-800/50 flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex-1 ${
                      likedPosts.includes(post.id)
                        ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-950/20'
                        : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/40'
                    }`}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <Heart className={`h-4 w-4 mr-1.5 ${likedPosts.includes(post.id) ? 'fill-blue-400' : ''}`} />
                    Like
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/40"
                    onClick={() => handleToggleComments(post.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    Comment
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/40"
                  >
                    <Share2 className="h-4 w-4 mr-1.5" />
                    Share
                  </Button>
                </CardFooter>
                
                {/* Comments Section (Only visible when expanded) */}
                {expandedPostId === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-zinc-800/50 bg-gradient-to-b from-black/40 to-zinc-950/20"
                  >
                    <div className="p-4 space-y-4">
                      {getCommentsForPost(post.id).map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 border border-zinc-800">
                            <AvatarImage src={comment.author.avatar_url} />
                            <AvatarFallback className="text-xs bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300">
                              {comment.author.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="bg-zinc-900/60 rounded-lg p-3 mb-1">
                              <div className="font-medium text-white text-sm">{comment.author.name}</div>
                              <p className="text-sm text-zinc-400">{comment.content}</p>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-zinc-500 pl-2">
                              <button className="hover:text-zinc-300">Like</button>
                              <button className="hover:text-zinc-300">Reply</button>
                              <span>{formatTimestamp(comment.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Comment Input */}
                      <div className="flex gap-3 mt-4">
                        <Avatar className="h-8 w-8 border border-zinc-800">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300">
                            ME
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 relative">
                          <textarea
                            placeholder="Write a comment..." 
                            className="flex min-h-[40px] w-full rounded-md resize-none border border-zinc-800/50 bg-zinc-900/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-700"
                          />
          <Button 
                            size="sm" 
                            className="absolute right-2 bottom-2 h-6 w-6 p-0 rounded-full bg-blue-600 hover:bg-blue-500"
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="bg-black/60 backdrop-blur-sm border border-zinc-800/50 p-8 rounded-xl max-w-md">
              <MessageSquare className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Posts Yet</h3>
              <p className="text-zinc-400 mb-6">Be the first to share updates, news or questions with the community.</p>
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create First Post
          </Button>
        </div>
          </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  )
} 
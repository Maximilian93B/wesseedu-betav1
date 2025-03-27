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
        <Skeleton className="h-32 w-full bg-slate-100/60 rounded-2xl" />
        <Skeleton className="h-64 w-full bg-slate-100/60 rounded-2xl" />
        <Skeleton className="h-48 w-full bg-slate-100/60 rounded-2xl" />
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
          
          <CardContent className="pt-6 pb-4 px-5 relative z-10">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 bg-slate-50 border border-slate-200">
                <AvatarFallback className="text-slate-600 bg-gradient-to-br from-slate-50 to-slate-100">
                  ME
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <textarea
                  placeholder="Share an update with the community..." 
                  value={newPostContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPostContent(e.target.value)}
                  className="flex min-h-20 w-full rounded-md resize-none border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
                />
                
                <div className="flex justify-between mt-3">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                    >
                      <ImageIcon className="h-4 w-4 mr-1" />
                      <span className="text-xs">Media</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span className="text-xs">More</span>
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="bg-slate-900 hover:bg-slate-800 text-white disabled:bg-slate-200 disabled:text-slate-400 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:translate-y-[-2px]"
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
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
                
                <CardHeader className="px-5 py-4 border-b border-slate-200/80 relative z-10">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200">
                      <AvatarImage src={post.author.avatar_url} />
                      <AvatarFallback className={`text-sm bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700`}>
                        {post.author.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">{post.author.name}</span>
                        {post.author.isAmbassador && (
                          <div className="bg-slate-100 border border-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            Ambassador
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center text-xs text-slate-500">
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
                
                <CardContent className="px-5 py-4 relative z-10">
                  {post.title && (
                    <h3 className="text-lg font-medium text-slate-800 mb-2">{post.title}</h3>
                  )}
                  <p className="text-slate-600 mb-4 whitespace-pre-line">{post.content}</p>
                  
                  {post.media && post.media.length > 0 && (
                    <div className="mt-3 mb-4 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      {/* This would be replaced with proper image rendering with next/image */}
                      <div className="aspect-video w-full bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-slate-400" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-slate-500 mt-2">
                    <div className="flex items-center">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1 text-slate-600 fill-slate-600" />
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes</span>
                    </div>
                    <span className="mx-1.5">•</span>
                    <div className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="px-5 py-3 border-t border-slate-200/80 flex gap-2 relative z-10">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex-1 ${
                      likedPosts.includes(post.id)
                        ? 'text-slate-800 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <Heart className={`h-4 w-4 mr-1.5 ${likedPosts.includes(post.id) ? 'fill-slate-800' : ''}`} />
                    Like
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    onClick={() => handleToggleComments(post.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    Comment
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
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
                    className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50 to-white relative z-10"
                  >
                    <div className="p-4 space-y-4">
                      {getCommentsForPost(post.id).map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 border border-slate-200">
                            <AvatarImage src={comment.author.avatar_url} />
                            <AvatarFallback className="text-xs bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600">
                              {comment.author.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="bg-slate-50 rounded-lg p-3 mb-1">
                              <div className="font-medium text-slate-800 text-sm">{comment.author.name}</div>
                              <p className="text-sm text-slate-600">{comment.content}</p>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-slate-500 pl-2">
                              <button className="hover:text-slate-700">Like</button>
                              <button className="hover:text-slate-700">Reply</button>
                              <span>{formatTimestamp(comment.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Comment Input */}
                      <div className="flex gap-3 mt-4">
                        <Avatar className="h-8 w-8 border border-slate-200">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600">
                            ME
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 relative">
                          <textarea
                            placeholder="Write a comment..." 
                            className="flex min-h-[40px] w-full rounded-md resize-none border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
                          />
                          <Button 
                            size="sm" 
                            className="absolute right-2 bottom-2 h-6 w-6 p-0 rounded-full bg-slate-900 hover:bg-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
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
            <div 
              className="relative overflow-hidden rounded-2xl border border-slate-200 p-8 max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
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
              
              <div className="relative z-10">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-800 mb-2">No Posts Yet</h3>
                <p className="text-slate-500 mb-6">Be the first to share updates, news or questions with the community.</p>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:translate-y-[-2px]">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Post
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 
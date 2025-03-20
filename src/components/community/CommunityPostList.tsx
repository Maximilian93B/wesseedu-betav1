import { useState, useEffect } from 'react'
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth'
import { useToast } from '@/hooks/use-toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Megaphone, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface Post {
  id: string
  title: string
  content: string
  is_company_update: boolean
  created_at: string
  updated_at: string
  profiles: {
    id: string
    name: string
  }
}

interface PostListResponse {
  posts: Post[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

interface CommunityPostListProps {
  communityId: string
  filter: string
}

export default function CommunityPostList({ communityId, filter }: CommunityPostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })
  const { toast } = useToast()
  
  useEffect(() => {
    fetchPosts(1)
  }, [communityId, filter])
  
  const fetchPosts = async (page: number) => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      })
      
      if (filter) {
        queryParams.append('filter', filter)
      }
      
      const response = await fetchWithAuth(
        `/api/communities/${communityId}/posts?${queryParams.toString()}`
      )
      
      if (response.error || response.status >= 400) {
        throw new Error('Failed to fetch community posts')
      }
      
      const data: PostListResponse = response.data
      
      if (page === 1) {
        setPosts(data.posts)
      } else {
        setPosts(prevPosts => [...prevPosts, ...data.posts])
      }
      
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching community posts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load posts. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }
  
  const loadMorePosts = () => {
    if (pagination.page < pagination.totalPages) {
      fetchPosts(pagination.page + 1)
    }
  }

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No posts found in this community.</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span className="font-medium">By {post.profiles.name}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>
              
              {post.is_company_update && (
                <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">
                  <Megaphone className="h-3 w-3 mr-1" />
                  Company Update
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground whitespace-pre-line">
              {post.content}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
      
      {pagination.page < pagination.totalPages && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={loadMorePosts}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            ) : null}
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  )
} 
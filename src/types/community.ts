export interface Ambassador {
  id: string
  name: string
  bio: string
  avatar_url?: string | null
  role: string
  joined_date: string
}

export interface Community {
  id: string
  description: string | null
  created_at: string
  isMember?: boolean
  hasAmbassadors?: boolean
  ambassadorCount?: number
  featuredAmbassador?: {
    name: string
    avatar_url?: string | null
  }
  companies: {
    id: string
    name: string
    description: string | null
    mission_statement: string | null
    score: number
    image_url: string | null
  }
  ambassadors?: Ambassador[]
}

export interface CommunityCardProps {
  community: Community
  onSelect: (id: string) => void
} 
// Export all types from their respective files
import { Ambassador as CommunityAmbassador, Community } from './community';

export interface CommunityWithTags extends Community {
  name: string;
  slug: string;
  tags?: string[];
  memberCount: number;
  postCount: number;
  image?: string | null;
}

// Create a simplified Ambassador interface for UI components
export interface Ambassador {
  id: string;
  name: string;
  avatar_url?: string;
}

export type { CommunityAmbassador, Community }; 
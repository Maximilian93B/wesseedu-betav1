import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import authConfig from '@/config/auth.config'

export const dynamic = 'force-dynamic'

// Counter to track the number of requests within a time window
let requestCounter = {
  count: 0,
  lastReset: Date.now(),
  threshold: 10, // Maximum requests in window before throttling
  resetInterval: 10000, // 10 seconds
  isThrottled: false,
  throttleDuration: 60000, // 1 minute throttle
  throttleStart: 0
};

// Define interfaces to help with type checking
interface Company {
  id: string
  name: string
  description: string | null
  mission_statement: string | null
  score: number
  image_url: string | null
}

interface CommunityBase {
  id: string
  description: string | null
  created_at: string
  company_id: string
}

interface CommunityWithCompany extends CommunityBase {
  companies: Company
}

export async function GET(request: Request) {
  try {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';
    console.log('Communities API: Environment mode:', isDevelopment ? 'development' : 'production');
    
    // Check for request throttling
    const now = Date.now();
    
    // If we're in a throttled state
    if (requestCounter.isThrottled) {
      const throttleTimeRemaining = requestCounter.throttleStart + requestCounter.throttleDuration - now;
      if (throttleTimeRemaining > 0) {
        // Still in throttle period
        console.log(`API throttled. Try again in ${Math.round(throttleTimeRemaining / 1000)}s`);
        return NextResponse.json(
          { error: 'Too many requests', status: 429 },
          { status: 429 }
        );
      } else {
        // Throttle period ended
        console.log('Throttle period ended, resetting counters');
        requestCounter.isThrottled = false;
        requestCounter.count = 0;
        requestCounter.lastReset = now;
      }
    }
    
    // Check if we need to reset the counter based on time window
    if (now - requestCounter.lastReset > requestCounter.resetInterval) {
      requestCounter.count = 0;
      requestCounter.lastReset = now;
    }
    
    // Increment request counter
    requestCounter.count++;
    console.log(`Request count: ${requestCounter.count}/${requestCounter.threshold}`);
    
    // If over threshold, enable throttling
    if (requestCounter.count > requestCounter.threshold) {
      console.log(`Request threshold exceeded (${requestCounter.count}). Throttling for ${requestCounter.throttleDuration / 1000}s`);
      requestCounter.isThrottled = true;
      requestCounter.throttleStart = now;
      return NextResponse.json(
        { error: 'Too many requests', status: 429 },
        { status: 429 }
      );
    }
    
    console.log('------ COMMUNITIES API ------');
    console.log('Starting API request for communities');
    
    // Check authentication
    const auth = await checkAuth();
    
    // In development, allow fallback to mock data if authentication fails
    if (auth.error && isDevelopment) {
      console.log('Development mode: Proceeding without authentication for communities endpoint');
      
      // Create a non-authenticated client for development
      const supabase = createRouteHandlerClient({ cookies });
      
      // Return mock communities data for development
      return NextResponse.json({
        data: [
          {
            id: 'dev-community-1',
            description: 'A community of investors focused on renewable energy technologies',
            created_at: new Date().toISOString(),
            company_id: 'dev-company-1',
            companies: {
              id: 'dev-company-1',
              name: 'EcoTech Solutions',
              description: 'Developing sustainable technology solutions',
              mission_statement: 'Creating a greener future through innovation',
              score: 85,
              image_url: 'https://placehold.co/100'
            },
            isMember: true,
            ambassadorCount: 3,
            hasAmbassadors: true,
            featured: true
          },
          {
            id: 'dev-community-2',
            description: 'Sustainable agriculture investment community',
            created_at: new Date().toISOString(),
            company_id: 'dev-company-2',
            companies: {
              id: 'dev-company-2',
              name: 'GreenGrow Farms',
              description: 'Sustainable agricultural practices',
              mission_statement: 'Growing food in harmony with nature',
              score: 78,
              image_url: 'https://placehold.co/100'
            },
            isMember: false,
            ambassadorCount: 1,
            hasAmbassadors: true,
            featured: true
          }
        ],
        error: null,
        status: 200
      });
    } else if (auth.error) {
      // In production or when explicit auth is required, return the auth error
      console.log('Authentication required for communities endpoint');
      return auth.error;
    }

    const { session, supabase } = auth;
    const userId = session.user.id;

    console.log('Fetching communities for user:', userId);

    // Get search parameter from URL if it exists
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    let finalCommunities: CommunityWithCompany[] = [];
    
    try {
      // Try the first approach with company_communities table
      console.log('Attempting to query company_communities table');
      
      let query = supabase
        .from('company_communities')
        .select(`
          id,
          description,
          created_at,
          company_id,
          companies:company_id (
            id,
            name,
            description,
            mission_statement,
            score,
            image_url
          )
        `)
      
      if (search) {
        query = query.textSearch('description', search)
      }
      
      const { data, error } = await query
      
      if (error) {
        console.log('Error querying company_communities:', error.message);
        throw error;
      }
      
      console.log(`Query successful. Found ${data?.length || 0} communities`);
      
      if (data && data.length > 0) {
        console.log('Sample community:', JSON.stringify(data[0], null, 2));
        finalCommunities = data as unknown as CommunityWithCompany[]
      } else {
        console.log('No communities found in company_communities table');
        throw new Error('No communities found in primary table');
      }
    } catch (firstError) {
      console.log('First query approach failed:', firstError)
      
      // Fallback approach
      try {
        console.log('Attempting fallback query to communities table');
        const { data: communities, error } = await supabase
          .from('communities')
          .select('id, description, created_at, company_id')
          
        if (error) {
          console.log('Error querying communities table:', error.message);
          throw error;
        }
        
        console.log(`Found ${communities?.length || 0} communities in fallback table`);
        
        if (!communities || communities.length === 0) {
          console.log('No communities found in fallback table either');
          throw new Error('No communities found in fallback table');
        }
        
        // Get company data for each community
        console.log('Fetching company data for each community');
        
        finalCommunities = await Promise.all(
          communities.map(async (community: CommunityBase): Promise<CommunityWithCompany> => {
            try {
              const { data: companyData, error: companyError } = await supabase
                .from('companies')
                .select('id, name, description, mission_statement, score, image_url')
                .eq('id', community.company_id)
                .single()
                
              if (companyError) {
                console.log(`Error fetching company ${community.company_id}:`, companyError.message);
                throw companyError;
              }
                
              return {
                ...community,
                companies: companyData as Company
              }
            } catch (err) {
              console.log(`Using default company data for community ${community.id}`);
              // If company data can't be fetched, provide default data
              return {
                ...community,
                companies: {
                  id: community.company_id,
                  name: 'Unknown Company',
                  description: null,
                  mission_statement: null,
                  score: 0,
                  image_url: null
                }
              }
            }
          })
        )
      } catch (secondError) {
        console.error('Both query approaches failed:', secondError)
        return NextResponse.json(
          { data: null, error: 'Failed to fetch communities', status: 500 },
          { status: 500 }
        )
      }
    }

    // If no communities were found, return an empty array instead of failing
    if (!finalCommunities || finalCommunities.length === 0) {
      console.log('No communities found, adding test community for development');
      
      // For development testing only - add a test community if none exist
      if (isDevelopment) {
        try {
          // Create a test company if needed
          const testCompanyId = 'test-company-id-for-development';
          const { data: existingCompany, error: companyCheckError } = await supabase
            .from('companies')
            .select('id')
            .eq('id', testCompanyId)
            .single();
            
          if (companyCheckError || !existingCompany) {
            console.log('Creating test company for development');
            const { error: companyCreateError } = await supabase
              .from('companies')
              .upsert({
                id: testCompanyId,
                name: 'Test Sustainable Company',
                description: 'This is a test company created automatically for development',
                mission_statement: 'Our mission is to provide test data for developers',
                score: 80,
                image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000',
                created_at: new Date().toISOString()
              });
              
            if (companyCreateError) {
              console.log('Error creating test company:', companyCreateError);
            }
          }
          
          // Create a test community linked to the company
          const testCommunityId = 'test-community-id-for-development';
          const { data: existingCommunity, error: communityCheckError } = await supabase
            .from('company_communities')
            .select('id')
            .eq('id', testCommunityId)
            .single();
            
          if (communityCheckError || !existingCommunity) {
            console.log('Creating test community for development');
            const { error: communityCreateError } = await supabase
              .from('company_communities')
              .upsert({
                id: testCommunityId,
                company_id: testCompanyId,
                description: 'This is a test community created automatically for development',
                created_at: new Date().toISOString()
              });
              
            if (communityCreateError) {
              console.log('Error creating test community:', communityCreateError);
            } else {
              console.log('Test community created successfully');
              
              // Add a test community membership for the current user
              const { error: membershipCreateError } = await supabase
                .from('community_members')
                .upsert({
                  user_id: userId,
                  community_id: testCommunityId,
                  created_at: new Date().toISOString()
                });
                
              if (membershipCreateError) {
                console.log('Error creating test membership:', membershipCreateError);
              }
              
              // Add the test community to our results
              finalCommunities = [{
                id: testCommunityId,
                description: 'This is a test community created automatically for development',
                created_at: new Date().toISOString(),
                company_id: testCompanyId,
                companies: {
                  id: testCompanyId,
                  name: 'Test Sustainable Company',
                  description: 'This is a test company created automatically for development',
                  mission_statement: 'Our mission is to provide test data for developers',
                  score: 80,
                  image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000'
                }
              }];
            }
          } else {
            console.log('Test community already exists, retrieving it');
            
            // Fetch the existing test community with company
            const { data: testCommunity, error: fetchError } = await supabase
              .from('company_communities')
              .select(`
                id,
                description,
                created_at,
                company_id,
                companies:company_id (
                  id,
                  name,
                  description,
                  mission_statement,
                  score,
                  image_url
                )
              `)
              .eq('id', testCommunityId)
              .single();
              
            if (fetchError) {
              console.log('Error fetching test community:', fetchError);
            } else {
              finalCommunities = [testCommunity as unknown as CommunityWithCompany];
            }
          }
        } catch (devError) {
          console.log('Error creating test data:', devError);
        }
      }
      
      // If still no communities after test data creation, return empty array
      if (!finalCommunities || finalCommunities.length === 0) {
        console.log('No communities found, returning empty array');
        return NextResponse.json({ 
          data: [], 
          error: null, 
          status: 200 
        });
      }
    }

    console.log(`Processing ${finalCommunities.length} communities`);
    
    // Get the user's memberships
    const { data: memberships, error: membershipError } = await supabase
      .from('community_members')
      .select('community_id')
      .eq('user_id', userId)
    
    if (membershipError) {
      console.error('Error fetching memberships:', membershipError)
    } else {
      console.log(`Found ${memberships?.length || 0} community memberships for user`);
    }
    
    // Create a set of community IDs the user is a member of
    const membershipSet = new Set(memberships?.map((m: { community_id: string }) => m.community_id) || [])
    
    // Add the isMember flag to each community
    const communitiesWithMembership = finalCommunities.map(community => ({
      ...community,
      isMember: membershipSet.has(community.id)
    }))

    // Get ambassador counts for each community
    const communityIds = communitiesWithMembership.map(community => community.id)
    
    // Check if there are any communities to query
    if (communityIds.length === 0) {
      console.log('No community IDs to query for ambassadors');
      return NextResponse.json({ 
        data: [], 
        error: null, 
        status: 200 
      })
    }
    
    // Fetch ambassador counts - use proper count query instead of group
    const { data: ambassadorCounts, error: ambassadorError } = await supabase
      .from('community_ambassadors')
      .select('community_id')
      .in('community_id', communityIds)
    
    if (ambassadorError) {
      console.error('Error fetching ambassador counts:', ambassadorError)
    } else {
      console.log(`Found ${ambassadorCounts?.length || 0} ambassador relationships`);
    }

    // Calculate ambassador counts manually
    const countMap = new Map<string, number>()
    if (ambassadorCounts) {
      ambassadorCounts.forEach((item: { community_id: string }) => {
        const communityId = item.community_id
        countMap.set(communityId, (countMap.get(communityId) || 0) + 1)
      })
    }
    
    // Fetch featured ambassador for each community (the first ambassador)
    const { data: featuredAmbassadors, error: ambassadorsFetchError } = await supabase
      .from('community_ambassadors')
      .select(`
        community_id,
        profiles:user_id (
          name
        )
      `)
      .in('community_id', communityIds)
      .order('created_at', { ascending: true })
    
    if (ambassadorsFetchError) {
      console.error('Error fetching ambassadors:', ambassadorsFetchError)
    } else {
      console.log(`Found ${featuredAmbassadors?.length || 0} ambassadors`);
    }
    
    // Create a map of community_id to featured ambassador
    const ambassadorMap = new Map<string, any>()
    if (featuredAmbassadors) {
      featuredAmbassadors.forEach((ambassador: { community_id: string, profiles: any }) => {
        if (!ambassadorMap.has(ambassador.community_id)) {
          ambassadorMap.set(ambassador.community_id, ambassador.profiles)
        }
      })
    }
    
    // Add ambassador info to each community
    const communitiesWithAmbassadors = communitiesWithMembership.map(community => {
      const ambassadorCount = countMap.get(community.id) || 0
      const featuredAmbassador = ambassadorMap.get(community.id) || null
      
      // Also add a 'featured' flag based on some criteria - for example, communities with high scores
      const isFeatured = community.companies.score > 70
      
      return {
        ...community,
        ambassadorCount,
        hasAmbassadors: ambassadorCount > 0,
        featuredAmbassador,
        featured: isFeatured
      }
    })

    // Count stats for log verification
    const featuredCount = communitiesWithAmbassadors.filter(c => c.featured).length;
    const withAmbassadorsCount = communitiesWithAmbassadors.filter(c => c.hasAmbassadors).length;
    
    console.log(`Final stats: ${communitiesWithAmbassadors.length} communities, ${featuredCount} featured, ${withAmbassadorsCount} with ambassadors`);
    
    // Reset the request counter on successful response
    requestCounter.count = 0;

    // Return the final result with consistent shape
    const response = { 
      data: communitiesWithAmbassadors, 
      error: null, 
      status: 200 
    };
    
    console.log('API response successful - returning communities data');
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in communities route:', error)
    
    // Always return a consistent response shape
    return NextResponse.json(
      { 
        data: null, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred', 
        status: 500 
      },
      { status: 500 }
    )
  }
} 
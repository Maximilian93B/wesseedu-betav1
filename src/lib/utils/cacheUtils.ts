/**
 * Cache utility functions for managing client-side caching
 */

// Cache keys
export const CACHE_KEYS = {
  PROFILE_DATA: 'dashboard_profile_data',
  COMMUNITY_FEED: 'dashboard_community_feed',
  GOALS_DATA: 'dashboard_goals_data',
  // Add other cache keys as needed
};

// Cache expiry times (in milliseconds)
export const CACHE_EXPIRY = {
  PROFILE_DATA: 5 * 60 * 1000, // 5 minutes
  COMMUNITY_FEED: 5 * 60 * 1000, // 5 minutes
  GOALS_DATA: 5 * 60 * 1000, // 5 minutes
  // Add other expiry times as needed
};

/**
 * Invalidate a specific cache item
 * @param key The cache key to invalidate
 */
export const invalidateCache = (key: string): void => {
  console.log(`CacheUtils: Invalidating cache for key: ${key}`);
  localStorage.removeItem(key);
};

/**
 * Invalidate the profile data cache
 */
export const invalidateProfileCache = (): void => {
  invalidateCache(CACHE_KEYS.PROFILE_DATA);
};

/**
 * Get cached data if it exists and is not expired
 * @param key The cache key to retrieve
 * @param expiryTime The expiry time in milliseconds
 * @returns The cached data or null if not found or expired
 */
export const getCachedData = <T>(key: string, expiryTime: number): T | null => {
  try {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;
    
    const { data, timestamp } = JSON.parse(cachedItem);
    const now = Date.now();
    
    // Check if the cache is still valid
    if (now - timestamp < expiryTime) {
      console.log(`CacheUtils: Using cached data for key: ${key}`);
      return data as T;
    } else {
      console.log(`CacheUtils: Cached data expired for key: ${key}`);
      invalidateCache(key);
      return null;
    }
  } catch (error) {
    console.error(`CacheUtils: Error retrieving cached data for key: ${key}`, error);
    return null;
  }
};

/**
 * Set data in the cache with a timestamp
 * @param key The cache key to set
 * @param data The data to cache
 */
export const setCachedData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );
    console.log(`CacheUtils: Data cached for key: ${key}`);
  } catch (error) {
    console.error(`CacheUtils: Error caching data for key: ${key}`, error);
  }
}; 
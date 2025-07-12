import NodeCache from 'node-cache';

/**
 * Cache Service - In-Memory Cache untuk Development tanpa Redis
 */
class CacheService {
  private cache: NodeCache;

  constructor() {
    // Default TTL 1 hour
    this.cache = new NodeCache({ 
      stdTTL: parseInt(process.env.CACHE_TTL || '3600'),
      checkperiod: 120 // Check expired keys every 2 minutes
    });
    
    console.log('✅ Cache Service initialized (In-Memory)');
  }

  /**
   * Get value from cache
   */
  async get(key: string): Promise<any | null> {
    try {
      const value = this.cache.get(key);
      return value || null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set value to cache
   */
  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      if (ttl) {
        return this.cache.set(key, value, ttl);
      }
      return this.cache.set(key, value);
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  /**
   * Delete key from cache
   */
  async del(key: string): Promise<boolean> {
    try {
      return this.cache.del(key) > 0;
    } catch (error) {
      console.error('Cache del error:', error);
      return false;
    }
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<boolean> {
    try {
      this.cache.flushAll();
      return true;
    } catch (error) {
      console.error('Cache clear error:', error);
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return this.cache.getStats();
  }
}

export default new CacheService();

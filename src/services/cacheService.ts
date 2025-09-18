import NodeCache from 'node-cache';
class CacheService {
  private readonly cache: NodeCache;
  constructor() {
    this.cache = new NodeCache({ 
      stdTTL: parseInt(process.env.CACHE_TTL || '3600'),
      checkperiod: 120 
    });
    
  }

  async get(key: string): Promise<any> {
    try {
      const value = this.cache.get(key);
      return value || null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

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

  async del(key: string): Promise<boolean> {
    try {
      return this.cache.del(key) > 0;
    } catch (error) {
      console.error('Cache del error:', error);
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      this.cache.flushAll();
      return true;
    } catch (error) {
      console.error('Cache clear error:', error);
      return false;
    }
  }

  getStats() {
    return this.cache.getStats();
  }
}

export default new CacheService();

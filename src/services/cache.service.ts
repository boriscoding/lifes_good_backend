
import { redisClient } from '../config/redis';

export const cacheService = {
  async get<T = unknown>(key: string): Promise<T | null> {
    const value = await redisClient.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  },

  async set(
    key: string,
    value: unknown,
    ttlSeconds: number = 3600,
  ): Promise<void> {
    await redisClient.setex(
      key,
      ttlSeconds,
      JSON.stringify(value),
    );
  },

  async del(key: string): Promise<void> {
    await redisClient.del(key);
  },
};


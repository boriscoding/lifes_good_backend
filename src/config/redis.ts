import Redis from 'ioredis';
import type { RedisOptions } from 'ioredis';
import { env } from './index';
import { logger } from './logger';

const redisOptions: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD || undefined,
  db: env.REDIS_DB,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: true,
};

export const redisClient = new Redis(redisOptions);

redisClient.on('connect', () => {
  logger.info('✅ Redis connecté.');
});

redisClient.on('error', (err: Error) => {
  logger.error('❌ Erreur Redis :', err.message);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await redisClient.quit();
  logger.info('Redis déconnecté proprement.');
});
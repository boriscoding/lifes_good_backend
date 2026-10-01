import Queue from 'bull';
import { redisClient } from '../config/redis';
import { logger } from '../config/logger';

const redisOptions = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
};

export const createQueue = (name: string): Queue.Queue => {
  const queue = new Queue(name, redisOptions);

  queue.on('completed', (job) => {
    logger.info(`Job ${job.id} dans ${name} termine`);
  });

  queue.on('failed', (job, err) => {
    logger.error(`Job ${job.id} dans ${name} echoue:`, err.message);
  });

  return queue;
};
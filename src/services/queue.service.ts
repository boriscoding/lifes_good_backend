
import { logger } from '../config/logger';

export const queueService = {
  async addJob(
    queueName: string,
    data: unknown,
  ): Promise<{ id: string }> {
    logger.info(`Job ajoute a ${queueName}`, data);

    // TODO: Implementer Bull/BullMQ
    return {
      id: 'temp-id',
    };
  },
};


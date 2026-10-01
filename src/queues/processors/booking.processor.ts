import { bookingQueue } from '../booking.queue';
import { logger } from '../../config/logger';

bookingQueue.process(async (job) => {
  logger.info('Traitement job booking:', job.data);
  // TODO: Logique de traitement asynchrone des reservations
  return { processed: true };
});
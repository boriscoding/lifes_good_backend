import { paymentQueue } from '../payment.queue';
import { logger } from '../../config/logger';

paymentQueue.process(async (job) => {
  logger.info('Traitement job payment:', job.data);
  // TODO: Verifier statut paiement en arriere-plan
  return { processed: true };
});
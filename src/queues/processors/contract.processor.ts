import { contractQueue } from '../contract.queue';
import { documentService } from '../../services/document.service';
import { logger } from '../../config/logger';

contractQueue.process(async (job) => {
  const { contractId } = job.data;
  logger.info(`Generation PDF contrat ${contractId}`);
  // TODO: Generer le PDF et stocker l'URL
  return { generated: true };
});
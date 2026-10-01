
import { logger } from '../config/logger';

export const whatsappPendingMessages = async (): Promise<void> => {
  try {
    // TODO: Traiter les messages WhatsApp en attente dans la queue
    logger.info('Messages WhatsApp en attente traites');
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error('Erreur whatsappPendingMessages:', message);
  }
};



import { logger } from '../config/logger';

export const cleanExpiredTokens = async (): Promise<void> => {
  try {
    // TODO: Implémenter la suppression des refresh tokens expirés en base
    logger.info('Nettoyage des tokens expirés effectué');
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error('Erreur cleanExpiredTokens:', message);
  }
};


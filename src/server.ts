import app from './app';
import { env } from './config';
import {
  testConnection,
  disconnectDatabase,
} from './config/database';
import { redisClient } from './config/redis';
import { logger } from './config/logger';

const PORT = env.PORT;

// ==========================================
// DEMARRAGE DU SERVEUR
// ==========================================

const startServer = async (): Promise<void> => {
  try {
    // 1. Connexion à la base de données
    await testConnection();

    
    //    En développement :
    //    npx prisma migrate dev
    //
    //    En production :
    //    npx prisma migrate deploy

    try {
      await redisClient.connect();
    } catch (redisErr: unknown) {
      const message =
        redisErr instanceof Error
          ? redisErr.message
          : String(redisErr);

      logger.warn('⚠️ Redis non disponible:', message);
    }

    const server = app.listen(PORT, () => {
      logger.info('=================================');
      logger.info(`🚀 Server demarre sur le port ${PORT}`);
      logger.info(`🌍 URL: ${env.API_URL}`);
      logger.info(`🔧 Environnement: ${env.NODE_ENV}`);
      logger.info(`📦 Base de donnees: ${env.DB_DIALECT}`);
      logger.info('=================================');
    });

    // ==========================================
    // ARRET PROPRE DU SERVEUR
    // ==========================================

    const gracefulShutdown = async (
      signal: string,
    ): Promise<void> => {
      logger.info(
        `\n📴 Signal ${signal} recu. Arret en cours...`,
      );

      server.close(async () => {
        logger.info('🔌 Serveur HTTP ferme');

        // Fermeture Prisma
        try {
          await disconnectDatabase();
          logger.info('🔌 Connexion MySQL fermee');
        } catch (err: unknown) {
          const message =
            err instanceof Error
              ? err.message
              : String(err);

          logger.error(
            'Erreur fermeture MySQL:',
            message,
          );
        }

        // Fermeture Redis
        try {
          await redisClient.quit();
          logger.info('🔌 Connexion Redis fermee');
        } catch {
          // Redis peut déjà être fermé
        }

        logger.info('✅ Arret propre termine');

        process.exit(0);
      });
    };

    process.on('SIGTERM', () => {
      void gracefulShutdown('SIGTERM');
    });

    process.on('SIGINT', () => {
      void gracefulShutdown('SIGINT');
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    logger.error(
      '❌ Impossible de demarrer le serveur:',
      message,
    );

    process.exit(1);
  }
};

void startServer();


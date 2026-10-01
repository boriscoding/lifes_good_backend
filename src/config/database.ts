
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { env } from './index';
import { logger } from './logger';

const adapter = new PrismaMariaDb({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectionLimit: env.DB_POOL_MAX,
});

export const prisma = new PrismaClient({
  adapter,

  log:
    env.NODE_ENV === 'production'
      ? ['error']
      : ['query', 'info', 'warn', 'error'],
});

/**
 * Teste la connexion à la base de données.
 */
prisma.$connect().then(async () => {
  try {
    const testUser = await prisma.user.findFirst({
      select: { id: true, nationalite: true, adresse: true },
    });
    console.log('TEST SELECT nationalite/adresse OK:', testUser);
  } catch (e: any) {
    console.log('TEST SELECT nationalite/adresse ECHEC:', e.message);
  }
});
export const testConnection = async (): Promise<void> => {
  
  try {
    await prisma.$connect();

    logger.info('✅ Connexion à la base de données établie.');
  } catch (error) {
    logger.error(
      '❌ Impossible de se connecter à la base de données :',
      error,
    );

    throw error;
  }
};

/**
 * Ferme proprement la connexion à la base de données.
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();

    logger.info('🔌 Connexion à la base de données fermée.');
  } catch (error) {
    logger.error(
      '❌ Impossible de fermer la connexion à la base de données :',
      error,
    );

    throw error;
  }
};
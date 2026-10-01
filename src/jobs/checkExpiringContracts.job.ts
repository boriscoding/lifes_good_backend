
import { prisma } from '../config/database';
import { logger } from '../config/logger';
import dayjs from 'dayjs';
import { emailService } from '../services/email.service';

export const checkExpiringContracts = async (): Promise<void> => {
  try {
    const now = new Date();
    const alertDate = dayjs(now).add(30, 'day').toDate();

    const expiring = await prisma.contract.findMany({
      where: {
        status: 'active',
        endDate: {
          gte: now,
          lte: alertDate,
        },
      },
    });

    for (const contract of expiring) {
      // TODO: Envoyer alerte au manager
      logger.info(
        `Contrat ${contract.id} expire bientot (${contract.endDate})`,
      );
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error('Erreur checkExpiringContracts:', message);
  }
};



import { prisma } from '../config/database';
import { logger } from '../config/logger';
import dayjs from 'dayjs';
import { emailService } from '../services/email.service';
import { smsService } from '../services/sms.service';

export const sendReminderNotifications = async (): Promise<void> => {
  try {
    const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();
    const dayAfter = dayjs().add(2, 'day').startOf('day').toDate();

    const checkins = await prisma.booking.findMany({
      where: {
        status: 'confirmed',
        startDate: {
          gte: tomorrow,
          lt: dayAfter,
        },
      },
    });

    for (const booking of checkins) {
      await emailService.send(
        booking.guestEmail,
        'Rappel de reservation',
        `Bonjour ${booking.guestName}, votre arrivee est prevue demain.`,
      );

      await smsService.send(
        booking.guestPhone,
        `Rappel: Votre reservation ${booking.reference} est prevue demain.`,
      );
    }

    logger.info(`${checkins.length} rappels envoyes`);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error('Erreur sendReminderNotifications:', message);
  }
};


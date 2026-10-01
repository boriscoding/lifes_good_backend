
import { prisma } from '../config/database';
import { logger } from '../config/logger';
import dayjs from 'dayjs';

export const checkOverdueBookings = async (): Promise<void> => {
  try {
    const overdueDate = dayjs().subtract(1, 'day').toDate();

    const bookings = await prisma.booking.findMany({
      where: {
        status: 'pending',
        startDate: {
          lt: overdueDate,
        },
      },
    });

    for (const booking of bookings) {
      await prisma.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: 'cancelled',
          cancellationReason: 'Non paye - depasse',
        },
      });

      logger.info(
        `Reservation annulee pour depassement: ${booking.reference}`,
      );
    }

    logger.info(
      `${bookings.length} reservations en retard traitees`,
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error('Erreur checkOverdueBookings:', message);
  }
};



import { bookingRepository } from '../repositories/booking.repository';

export const availabilityService = {
  async check(query: {
    propertyId?: string;
    startDate?: string | Date;
    endDate?: string | Date;
  }) {
    const { propertyId, startDate, endDate } = query;

    if (!propertyId || !startDate || !endDate) {
      throw new Error('Parametres manquants');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new Error('Dates invalides');
    }

    if (start >= end) {
      throw new Error(
        'La date de debut doit etre anterieure a la date de fin',
      );
    }

    const isAvailable = await bookingRepository.checkAvailability(
      propertyId,
      start,
      end,
    );

    return {
      available: isAvailable,
      propertyId,
      startDate,
      endDate,
    };
  },

  async getCalendar(
    propertyId: string,
    query: {
      startDate?: string | Date;
      endDate?: string | Date;
    } = {},
  ) {
    // TODO: Retourner le calendrier d'occupation detaille
    return {
      propertyId,
      bookings: [],
      blocks: [],
    };
  },
};

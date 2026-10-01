import { manualBookingRepository } from '../repositories/manualBooking.repository';
import { bookingRepository } from '../repositories/booking.repository';
import { propertyService } from './property.service';
import { generateReference } from '../utils/generateReference';
import { logger } from '../config/logger';

type ManualBookingCreateData = Parameters<
  typeof manualBookingRepository.create
>[0];

type ManualBookingListOptions = Parameters<
  typeof manualBookingRepository.list
>[0];

type ManualBookingUpdateData = Parameters<
  typeof manualBookingRepository.update
>[1];

type BookingCreateData = Parameters<
  typeof bookingRepository.create
>[0];

export const manualBookingService = {
  async create(data: ManualBookingCreateData) {
    const property = await propertyService.findById(data.propertyId);

    if (!property) {
      throw new Error('Bien non trouvé');
    }

    return manualBookingRepository.create({
      ...data,
      status: 'pending',
    });
  },

  async list(query?: ManualBookingListOptions) {
    return manualBookingRepository.list(query);
  },

  async approve(id: string, userId: string) {
    const request = await manualBookingRepository.findById(id);

    if (!request) {
      throw new Error('Demande non trouvée');
    }

    if (request.status !== 'pending') {
      throw new Error(
        'Cette demande a déjà été traitée',
      );
    }

    const property = await propertyService.findById(
      request.propertyId,
    );

    if (!property) {
      throw new Error('Bien non trouvé');
    }

    return manualBookingRepository.update(id, {
      status: 'approved',
      processedBy: userId,
      processedAt: new Date(),
    });
  },

  async reject(id: string, reason?: string) {
    const request = await manualBookingRepository.findById(id);

    if (!request) {
      throw new Error('Demande non trouvée');
    }

    if (request.status !== 'pending') {
      throw new Error(
        'Cette demande a déjà été traitée',
      );
    }

    return manualBookingRepository.update(id, {
      status: 'rejected',
      notes: reason || 'Demande rejetée',
    });
  },

  async generateConfirmationId(
    id: string,
  ): Promise<{ confirmationId: string }> {
    const request =
      await manualBookingRepository.findById(id);

    if (!request) {
      throw new Error(
        'Réservation manuelle non trouvée',
      );
    }

    if (request.status !== 'approved') {
      throw new Error(
        "La réservation doit être approuvée avant de générer un ID",
      );
    }

    const confirmationId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const updated =
      await manualBookingRepository.update(id, {
        confirmationId,
      });

    if (!updated) {
      throw new Error(
        "Erreur lors de la génération de l'ID",
      );
    }

    return { confirmationId };
  },

  async confirmManualBooking(
    confirmationId: string,
    userId: string,
  ) {
    const manualBooking =
      await manualBookingRepository.findByConfirmationId(
        confirmationId,
      );

    if (!manualBooking) {
      throw new Error(
        'ID de confirmation invalide',
      );
    }

    if (manualBooking.status === 'confirmed') {
      throw new Error(
        'Cette réservation est déjà confirmée',
      );
    }

    if (manualBooking.status !== 'approved') {
      throw new Error(
        "Cette réservation n'est pas encore approuvée",
      );
    }

    const finalUserId =
      userId || manualBooking.userId;

    if (!finalUserId) {
      throw new Error('Utilisateur non identifié');
    }

    if (!manualBooking.userId) {
      await manualBookingRepository.update(
        manualBooking.id,
        {
          userId: finalUserId,
        },
      );
    }

    const bookingData: any = {
      reference: generateReference('BK'),
      userId: finalUserId,
      propertyId: manualBooking.propertyId,
      propertyType: 'room',
      startDate: manualBooking.startDate,
      endDate: manualBooking.endDate,
      numberOfGuests: manualBooking.numberOfGuests,
      totalAmount: Number(manualBooking.totalAmount),
      depositAmount: Number(manualBooking.depositAmount),
      status: 'confirmed',
      paymentStatus: 'paid',
      manualBookingId: manualBooking.id,
      guestName: manualBooking.guestName,
      guestEmail: manualBooking.guestEmail,
      guestPhone: manualBooking.guestPhone,
    };

    const booking =
      await bookingRepository.create(bookingData);

    if (!booking) {
      throw new Error(
        'Erreur lors de la création de la réservation',
      );
    }

    await manualBookingRepository.update(
      manualBooking.id,
      {
        status: 'confirmed',
        bookingId: booking.id,
        userId: finalUserId,
      },
    );

    logger.info(
      `Réservation manuelle confirmée: ${manualBooking.id} -> Booking: ${booking.id}`,
    );

    return booking;
  },

  async getById(id: string) {
    const request =
      await manualBookingRepository.findById(id);

    if (!request) {
      throw new Error(
        'Réservation manuelle non trouvée',
      );
    }

    return request;
  },
};
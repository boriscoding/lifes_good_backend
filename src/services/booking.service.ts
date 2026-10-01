import { 
    Booking, 
    BookingStatus, 
    PropertyType 
} from '../generated/prisma/client';
import { bookingRepository } from '../repositories/booking.repository';
import { generateReference } from '../utils/generateReference';
import { calculateDepositAmount } from '../utils/paymentHelpers';
import { invoiceService } from './invoice.service';
import { notificationService } from './notification.service';
import { logger } from '../config/logger';

export const createForBooking = async (booking: Booking) => {
    // Ici booking.totalAmount sera reconnu comme un Decimal
    // Tu pourras faire booking.totalAmount.toNumber() juste au moment d'enregistrer la facture
};

export const bookingService = {
  async create(data: {
    propertyId: string;
    propertyType: PropertyType;
    userId?: string | null;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    startDate: string | Date;
    endDate: string | Date;
    numberOfGuests: number;
    totalAmount: number;
    specialRequests?: string | null;
    createdBy?: string | null;
  }) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      throw new Error('Dates invalides');
    }

    if (startDate >= endDate) {
      throw new Error(
        'La date de debut doit etre anterieure a la date de fin',
      );
    }

    const isAvailable = await bookingRepository.checkAvailability(
      data.propertyId,
      startDate,
      endDate,
    );

    if (!isAvailable) {
      throw new Error(
        "Ce bien n'est pas disponible sur cette periode",
      );
    }

    const reference = generateReference('BK');

    const depositAmount = calculateDepositAmount(
      data.totalAmount,
      30,
    );

    const booking = await bookingRepository.create({
      propertyId: data.propertyId,
      propertyType: data.propertyType,
      userId: data.userId ?? null,

      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,

      startDate,
      endDate,

      numberOfGuests: data.numberOfGuests,

      reference,

      totalAmount: data.totalAmount,
      depositAmount,
      paidAmount: 0,

      specialRequests: data.specialRequests ?? null,

      status: 'pending' as BookingStatus,

      createdBy: data.createdBy ?? null,
    });

    // Generation automatique de la facture associee. Ne doit jamais faire
    // echouer la creation de la reservation : si ca casse, on logue et on
    // continue (la reservation reste valide meme sans facture generee).
    try {
      await invoiceService.createForBooking(booking);
    } catch (error) {
      logger.error('Echec de la generation automatique de facture:', error);
    }

    // Notification "réservation créée" — même logique best-effort : une
    // notification manquée ne doit jamais faire échouer la réservation.
    // Pas de notification si userId est absent (réservation créée sans
    // compte, ex: réservation manuelle par un admin pour un invité).
    if (booking.userId) {
      try {
        await notificationService.create({
          userId: booking.userId,
          bookingId: booking.id,
          type: 'email',
          subject: 'Réservation confirmée',
          content: `Votre réservation ${booking.reference} a bien été enregistrée. Montant total : ${data.totalAmount.toLocaleString('fr-FR')} FCFA.`,
        });
      } catch (error) {
        logger.error('Echec de la notification de reservation creee:', error);
      }
    }

    return booking;
  },

  async findById(id: string) {
    const booking = await bookingRepository.findById(id);

    if (!booking) {
      throw new Error('Reservation non trouvee');
    }

    return booking;
  },

  async list(options?: {
    propertyId?: string;
    propertyType?: PropertyType;
    userId?: string;
    status?: BookingStatus;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }) {
    return bookingRepository.list(options);
  },

  async cancel(id: string, reason?: string) {
    const booking = await bookingRepository.update(id, {
      status: 'cancelled',
      cancellationReason: reason ?? null,
      cancelledAt: new Date(),
    });

    if (!booking) {
      throw new Error('Reservation non trouvee');
    }

    if (booking.userId) {
      try {
        await notificationService.create({
          userId: booking.userId,
          bookingId: booking.id,
          type: 'email',
          subject: 'Réservation annulée',
          content: `Votre réservation ${booking.reference} a été annulée.${reason ? ` Motif : ${reason}` : ''}`,
        });
      } catch (error) {
        logger.error('Echec de la notification d\'annulation:', error);
      }
    }

    return booking;
  },
};

import {
  ManualBookingRequest,
  ManualBookingStatus,
} from '../../generated/prisma/client';

export interface IManualBookingRepository {
  findById(id: string): Promise<ManualBookingRequest | null>;

  findByConfirmationId(
    confirmationId: string,
  ): Promise<ManualBookingRequest | null>;

  create(data: {
    propertyId: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
    totalAmount: number;
    depositAmount: number;
    notes?: string | null;
    status?: ManualBookingStatus;
    createdBy: string;
    processedBy?: string | null;
    processedAt?: Date | null;
    confirmationId?: string | null;
    bookingId?: string | null;
    userId?: string | null;
  }): Promise<ManualBookingRequest>;

  update(
    id: string,
    data: {
      propertyId?: string;
      guestName?: string;
      guestEmail?: string;
      guestPhone?: string;
      startDate?: Date;
      endDate?: Date;
      numberOfGuests?: number;
      totalAmount?: number;
      depositAmount?: number;
      notes?: string | null;
      status?: ManualBookingStatus;
      processedBy?: string | null;
      processedAt?: Date | null;
      confirmationId?: string | null;
      bookingId?: string | null;
      userId?: string | null;
    },
  ): Promise<ManualBookingRequest | null>;

  list(options?: {
    propertyId?: string;
    userId?: string;
    status?: ManualBookingStatus;
    createdBy?: string;
    processedBy?: string;
    guestEmail?: string;
    confirmationId?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{
    data: ManualBookingRequest[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
}


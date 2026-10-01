
import { Booking, BookingStatus, PropertyType } from '../../generated/prisma/client';

export interface IBookingRepository {
  findById(id: string): Promise<Booking | null>;

  create(data: {
    reference: string;
    propertyId: string;
    propertyType: PropertyType;
    userId?: string | null;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
    status?: BookingStatus;
    totalAmount: number;
    depositAmount: number;
    paidAmount?: number;
    specialRequests?: string | null;
    cancellationReason?: string | null;
    cancelledAt?: Date | null;
    checkedInAt?: Date | null;
    checkedOutAt?: Date | null;
    createdBy?: string | null;
  }): Promise<Booking>;

  update(
    id: string,
    data: {
      guestName?: string;
      guestEmail?: string;
      guestPhone?: string;
      startDate?: Date;
      endDate?: Date;
      numberOfGuests?: number;
      status?: BookingStatus;
      totalAmount?: number;
      depositAmount?: number;
      paidAmount?: number;
      specialRequests?: string | null;
      cancellationReason?: string | null;
      cancelledAt?: Date | null;
      checkedInAt?: Date | null;
      checkedOutAt?: Date | null;
    },
  ): Promise<Booking | null>;

  list(options?: {
    propertyId?: string;
    propertyType?: PropertyType;
    userId?: string;
    status?: BookingStatus;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Booking[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;

  checkAvailability(
    propertyId: string,
    start: Date,
    end: Date,
  ): Promise<boolean>;
}


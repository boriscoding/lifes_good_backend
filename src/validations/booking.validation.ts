import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    numberOfGuests: z.number().min(1).max(20),
    guestName: z.string().min(2),
    guestEmail: z.string().email(),
    guestPhone: z.string().min(9),
    specialRequests: z.string().optional(),
    promotionCode: z.string().optional(),
  }),
});

export const updateBookingSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled']).optional(),
    specialRequests: z.string().optional(),
  }),
});

export const cancelBookingSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    reason: z.string().optional(),
  }),
});
import { z } from 'zod';

export const createManualBookingSchema = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    guestName: z.string().min(2),
    guestEmail: z.string().email(),
    guestPhone: z.string().min(9),
    numberOfGuests: z.number().min(1),
    totalAmount: z.number().positive(),
    depositAmount: z.number().nonnegative(),
    notes: z.string().optional(),
    createdBy: z.string().uuid(),
  }),
});
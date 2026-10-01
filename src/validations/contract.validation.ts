import { z } from 'zod';

export const createContractSchema = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    tenantId: z.string().uuid(),
    type: z.enum(['short_term', 'long_term']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    monthlyRent: z.number().positive(),
    depositAmount: z.number().nonnegative(),
    terms: z.string().min(10),
    clauses: z.array(z.string()).optional(),
  }),
});

export const updateContractSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['draft', 'sent', 'signed', 'active', 'terminated', 'expired']).optional(),
    endDate: z.string().datetime().optional(),
    terms: z.string().optional(),
  }),
});
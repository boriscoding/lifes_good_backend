import { z } from 'zod';

export const createPropertySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    type: z.enum(['room', 'apartment', 'office']),
    description: z.string().min(10).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().default('Cameroun'),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    isActive: z.boolean().default(true),
  }),
});

export const updatePropertySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const listPropertiesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    type: z.enum(['room', 'apartment', 'office']).optional(),
    city: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    capacity: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});

import {
  PricingRule,
  PropertyType,
} from '../generated/prisma/client';

import { prisma } from '../config/database';

export const pricingService = {
  async calculatePrice(
    propertyId: string,
    propertyType: PropertyType,
    startDate: Date,
    endDate: Date,
  ) {
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

    const rules: PricingRule[] =
      await prisma.pricingRule.findMany({
        where: {
          propertyId,
          propertyType,
          isActive: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

    const nights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    // TODO: Implementer la logique de calcul complexe
    // basee sur les regles tarifaires.

    return {
      total: 0,
      nights,
      rulesApplied: rules,
    };
  },
};


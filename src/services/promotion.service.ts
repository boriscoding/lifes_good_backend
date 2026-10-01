
import dayjs from 'dayjs';

import {
  Promotion,
  PromotionScope,
  PromotionType,
} from '../generated/prisma/client';

import { promotionRepository } from '../repositories/promotion.repository';

export const promotionService = {
  async create(data: {
    code: string;
    description?: string | null;
    type: PromotionType;
    value: number;
    scope?: PromotionScope;
    propertyId?: string | null;
    startDate: Date;
    endDate: Date;
    maxUses?: number | null;
    minBookingAmount?: number | null;
    isActive?: boolean;
  }): Promise<Promotion> {
    return promotionRepository.create({
      ...data,
      code: data.code.toUpperCase(),
    });
  },

  async list(options?: {
    page?: number;
    limit?: number;
    isActive?: boolean;
    code?: string;
    scope?: PromotionScope;
  }) {
    return promotionRepository.list(options);
  },

  async validateCode(
    code: string,
    bookingAmount: number,
  ): Promise<{
    valid: boolean;
    discount: number;
    promotion?: Promotion;
  }> {
    const promotion = await promotionRepository.findByCode(
      code.toUpperCase(),
    );

    if (!promotion || !promotion.isActive) {
      return {
        valid: false,
        discount: 0,
      };
    }

    const now = dayjs();

    if (
      now.isBefore(dayjs(promotion.startDate)) ||
      now.isAfter(dayjs(promotion.endDate))
    ) {
      return {
        valid: false,
        discount: 0,
      };
    }

    if (
      promotion.maxUses !== null &&
      promotion.maxUses !== undefined &&
      promotion.usedCount >= promotion.maxUses
    ) {
      return {
        valid: false,
        discount: 0,
      };
    }

    const minBookingAmount = promotion.minBookingAmount
      ? Number(promotion.minBookingAmount)
      : 0;

    if (minBookingAmount > 0 && bookingAmount < minBookingAmount) {
      return {
        valid: false,
        discount: 0,
      };
    }

    const promotionValue = Number(promotion.value);

    let discount = 0;

    if (promotion.type === PromotionType.percentage) {
      discount = (bookingAmount * promotionValue) / 100;
    } else if (promotion.type === PromotionType.fixed_amount) {
      discount = promotionValue;
    }

    return {
      valid: true,
      discount: Math.min(discount, bookingAmount),
      promotion,
    };
  },

  async delete(id: string): Promise<boolean> {
    const deleted = await promotionRepository.delete(id);

    if (!deleted) {
      throw new Error('Promotion non trouvee');
    }

    return true;
  },
};


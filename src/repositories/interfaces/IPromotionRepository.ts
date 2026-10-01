
import {
  Promotion,
  PromotionScope,
  PromotionType,
} from '../../generated/prisma/client';

export interface IPromotionRepository {
  findById(id: string): Promise<Promotion | null>;

  findByCode(code: string): Promise<Promotion | null>;

  create(data: {
    code: string;
    description?: string | null;
    type: PromotionType;
    value: number;
    scope?: PromotionScope;
    propertyId?: string | null;
    startDate: Date;
    endDate: Date;
    maxUses?: number | null;
    usedCount?: number;
    minBookingAmount?: number | null;
    isActive?: boolean;
  }): Promise<Promotion>;

  update(
    id: string,
    data: {
      code?: string;
      description?: string | null;
      type?: PromotionType;
      value?: number;
      scope?: PromotionScope;
      propertyId?: string | null;
      startDate?: Date;
      endDate?: Date;
      maxUses?: number | null;
      usedCount?: number;
      minBookingAmount?: number | null;
      isActive?: boolean;
    },
  ): Promise<Promotion | null>;

  list(options?: {
    code?: string;
    type?: PromotionType;
    scope?: PromotionScope;
    propertyId?: string;
    isActive?: boolean;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Promotion[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;

  delete(id: string): Promise<boolean>;
}


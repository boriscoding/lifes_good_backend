export type PromotionType = 'percentage' | 'fixed_amount' | 'free_nights';

export type PromotionScope = 'global' | 'room' | 'apartment' | 'office' | 'property';

export interface PromotionFilter {
  code?: string;
  isActive?: boolean;
  scope?: PromotionScope;
  startDate?: Date;
  endDate?: Date;
}
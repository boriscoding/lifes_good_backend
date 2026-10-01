export type AmenityCategory = 'room' | 'apartment' | 'office' | 'common';

export interface AmenityFilters {
  category?: AmenityCategory;
  isActive?: boolean;
  search?: string;
}
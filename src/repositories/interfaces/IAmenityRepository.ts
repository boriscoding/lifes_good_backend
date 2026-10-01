
import { Amenity } from '../../generated/prisma/client';

export interface IAmenityRepository {
  findById(id: string): Promise<Amenity | null>;

  create(data: {
    name: string;
    slug: string;
    category: 'room' | 'apartment' | 'office' | 'common';
    icon?: string;
    description?: string;
    isActive?: boolean;
  }): Promise<Amenity>;

  update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      category?: 'room' | 'apartment' | 'office' | 'common';
      icon?: string | null;
      description?: string | null;
      isActive?: boolean;
    },
  ): Promise<Amenity | null>;

  list(options?: {
    category?: 'room' | 'apartment' | 'office' | 'common';
    isActive?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<Amenity[]>;

  delete(id: string): Promise<boolean>;
}


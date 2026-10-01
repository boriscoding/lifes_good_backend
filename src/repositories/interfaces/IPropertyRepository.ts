
import {
  Property,
  PropertyType,
} from '../../generated/prisma/client';

export interface IPropertyRepository {
  findById(id: string): Promise<Property | null>;

  create(data: {
    name: string;
    type: PropertyType;
    description?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    isActive?: boolean;
    pricePerDay?: number | null;
    basePrice?: number | null;
    price?: number | null;
    category?: string | null;
    capacity?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    surface?: number | null;
  }): Promise<Property>;

  update(
    id: string,
    data: {
      name?: string;
      type?: PropertyType;
      description?: string | null;
      address?: string | null;
      city?: string | null;
      country?: string;
      latitude?: number | null;
      longitude?: number | null;
      isActive?: boolean;
      pricePerDay?: number | null;
      basePrice?: number | null;
      price?: number | null;
      category?: string | null;
      capacity?: number | null;
      bedrooms?: number | null;
      bathrooms?: number | null;
      surface?: number | null;
    },
  ): Promise<Property | null>;

  list(options?: {
    type?: PropertyType;
    city?: string;
    category?: string;
    isActive?: boolean;
    minPrice?: number;
    maxPrice?: number;
    capacity?: number;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Property[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;

  delete(id: string): Promise<boolean>;
}
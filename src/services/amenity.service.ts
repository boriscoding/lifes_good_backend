
import { Amenity, AmenityCategory } from '../generated/prisma/client';
import { amenityRepository } from '../repositories/amenity.repository';

export const amenityService = {
  async create(data: {
    name: string;
    slug: string;
    category: AmenityCategory;
    icon?: string;
    description?: string;
    isActive?: boolean;
  }): Promise<Amenity> {
    return amenityRepository.create(data);
  },

  async list(options?: {
    category?: AmenityCategory;
    isActive?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<Amenity[]> {
    return amenityRepository.list(options);
  },

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      category?: AmenityCategory;
      icon?: string | null;
      description?: string | null;
      isActive?: boolean;
    },
  ): Promise<Amenity> {
    const amenity = await amenityRepository.update(id, data);

    if (!amenity) {
      throw new Error('Equipement non trouve');
    }

    return amenity;
  },

  async delete(id: string): Promise<boolean> {
    const deleted = await amenityRepository.delete(id);

    if (!deleted) {
      throw new Error('Equipement non trouve');
    }

    return true;
  },
};


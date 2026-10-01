import {
  Property,
  PropertyType,
} from '../generated/prisma/client';

import { propertyRepository } from '../repositories/property.repository';
import { prisma } from '../lib/prisma';

type CreatePropertyData = {
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
};

// Le formulaire admin envoie une catégorie en texte libre (ex: "56", "vip",
// "VIP"...) mais la table Room attend un enum RoomCategory strict
// (standard | premium | vip). On normalise, avec repli sur "standard".
function toRoomCategory(input?: string | null): 'standard' | 'premium' | 'vip' {
  const value = (input || '').trim().toLowerCase();
  if (value === 'premium') return 'premium';
  if (value === 'vip') return 'vip';
  return 'standard';
}

function resolvePrice(data: CreatePropertyData): number {
  return Number(data.pricePerDay ?? data.basePrice ?? data.price ?? 0);
}

/**
 * Crée la ligne spécifique (Room / Apartment / Office) correspondant au
 * type de la Property qui vient d'être créée, avec des valeurs par défaut
 * pour les champs que le formulaire admin actuel ne collecte pas encore.
 *
 * ⚠️ Valeurs par défaut à ajuster si besoin :
 * - Room.roomNumber : généré depuis l'id de la Property (aucun champ
 *   "numéro de chambre" dans le formulaire admin actuel)
 * - Room.bedType : "Standard" par défaut
 * - Apartment.depositAmount : 2x le prix/nuit par défaut
 * - Office.rentalType : "day" par défaut
 */
async function createLinkedEntity(property: Property, data: CreatePropertyData): Promise<void> {
  const price = resolvePrice(data);

  switch (property.type) {
    case 'room':
      await prisma.room.create({
        data: {
          propertyId: property.id,
          roomNumber: `AUTO-${property.id.slice(0, 8).toUpperCase()}`,
          category: toRoomCategory(data.category),
          pricePerNight: price,
          capacity: data.capacity ?? 2,
          bedType: 'Standard',
          sizeSqm: data.surface ?? undefined,
          isActive: data.isActive ?? true,
        },
      });
      break;

    case 'apartment':
      await prisma.apartment.create({
        data: {
          propertyId: property.id,
          name: property.name,
          bedrooms: data.bedrooms ?? 1,
          bathrooms: data.bathrooms ?? 1,
          sizeSqm: data.surface ?? 0,
          maxGuests: data.capacity ?? 2,
          pricePerNight: price,
          depositAmount: price * 2,
          isActive: data.isActive ?? true,
        },
      });
      break;

    case 'office':
      await prisma.office.create({
        data: {
          propertyId: property.id,
          name: property.name,
          sizeSqm: data.surface ?? 0,
          maxCapacity: data.capacity ?? 4,
          rentalType: 'day',
          pricePerDay: price,
          isActive: data.isActive ?? true,
        },
      });
      break;
  }
}

export const propertyService = {
  async create(data: CreatePropertyData): Promise<Property> {
    const property = await propertyRepository.create(data);

    // Best-effort : si la création de la ligne spécifique échoue (ex:
    // contrainte manquante), la Property existe déjà mais n'apparaîtra pas
    // côté public tant que le problème n'est pas corrigé — on log plutôt
    // que de faire échouer toute la création du bien.
    try {
      await createLinkedEntity(property, data);
    } catch (err) {
      console.error(
        `Impossible de créer l'entité ${property.type} liée à la property ${property.id}:`,
        err
      );
    }

    return property;
  },

  async findById(id: string): Promise<Property> {
    const property = await propertyRepository.findById(id);

    if (!property) {
      throw new Error('Propriete non trouvee');
    }

    return property;
  },

  async list(options?: {
    page?: number;
    limit?: number;
    type?: PropertyType;
    city?: string;
    isActive?: boolean;
    category?: string;
  }) {
    return propertyRepository.list(options);
  },

  async update(
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
  ): Promise<Property> {
    const property = await propertyRepository.update(id, data);

    if (!property) {
      throw new Error('Propriete non trouvee');
    }

    // ⚠️ La ligne spécifique (Room/Apartment/Office) n'est PAS mise à jour
    // ici pour l'instant : une modification du prix ou de la capacité dans
    // le dashboard admin ne se répercute pas encore sur /rooms, /apartments
    // ou /offices. Dis-moi si tu veux que j'ajoute cette synchronisation.

    return property;
  },

  async delete(id: string): Promise<boolean> {
    const deleted = await propertyRepository.delete(id);

    if (!deleted) {
      throw new Error('Propriete non trouvee');
    }

    return true;
  },
};
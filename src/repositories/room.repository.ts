import { prisma } from '../lib/prisma';

export const findActiveRooms = async () => {
  return await prisma.room.findMany({
    where: { isActive: true },
    include: {
      property: {
        include: {
          media: {
            orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }],
            take: 1,
          },
        },
      },
    },
  });
};

// Détail d'une chambre : pas de take:1 ici, on veut TOUTES les images pour
// la galerie de la page de détail.
export const findRoomById = async (id: string) => {
  return await prisma.room.findUnique({
    where: { id },
    include: {
      property: {
        include: {
          media: {
            orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }],
          },
        },
      },
    },
  });
};
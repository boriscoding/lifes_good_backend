import { prisma } from '../lib/prisma';

export const findActiveApartments = async () => {
  return await prisma.apartment.findMany({
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

export const findApartmentById = async (id: string) => {
  return await prisma.apartment.findUnique({
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
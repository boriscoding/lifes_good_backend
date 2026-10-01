import { prisma } from '../lib/prisma';

export const findActiveOffices = async () => {
  return await prisma.office.findMany({
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

export const findOfficeById = async (id: string) => {
  return await prisma.office.findUnique({
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

import { prisma } from '../config/database';

export const paymentMethodService = {
  async list() {
    return prisma.paymentMethodConfig.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  },

  async toggle(id: string) {
    const method = await prisma.paymentMethodConfig.findUnique({
      where: { id },
    });

    if (!method) {
      throw new Error('Methode non trouvee');
    }

    return prisma.paymentMethodConfig.update({
      where: { id },
      data: {
        isActive: !method.isActive,
      },
    });
  },
};


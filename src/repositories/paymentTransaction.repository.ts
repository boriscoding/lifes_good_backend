
import { prisma } from '../config/database';
import { IPaymentTransactionRepository } from './interfaces/IPaymentTransactionRepository';

export const paymentTransactionRepository: IPaymentTransactionRepository = {
  async findById(id: string) {
    return prisma.paymentTransaction.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.paymentTransaction.create({
      data,
    });
  },

  async update(id, data) {
    const transaction = await prisma.paymentTransaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return null;
    }

    return prisma.paymentTransaction.update({
      where: { id },
      data,
    });
  },
};


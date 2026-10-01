
import { prisma } from '../config/database';

export const statisticsService = {
  async getDashboardStats(query?: {
    period?: string;
    startDate?: Date | string;
    endDate?: Date | string;
  }) {
    const totalBookings = await prisma.booking.count();

    const revenueResult = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'completed',
      },
    });

    const totalRevenue = Number(revenueResult._sum.amount ?? 0);

    const totalProperties = await prisma.property.count({
      where: {
        isActive: true,
      },
    });

    return {
      totalBookings,
      totalRevenue,
      totalProperties,
      occupancyRate: 0, // TODO: Calculer
    };
  },

  async getRevenueReport(query?: {
    period?: string;
    startDate?: Date | string;
    endDate?: Date | string;
  }) {
    // TODO: Rapport detaille par periode
    return {
      periods: [],
      total: 0,
    };
  },

  async getOccupancyRate(query?: {
    period?: string;
    startDate?: Date | string;
    endDate?: Date | string;
  }) {
    // TODO: Calculer le taux d'occupation

    return {
      rate: 0,
      period: query?.period || 'month',
    };
  },
};


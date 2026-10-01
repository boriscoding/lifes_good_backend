import { Request, Response, NextFunction } from 'express';
import { statisticsService } from '../services/statistics.service';
import { ApiResponse } from '../types/controllers.types';

export const getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await statisticsService.getDashboardStats(req.query);
    const response: ApiResponse = { success: true, message: 'Statistiques', data: stats };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getRevenueReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const report = await statisticsService.getRevenueReport(req.query);
    const response: ApiResponse = { success: true, message: 'Rapport de revenus', data: report };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getOccupancyRate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rate = await statisticsService.getOccupancyRate(req.query);
    const response: ApiResponse = { success: true, message: 'Taux d\'occupation', data: rate };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
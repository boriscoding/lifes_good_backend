import { Request, Response, NextFunction } from 'express';
import { bookingRepository } from '../repositories/booking.repository';
import { ApiResponse } from '../types/controllers.types';

export const preventSurbooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { propertyId, startDate, endDate } = req.body;
    if (!propertyId || !startDate || !endDate) {
      next();
      return;
    }

    const isAvailable = await bookingRepository.checkAvailability(propertyId, new Date(startDate), new Date(endDate));
    if (!isAvailable) {
      const response: ApiResponse = { success: false, message: 'Ce bien n\'est pas disponible sur cette periode.' };
      res.status(409).json(response);
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
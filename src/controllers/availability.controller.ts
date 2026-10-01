import { Request, Response, NextFunction } from 'express';
import { availabilityService } from '../services/availability.service';
import { ApiResponse } from '../types/controllers.types';

export const checkAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await availabilityService.check(req.query);
    const response: ApiResponse = { success: true, message: 'Disponibilite verifiee', data: result };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getOccupancyCalendar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const calendar = await availabilityService.getCalendar(req.params.propertyId, req.query);
    const response: ApiResponse = { success: true, message: 'Calendrier d\'occupation', data: calendar };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
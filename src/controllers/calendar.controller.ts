import { Request, Response, NextFunction } from 'express';
import { calendarService } from '../services/calendar.service';
import { ApiResponse } from '../types/controllers.types';

export const blockDates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const block = await calendarService.block(req.body);
    const response: ApiResponse = { success: true, message: 'Dates bloquees', data: block };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const unblockDates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await calendarService.unblock(req.params.blockId);
    const response: ApiResponse = { success: true, message: 'Dates debloquees' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const listBlockedDates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blocks = await calendarService.list(req.query);
    const response: ApiResponse = { success: true, message: 'Liste des blocages', data: blocks };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from 'express';
import { whatsappService } from '../services/whatsapp.service';
import { ApiResponse } from '../types/controllers.types';

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await whatsappService.sendMessage(req.body);
    const response: ApiResponse = { success: true, message: 'Message envoye', data: result };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const sendTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await whatsappService.sendTemplate(req.body);
    const response: ApiResponse = { success: true, message: 'Template envoye', data: result };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
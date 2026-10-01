import { Request, Response, NextFunction } from 'express';
import { promotionService } from '../services/promotion.service';
import { ApiResponse } from '../types/controllers.types';

export const createPromotion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const promotion = await promotionService.create(req.body);
    const response: ApiResponse = { success: true, message: 'Promotion creee', data: promotion };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const listPromotions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const promotions = await promotionService.list(req.query);
    const response: ApiResponse = { success: true, message: 'Liste des promotions', data: promotions };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const validatePromotion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await promotionService.validateCode(req.body.code, req.body.bookingAmount);
    const response: ApiResponse = { success: true, message: 'Promotion validee', data: result };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deletePromotion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await promotionService.delete(req.params.id);
    const response: ApiResponse = { success: true, message: 'Promotion supprimee' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
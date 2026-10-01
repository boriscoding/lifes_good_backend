import { Request, Response, NextFunction } from 'express';
import { promotionService } from '../services/promotion.service';
import { ApiResponse } from '../types/controllers.types';

export const validatePromotion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.body.promotionCode) {
      next();
      return;
    }

    const promotion = await promotionService.validateCode(req.body.promotionCode, req.body.totalAmount);
    if (!promotion.valid) {
      const response: ApiResponse = { success: false, message: 'Code promotionnel invalide ou expire' };
      res.status(400).json(response);
      return;
    }

    req.body.promotionDiscount = promotion.discount;
    next();
  } catch (error) {
    next(error);
  }
};
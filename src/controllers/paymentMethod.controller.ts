import { Request, Response, NextFunction } from 'express';
import { paymentMethodService } from '../services/paymentMethod.service';
import { ApiResponse } from '../types/controllers.types';

export const listPaymentMethods = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const methods = await paymentMethodService.list();
    const response: ApiResponse = { success: true, message: 'Methodes de paiement', data: methods };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const togglePaymentMethod = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const method = await paymentMethodService.toggle(req.params.id);
    const response: ApiResponse = { success: true, message: 'Methode mise a jour', data: method };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
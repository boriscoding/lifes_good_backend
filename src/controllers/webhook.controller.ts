import { Request, Response, NextFunction } from 'express';
import { paymentAggregatorService } from '../services/paymentAggregator.service';
import { ApiResponse } from '../types/controllers.types';

export const handlePaymentWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await paymentAggregatorService.handleWebhook(req.body, req.headers);
    const response: ApiResponse = { success: true, message: 'Webhook traite' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
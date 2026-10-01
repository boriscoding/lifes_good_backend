import { Request, Response, NextFunction } from 'express';
import { paymentAggregatorService } from '../services/paymentAggregator.service';
import { ApiResponse } from '../types/controllers.types';

export const initiateAggregatorPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await paymentAggregatorService.initiate(req.body);
    const response: ApiResponse = { success: true, message: 'Paiement agrégateur initie', data: result };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const checkAggregatorStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await paymentAggregatorService.checkStatus(req.params.reference);
    const response: ApiResponse = { success: true, message: 'Statut agrégateur', data: result };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
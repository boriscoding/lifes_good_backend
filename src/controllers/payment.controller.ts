import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payment.service';
import { ApiResponse } from '../types/controllers.types';

export const initiatePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payment = await paymentService.initiate(req.body);
    const response: ApiResponse = { success: true, message: 'Paiement initie', data: payment };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await paymentService.verify(req.body);
    const response: ApiResponse = { success: true, message: 'Paiement verifie', data: result };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getPaymentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payment = await paymentService.getStatus(req.params.id);
    const response: ApiResponse = { success: true, message: 'Statut du paiement', data: payment };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// GET /payments — liste paginee, utilisee par le tableau de bord admin.
// Query params optionnels : page, limit, bookingId, status, method, type...
export const listPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await paymentService.list(req.query as any);
    const response: ApiResponse = { success: true, message: 'Liste des paiements', data: result.data, meta: result.meta };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const refundPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refund = await paymentService.refund(req.body);
    const response: ApiResponse = { success: true, message: 'Remboursement effectue', data: refund };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
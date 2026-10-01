import { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/document.service';
import { ApiResponse } from '../types/controllers.types';

export const generateInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pdf = await documentService.generateInvoice(req.params.bookingId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=facture.pdf');
    res.send(pdf);
  } catch (error) {
    next(error);
  }
};

export const generateReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pdf = await documentService.generateReceipt(req.params.paymentId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recu.pdf');
    res.send(pdf);
  } catch (error) {
    next(error);
  }
};

export const generateContract = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pdf = await documentService.generateContract(req.params.contractId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=contrat.pdf');
    res.send(pdf);
  } catch (error) {
    next(error);
  }
};
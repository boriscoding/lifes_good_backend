import { Request, Response, NextFunction } from 'express';
import { invoiceService } from '../services/invoice.service';
import { ApiResponse } from '../types/controllers.types';

// Nom réaligné avec la route : getInvoiceById
export const getInvoiceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoice = await invoiceService.findById(req.params.id);
    const response: ApiResponse = { success: true, message: 'Facture récupérée', data: invoice };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// GET /invoices — liste paginée des factures de l'utilisateur connecté
export const listInvoices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Non authentifié' } as ApiResponse);
      return;
    }

    const result = await invoiceService.list({ ...(req.query as any), userId });
    const response: ApiResponse = { success: true, message: 'Liste des factures', data: result.data, meta: result.meta };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Nom réaligné avec la route : markAsPaid
export const markAsPaid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoice = await invoiceService.markPaid(req.params.id);
    const response: ApiResponse = { success: true, message: 'Facture marquée payée', data: invoice };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const cancelInvoice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const invoice = await invoiceService.cancel(req.params.id);
    const response: ApiResponse = { success: true, message: 'Facture annulée', data: invoice };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from 'express';
import { manualBookingService } from '../services/manualBooking.service';
import { ApiResponse } from '../types/controllers.types';

export const createManualBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const request = await manualBookingService.create(req.body);
    const response: ApiResponse = { 
      success: true, 
      message: 'Demande de réservation manuelle créée', 
      data: request 
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const listManualBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await manualBookingService.list(req.query);
    const response: ApiResponse = { 
      success: true, 
      message: 'Liste des demandes manuelles', 
      data: result.data, 
      meta: result.meta 
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const approveManualBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await manualBookingService.approve(req.params.id, req.user!.id);
    const response: ApiResponse = { 
      success: true, 
      message: 'Demande approuvée et réservation créée', 
      data: booking 
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const rejectManualBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await manualBookingService.reject(req.params.id, req.body.reason);
    const response: ApiResponse = { 
      success: true, 
      message: 'Demande rejetée' 
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

//  Générer l'ID de confirmation (Admin/Réception)
export const generateConfirmationId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await manualBookingService.generateConfirmationId(id);
    const response: ApiResponse = { 
      success: true, 
      message: 'ID de confirmation généré avec succès', 
      data: result 
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

//  Confirmer par le client (depuis son profil)
export const confirmManualBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { confirmationId } = req.body;
    if (!confirmationId) {
      res.status(400).json({ success: false, message: 'L\'ID de confirmation est requis' });
      return;
    }
    
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Utilisateur non authentifié' });
      return;
    }
    
    const booking = await manualBookingService.confirmManualBooking(confirmationId, userId);
    const response: ApiResponse = { 
      success: true, 
      message: 'Réservation confirmée avec succès',
      data: {
        booking,
        receiptUrl: `/api/v1/bookings/${booking.id}/receipt`
      }
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Récupérer une réservation manuelle par ID
export const getManualBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await manualBookingService.getById(req.params.id);
    const response: ApiResponse = { 
      success: true, 
      message: 'Réservation manuelle récupérée', 
      data: booking 
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
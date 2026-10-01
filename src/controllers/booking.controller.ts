import { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/booking.service';
import { propertyService } from '../services/property.service';
import { whatsappService } from '../services/whatsapp.service';
import { ApiResponse } from '../types/controllers.types';

export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await bookingService.create(req.body);
    const response: ApiResponse = { success: true, message: 'Reservation creee', data: booking };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await bookingService.findById(req.params.id);
    const response: ApiResponse = { success: true, message: 'Reservation recuperee', data: booking };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const listBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await bookingService.list(req.query);
    const response: ApiResponse = { success: true, message: 'Liste des reservations', data: result.data, meta: result.meta };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await bookingService.cancel(req.params.id, req.body.reason);
    const response: ApiResponse = { success: true, message: 'Reservation annulee', data: booking };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

//  Récupérer le lien WhatsApp pour un bien
export const getWhatsAppReservationLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const property = await propertyService.findById(req.params.propertyId);
    if (!property) {
      res.status(404).json({ success: false, message: 'Bien non trouvé' });
      return;
    }
    
    const receptionPhone = process.env.WHATSAPP_RECEPTION_PHONE || '';
    if (!receptionPhone) {
      res.status(500).json({ success: false, message: 'Numéro de réception non configuré' });
      return;
    }
    
   
    const price = (property as any).pricePerDay || (property as any).basePrice || (property as any).price || 0;
    
    const link = await whatsappService.getReservationWhatsAppLink(
      property.id,
      {
        name: property.name,
        type: property.type || 'Bien',
        price: price,
        description: (property as any).description
      },
      receptionPhone
    );
    
    const response: ApiResponse = { 
      success: true, 
      message: 'Lien WhatsApp généré avec succès',
      data: { 
        link, 
        propertyId: property.id,
        propertyName: property.name
      } 
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Télécharger le reçu d'une réservation
export const downloadReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await bookingService.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ success: false, message: 'Réservation non trouvée' });
      return;
    }
    
    //  Vérifier le rôle correctement avec type assertion
    const user = req.user as any;
    const userRole = user?.role || user?.roleId || user?.roleName || user?.role?.name;
    const isAdmin = userRole === 'admin' || userRole === 'super_admin' || userRole === 'manager';
    
    if (user?.id !== booking.userId && !isAdmin) {
      res.status(403).json({ success: false, message: 'Accès non autorisé' });
      return;
    }
    
    // TODO: Générer le PDF du reçu
    const receiptUrl = `/api/v1/documents/receipt/${booking.id}`;
    
    const response: ApiResponse = { 
      success: true, 
      message: 'Reçu disponible',
      data: { receiptUrl }
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
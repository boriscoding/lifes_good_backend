import { Request, Response, NextFunction } from 'express';
import { fileUploadService } from '../services/fileUpload.service';
import { mediaService } from '../services/media.service';
import { ApiResponse } from '../types/controllers.types';

export const uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      const response: ApiResponse = { success: false, message: 'Aucun fichier fourni' };
      res.status(400).json(response);
      return;
    }
    const result = await fileUploadService.uploadImage(req.file, req.body.propertyId);
    const response: ApiResponse = { success: true, message: 'Image televersee', data: result };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const uploadDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      const response: ApiResponse = { success: false, message: 'Aucun fichier fourni' };
      res.status(400).json(response);
      return;
    }
    const result = await fileUploadService.uploadDocument(req.file, req.body.bookingId);
    const response: ApiResponse = { success: true, message: 'Document televerse', data: result };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// Liste les medias d'un bien : GET /api/v1/media?propertyId=xxx
export const listMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const propertyId = req.query.propertyId as string;
    if (!propertyId) {
      const response: ApiResponse = { success: false, message: 'propertyId requis' };
      res.status(400).json(response);
      return;
    }
    const media = await mediaService.listByProperty(propertyId);
    const response: ApiResponse = { success: true, message: 'Medias recuperes', data: media };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Supprime un media : DELETE /api/v1/media/:id
export const deleteMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await mediaService.delete(req.params.id);
    const response: ApiResponse = { success: true, message: 'Media supprime' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
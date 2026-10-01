import { Request, Response, NextFunction } from 'express';
import { amenityService } from '../services/amenity.service';
import { ApiResponse } from '../types/controllers.types';

export const createAmenity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const amenity = await amenityService.create(req.body);
    const response: ApiResponse = { success: true, message: 'Equipement cree', data: amenity };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const listAmenities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const amenities = await amenityService.list(req.query);
    const response: ApiResponse = { success: true, message: 'Liste des equipements', data: amenities };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateAmenity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const amenity = await amenityService.update(req.params.id, req.body);
    const response: ApiResponse = { success: true, message: 'Equipement mis a jour', data: amenity };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteAmenity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await amenityService.delete(req.params.id);
    const response: ApiResponse = { success: true, message: 'Equipement supprime' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
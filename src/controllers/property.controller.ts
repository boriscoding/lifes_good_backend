import { Request, Response, NextFunction } from 'express';
import { propertyService } from '../services/property.service';
import { ApiResponse } from '../types/controllers.types';

export const createProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const property = await propertyService.create(req.body);
    const response: ApiResponse = { success: true, message: 'Propriete creee', data: property };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const listProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await propertyService.list(req.query);
    const response: ApiResponse = { success: true, message: 'Liste des proprietes', data: result.data, meta: result.meta };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const property = await propertyService.findById(req.params.id);
    const response: ApiResponse = { success: true, message: 'Propriete recuperee', data: property };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const property = await propertyService.update(req.params.id, req.body);
    const response: ApiResponse = { success: true, message: 'Propriete mise a jour', data: property };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await propertyService.delete(req.params.id);
    const response: ApiResponse = { success: true, message: 'Propriete supprimee' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
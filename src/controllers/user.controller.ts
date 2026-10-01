import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { ApiResponse } from '../types/controllers.types';

// GET /users/me — recupere le profil de l'utilisateur connecte
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Non authentifie' } as ApiResponse);
      return;
    }

    const user = await userService.findById(userId);
    const response: ApiResponse = { success: true, message: 'Profil recupere', data: user };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// PATCH /users/me — met a jour le profil de l'utilisateur connecte
// (firstName, lastName, email, phone uniquement — voir user.validation.ts)
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Non authentifie' } as ApiResponse);
      return;
    }

    const user = await userService.updateProfile(userId, req.body);
    const response: ApiResponse = { success: true, message: 'Profil mis a jour avec succes', data: user };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
// GET /users — Récupère tous les utilisateurs (avec pagination, filtres, recherche)
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await userService.listUsers(req.query as any);

    const response: ApiResponse = {
      success: true,
      message: 'Liste des utilisateurs récupérée avec succès',
      data: result, // Contient { data: User[], total, page, limit }
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
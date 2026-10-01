import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { ApiResponse } from '../types/controllers.types';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await authService.register(req.body);
    const response: ApiResponse = { success: true, message: 'Inscription reussie', data: user };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tokens = await authService.login(req.body.email, req.body.password);
    const response: ApiResponse = { success: true, message: 'Connexion reussie', data: tokens };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tokens = await authService.refreshToken(req.body.refreshToken);
    const response: ApiResponse = { success: true, message: 'Token rafraichi', data: tokens };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authService.logout(req.body.refreshToken);
    const response: ApiResponse = { success: true, message: 'Deconnexion reussie' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Le typage de req.user est deja fourni globalement par le projet
// (declaration Express.Request.user avec id/email/roleId/firstName/lastName) —
// pas besoin d'un type AuthenticatedRequest personnalise, `Request` suffit.
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Non authentifie' } as ApiResponse);
      return;
    }

    const { currentPassword, newPassword } = req.body;

    await authService.changePassword(userId, currentPassword, newPassword);

    const response: ApiResponse = { success: true, message: 'Mot de passe mis a jour avec succes' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
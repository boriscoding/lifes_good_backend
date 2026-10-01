import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import { verifyAccessToken } from '../utils/generateToken';
import { userRepository } from '../repositories/user.repository';
import { ApiResponse } from '../types/controllers.types';

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, 'password'>;
}

// Middleware d'authentification par JWT
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = { success: false, message: 'Token manquant' };
      res.status(401).json(response);
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token) as { userId: string };

    const user = await userRepository.findById(decoded.userId);

    if (!user || !user.isActive) {
      const response: ApiResponse = {
        success: false,
        message: 'Utilisateur non trouvé ou inactif',
      };
      res.status(401).json(response);
      return;
    }

    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    next();
  } catch (error) {
    const response: ApiResponse = { success: false, message: 'Token invalide ou expiré' };
    res.status(401).json(response);
  }
};

// Middleware pour vérifier les rôles autorisés
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Accès refusé : vous n'avez pas les droits nécessaires.",
      });
    }
    
    next();
  };
};
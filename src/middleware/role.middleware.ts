import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/controllers.types';

// ✅ Définition des rôles acceptés
export type UserRole = 'admin' | 'manager' | 'reception' | 'client' | 'super_admin';

export const authorize = (roles: UserRole | UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const user = req.user as any;
      
      if (!user) {
        const response: ApiResponse = { success: false, message: 'Utilisateur non authentifié' };
        res.status(401).json(response);
        return;
      }

      // Récupérer le rôle de l'utilisateur
      const userRole = user.role || user.roleId || user.roleName || user.role?.name;
      
      // Si l'utilisateur est super_admin, il a accès à tout
      if (userRole === 'super_admin') {
        next();
        return;
      }

      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      
      if (!allowedRoles.includes(userRole)) {
        const response: ApiResponse = { 
          success: false, 
          message: `Accès refusé. Rôle requis: ${allowedRoles.join(', ')}` 
        };
        res.status(403).json(response);
        return;
      }

      next();
    } catch (error) {
      const response: ApiResponse = { success: false, message: 'Erreur d\'autorisation' };
      res.status(500).json(response);
    }
  };
};


export const authorizeAdmin = authorize(['admin', 'super_admin']);
export const authorizeManager = authorize(['admin', 'manager', 'super_admin']);
export const authorizeReception = authorize(['admin', 'manager', 'reception', 'super_admin']);
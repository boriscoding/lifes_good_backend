import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';
import { ApiResponse } from '../types/controllers.types';

export const listNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notifications = await notificationService.list(req.user!.id, req.query);
    const response: ApiResponse = { success: true, message: 'Notifications', data: notifications };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await notificationService.markAsRead(req.params.id);
    const response: ApiResponse = { success: true, message: 'Notification lue' };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
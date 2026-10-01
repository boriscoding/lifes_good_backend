import { Request, Response } from 'express';
import * as roomService from '../services/room.service';

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.getFormattedActiveRooms();
    res.json(rooms);
  } catch (error) {
    console.error('Erreur getRooms:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des chambres' });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await roomService.getFormattedRoomById(req.params.id);
    if (!room) {
      res.status(404).json({ message: 'Chambre non trouvée' });
      return;
    }
    res.json(room);
  } catch (error) {
    console.error('Erreur getRoomById:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la chambre' });
  }
};
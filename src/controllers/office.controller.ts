import { Request, Response } from 'express';
import * as officeService from '../services/office.service';

export const getOffices = async (req: Request, res: Response) => {
  try {
    const formattedOffices = await officeService.getFormattedActiveOffices();
    return res.status(200).json(formattedOffices);
  } catch (error) {
    console.error('Erreur lors de la récupération des bureaux:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des bureaux.' });
  }
};

export const getOfficeById = async (req: Request, res: Response) => {
  try {
    const office = await officeService.getFormattedOfficeById(req.params.id);
    if (!office) {
      return res.status(404).json({ message: 'Bureau non trouvé' });
    }
    return res.status(200).json(office);
  } catch (error) {
    console.error('Erreur lors de la récupération du bureau:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération du bureau.' });
  }
};
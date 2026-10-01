import { Request, Response } from 'express';
import * as apartmentService from '../services/apartment.service';

export const getApartments = async (req: Request, res: Response) => {
  try {
    const formattedApartments = await apartmentService.getFormattedActiveApartments();
    return res.status(200).json(formattedApartments);
  } catch (error) {
    console.error('Erreur lors de la récupération des appartements:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des appartements.' });
  }
};

export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await apartmentService.getFormattedApartmentById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: 'Appartement non trouvé' });
    }
    return res.status(200).json(apartment);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'appartement:', error);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'appartement.' });
  }
};
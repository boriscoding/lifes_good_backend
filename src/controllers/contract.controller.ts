import { Request, Response } from 'express';
import { contactService } from '../services/contract.service';

export const sendContactMessage = async (req: Request, res: Response) => {
  const { nom, email, telephone, message } = req.body;

  if (!nom || !email || !message) {
    res.status(400).json({ message: 'Nom, email et message sont requis.' });
    return;
  }

  try {
    await contactService.send({ nom, email, telephone, message });
    res.status(200).json({ success: true, message: 'Message envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur envoi message de contact:', error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
};
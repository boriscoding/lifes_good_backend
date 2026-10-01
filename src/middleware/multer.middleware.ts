import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '../types/controllers.types';
import { Request, Response } from 'express';

// Chemins ABSOLUS (indépendants du dossier depuis lequel `node`/`ts-node`
// est lancé) — c'était la cause de l'erreur ENOENT initiale : un chemin
// relatif 'uploads/properties/' pointe vers un endroit différent selon le
// cwd du process.
export const UPLOADS_ROOT = path.join(process.cwd(), 'uploads');
const PROPERTIES_DIR = path.join(UPLOADS_ROOT, 'properties');
const DOCUMENTS_DIR = path.join(UPLOADS_ROOT, 'identity-documents');

// Création automatique des dossiers de destination au chargement de ce
// module. Plus besoin de les créer à la main.
[PROPERTIES_DIR, DOCUMENTS_DIR].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith('image/') ? PROPERTIES_DIR : DOCUMENTS_DIR;
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedImages = ['image/jpeg', 'image/png', 'image/webp'];
  const allowedDocs = ['application/pdf', 'image/jpeg', 'image/png'];
  const allowed = [...allowedImages, ...allowedDocs];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporte. Utilisez JPEG, PNG, WEBP ou PDF.'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const handleMulterError = (err: any, req: Request, res: Response, next: any) => {
  if (err instanceof multer.MulterError) {
    const response: ApiResponse = { success: false, message: `Erreur upload : ${err.message}` };
    res.status(400).json(response);
  } else if (err) {
    const response: ApiResponse = { success: false, message: err.message };
    res.status(400).json(response);
  } else {
    next();
  }
};
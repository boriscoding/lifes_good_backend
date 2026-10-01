import fs from 'fs';
import path from 'path';

import { prisma } from '../config/database';
import { MediaType, IdentityDocumentType } from '../generated/prisma/client';
import { optimizeImage } from '../utils/imageOptimizer';
import { UPLOADS_ROOT } from '../middleware/multer.middleware';

interface UploadFile {
  buffer?: Buffer;
  path: string;
  originalname: string;
}

/**
 * Convertit un chemin disque absolu (ex: C:\...\uploads\properties\x.png,
 * ou /var/www/.../uploads/properties/x.png) en URL web relative servable
 * par Express (ex: /uploads/properties/x.png). Sans cette conversion, le
 * champ `url` stocké en base pointe vers un chemin du système de fichiers,
 * pas une adresse que le navigateur peut charger dans une balise <img>.
 */
function toPublicUrl(absolutePath: string): string {
  const relative = path.relative(UPLOADS_ROOT, absolutePath).split(path.sep).join('/');
  return `/uploads/${relative}`;
}

export const fileUploadService = {
  async uploadImage(
    file: UploadFile,
    propertyId: string,
  ) {
    const fileBuffer = file.buffer ?? fs.readFileSync(file.path);

    await optimizeImage(fileBuffer);

    // TODO: Uploader vers S3 ou stocker localement

    const url = toPublicUrl(file.path);

    return prisma.media.create({
      data: {
        propertyId,
        url,
        type: MediaType.image,
        title: file.originalname,
      },
    });
  },

  async uploadDocument(
    file: UploadFile,
    bookingId: string,
  ) {
    const url = toPublicUrl(file.path);

    return prisma.identityDocument.create({
      data: {
        bookingId,
        fileUrl: url,
        type: IdentityDocumentType.other,
        uploadedAt: new Date(),
      },
    });
  },
};
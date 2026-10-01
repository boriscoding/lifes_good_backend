import { Router } from 'express';
import * as mediaController from '../../controllers/media.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { upload, handleMulterError } from '../../middleware/multer.middleware';

const router = Router();

router.post('/image', authenticate, upload.single('file'), handleMulterError, mediaController.uploadImage);
router.post('/document', authenticate, upload.single('file'), handleMulterError, mediaController.uploadDocument);
router.get('/', authenticate, mediaController.listMedia);
router.delete('/:id', authenticate, mediaController.deleteMedia);

export default router;
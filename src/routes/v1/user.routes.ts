import { Router } from 'express';
import * as userController from '../../controllers/user.controller';
import { validate } from '../../middleware/validation.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { updateProfileSchema, listUsersSchema } from '../../validations/user.validation';

const router = Router();
// Route pour lister les utilisateurs (protégée et validée)
router.get('/', authenticate, validate(listUsersSchema), userController.getAllUsers);
router.get('/me', authenticate, userController.getMe);
router.patch('/me', authenticate, validate(updateProfileSchema), userController.updateProfile);

export default router;
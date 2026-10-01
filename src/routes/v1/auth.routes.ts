    import { Router } from 'express';
    import * as authController from '../../controllers/auth.controller';
    import { validate } from '../../middleware/validation.middleware';
    import { authenticate } from '../../middleware/auth.middleware'; // Adaptez le chemin/le nom si votre middleware d'auth s'appelle differemment
    import {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    changePasswordSchema,
    } from '../../validations/auth.validation';

    const router = Router();

    router.post('/register', validate(registerSchema), authController.register);
    router.post('/login', validate(loginSchema), authController.login);
    router.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);
    router.post('/logout', authController.logout);

    // Route protegee : necessite un utilisateur authentifie (req.user peuple par `authenticate`)
    router.post(
    '/change-password',
    authenticate,
    validate(changePasswordSchema),
    authController.changePassword,
    );

    export default router;
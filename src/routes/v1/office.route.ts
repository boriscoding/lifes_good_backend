import { Router } from 'express';
import { getOffices, getOfficeById } from '../../controllers/office.controller';

const router = Router();

router.get('/', getOffices);
router.get('/:id', getOfficeById);

export default router;
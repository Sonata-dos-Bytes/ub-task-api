import { Router } from 'express';
import eadUbRouter from './ub/ead.ub.route.js';

const router = Router();

router.use('/ub', eadUbRouter);

export default router;

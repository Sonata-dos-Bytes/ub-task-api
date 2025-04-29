import { Router, Request, Response, NextFunction } from 'express';
import { getProfile } from '../../controllers/ead.ub.controller'; // Adjust the path as needed

const router = Router();

router.post('/ead-ub/profile', (req: Request, res: Response, next: NextFunction) => {
  getProfile(req, res, next).catch(next);
});

export default router;

import { Router, Request, Response, NextFunction } from 'express';
import { getProfile, getTasks } from '../../controllers/ead.ub.controller'; // Adjust the path as needed

const router = Router();

router.post('/ead-ub/profile', (req: Request, res: Response, next: NextFunction) => {
  getProfile(req, res, next).catch(next);
});

router.post('/ead-ub/tasks', (req: Request, res: Response, next: NextFunction) => {
  getTasks(req, res, next).catch(next);
});

export default router;

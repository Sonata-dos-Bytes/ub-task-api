import { Router, Request, Response } from 'express';

const router = Router();

router.get('/ead-ub', (req: Request, res: Response) => {
  res.send('Hello from EAD UB Route!');
});

export default router;

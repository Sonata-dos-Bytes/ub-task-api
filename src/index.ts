import express from 'express';

import { PORT } from './config';
import { setupServer } from './config/server';

import appRouter from './routes/app.route';
import ubRouter from './routes/ub.route';
import { errorHandler } from '@errors/errorHandler';

const app = express();

setupServer(app);

app.use(appRouter);
app.use(ubRouter);
app.use((req, res) => {
  res.status(404).json({ status: false, message: 'Not Found' });
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

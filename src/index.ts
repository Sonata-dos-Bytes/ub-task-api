import express from 'express';

import { PORT } from './config';
import { setupServer } from './config/server';

import appRouter from './routes/app.route';
import ubRouter from './routes/ub.route';

const app = express();

setupServer(app);

app.use(appRouter);
app.use(ubRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

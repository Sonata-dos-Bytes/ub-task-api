import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appRouter from './routes/app.route';
import ubRouter from './routes/ub.route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));

app.use(appRouter);
app.use(ubRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

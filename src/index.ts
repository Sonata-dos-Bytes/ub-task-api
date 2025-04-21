import express, { Application, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

// Carrega o .env antes de qualquer coisa
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Configura CORS de acordo com a env
app.use(
    cors({
        origin: CORS_ORIGIN,
    })
);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
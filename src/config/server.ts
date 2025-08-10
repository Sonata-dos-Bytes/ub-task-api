import express, { Application } from 'express';
import cors from 'cors';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { corsOptions } from './cors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function setupServer(app: Application) {
  app.use(cors(corsOptions));
  app.use(express.static(join(__dirname, '../static')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

import { CorsOptions } from 'cors';
import { CORS_ORIGIN } from './';

export const corsOptions: CorsOptions = {
  origin: CORS_ORIGIN,
  optionsSuccessStatus: 200
};

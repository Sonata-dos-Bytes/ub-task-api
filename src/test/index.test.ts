import { UBProfile } from '../types/eadUB';
import { EADUbHandler } from '../drivers/EADUBHandler';
import dotenv from 'dotenv';

dotenv.config();
const { LOGIN_TEST, PASSWORD_TEST } = process.env;
if (!LOGIN_TEST || !PASSWORD_TEST) {
  throw new Error('Environment variables LOGIN_TEST and PASSWORD_TEST must be defined.');
}

const handler = new EADUbHandler();

export async function fetchUbProfile(
  login: string,
  password: string
): Promise<UBProfile> {
  return handler.getProfile(login, password);
}

export async function fetchUbTasks(
  login: string,
  password: string
): Promise<any> {
  return handler.getTasks(login, password);
}

export async function fetchUbMatters(
  login: string,
  password: string
): Promise<any> {
  return handler.getMatters(login, password);
}

// fetchUbProfile(LOGIN_TEST, PASSWORD_TEST);
// fetchUbTasks(LOGIN_TEST, PASSWORD_TEST);
fetchUbMatters(LOGIN_TEST, PASSWORD_TEST);
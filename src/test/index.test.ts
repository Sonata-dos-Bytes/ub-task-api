import { UBProfile } from '../types/eadUb';
import { EADUbHandler } from '../drivers/EADUbHandler';
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

// fetchUbProfile(LOGIN_TEST, PASSWORD_TEST);
fetchUbTasks(LOGIN_TEST, PASSWORD_TEST);
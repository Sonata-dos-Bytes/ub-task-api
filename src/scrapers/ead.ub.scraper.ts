import { UBProfile, UBTask } from '../types/eadUb';
import { EADUbHandler } from '../drivers/EADUbHandler';

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
): Promise<UBTask[]> {
  return handler.getTasks(login, password);
}

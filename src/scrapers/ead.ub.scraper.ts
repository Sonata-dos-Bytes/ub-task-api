import { UBProfile } from '../types/eadUb';
import { EADUbHandler } from '../drivers/EADUbHandler';

const handler = new EADUbHandler();

export async function fetchUbProfile(
  login: string,
  password: string
): Promise<UBProfile> {
  return handler.getProfile(login, password);
}

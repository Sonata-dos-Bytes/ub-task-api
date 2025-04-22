import { EADUbHandler } from '../drivers/EADUbHandler';

const handler = new EADUbHandler();

export async function fetchUbProfile(
  login: string,
  password: string
): Promise<any> {
  return handler.getProfile(login, password);
}

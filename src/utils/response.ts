import { ApiResponse } from '../types/apiResponse';

/**
 * Monta uma resposta de sucesso
 * @param data - dados do payload
 * @param message - mensagem opcional
 */
export function success<T>(message = 'Success', data?: T): ApiResponse<T> {
  return {
    status: true,
    message,
    data,
  };
}

/**
 * Monta uma resposta de erro
 * @param message - mensagem do erro
 * @param error - descrição interna do erro
 */
export function failure(message: string, errors?: string[]): ApiResponse<null> {
  return {
    status: false,
    message,
    data: null,
    errors,
  };
}

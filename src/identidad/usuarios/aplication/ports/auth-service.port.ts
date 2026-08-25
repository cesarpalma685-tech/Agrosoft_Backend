export interface IAuthServicePort {
  generateToken(payload: { id: number | string; email: string }): string;
}
export const AUTH_SERVICE_PORT = 'AUTH_SERVICE_PORT';
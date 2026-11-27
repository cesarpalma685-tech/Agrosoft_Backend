export class EmailCode {
  constructor(
    public readonly id: number | null,
    public usuarioId: number,
    public tipo: string,
    public code: string,
    public expiresAt: Date,
    public usedAt?: Date,
    public readonly createdAt?: Date,
    // Intentos fallidos al verificar (aplica a los códigos cortos)
    public intentos: number = 0,
  ) {}
}

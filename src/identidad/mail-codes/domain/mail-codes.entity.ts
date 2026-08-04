export class EmailCode {
  constructor(
    public readonly id: number | null,
    public usuarioId: number,
    public tipo: string,
    public code: string,
    public expiresAt: Date,
    public usedAt?: Date,
    public readonly createdAt?: Date,
  ) {}
}
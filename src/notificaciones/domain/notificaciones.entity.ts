export class Notificacion {
  constructor(
    public readonly id: number | null,
    public usuarioId: number,
    public titulo: string,
    public mensaje: string,
    public leida: boolean = false,
    public tipo?: string,
    public metadata?: Record<string, any>,
    public readonly createdAt?: Date,
  ) {}

  marcarComoLeida(): void {
    this.leida = true;
  }
}

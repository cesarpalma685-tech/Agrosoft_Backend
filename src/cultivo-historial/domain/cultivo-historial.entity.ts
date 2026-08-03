export class CultivoHistorial {
  private constructor(
    public readonly id: number | undefined,
    public readonly cultivoId: number,
    public readonly usuarioId: number | null,
    public readonly motivo: string | null,
    public readonly cambios: Record<string, unknown> | null,
  ) {}

  static create(params: {
    id?: number;
    cultivoId: number;
    usuarioId?: number | null;
    motivo?: string | null;
    cambios?: Record<string, unknown> | null;
  }): CultivoHistorial {
    if (!params.cultivoId) {
      throw new Error('El historial requiere un cultivo asociado');
    }
    return new CultivoHistorial(
      params.id,
      params.cultivoId,
      params.usuarioId ?? null,
      params.motivo ?? null,
      params.cambios ?? null,
    );
  }
}
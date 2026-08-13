export class MovimientoProduccion {
  private constructor(
    public readonly id: number | undefined,
    public readonly loteProduccionId: number,
    public readonly tipo: string,
    public readonly cantidadKg: number,
    public readonly costoUnitarioKg: number | null,
    public readonly costoTotal: number | null,
    public readonly ventaId: number | null,
    public readonly descripcion: string | null,
    public readonly usuarioId: number | null,
    public readonly fecha: Date,
  ) {}

  static create(params: {
    id?: number;
    loteProduccionId: number;
    tipo: string;
    cantidadKg: number;
    costoUnitarioKg?: number | null;
    costoTotal?: number | null;
    ventaId?: number | null;
    descripcion?: string | null;
    usuarioId?: number | null;
    fecha?: Date | string;
  }): MovimientoProduccion {
    if (!params.loteProduccionId) {
      throw new Error('El movimiento debe pertenecer a un lote de producción');
    }
    if (!params.tipo?.trim()) {
      throw new Error('El movimiento requiere un tipo (entrada/salida)');
    }
    if (params.cantidadKg == null || params.cantidadKg <= 0) {
      throw new Error('La cantidad en kg debe ser mayor a cero');
    }
    return new MovimientoProduccion(
      params.id,
      params.loteProduccionId,
      params.tipo,
      params.cantidadKg,
      params.costoUnitarioKg ?? null,
      params.costoTotal ?? null,
      params.ventaId ?? null,
      params.descripcion ?? null,
      params.usuarioId ?? null,
      params.fecha ? new Date(params.fecha) : new Date(),
    );
  }
}
export class LoteProduccion {
  private constructor(
    public readonly id: number | undefined,
    public readonly productoAgroId: number | null,
    public readonly cultivoId: number,
    public readonly loteId: number,
    public readonly subLoteId: number | null,
    public readonly actividadCosechaId: number | null,
    public readonly calidad: string | null,
    public readonly cantidadKg: number,
    public readonly stockDisponibleKg: number,
    public readonly costoUnitarioKg: number | null,
    public readonly costoTotal: number | null,
    public readonly precioSugeridoKg: number | null,
  ) {}

  static create(params: {
    id?: number;
    productoAgroId?: number | null;
    cultivoId: number;
    loteId: number;
    subLoteId?: number | null;
    actividadCosechaId?: number | null;
    calidad?: string | null;
    cantidadKg: number;
    stockDisponibleKg?: number;
    costoUnitarioKg?: number | null;
    costoTotal?: number | null;
    precioSugeridoKg?: number | null;
  }): LoteProduccion {
    if (!params.cultivoId) {
      throw new Error('El lote de producción debe pertenecer a un cultivo');
    }
    if (!params.loteId) {
      throw new Error('El lote de producción debe pertenecer a un lote');
    }
    if (params.cantidadKg == null || params.cantidadKg < 0) {
      throw new Error('La cantidad en kg debe ser un número válido');
    }
    return new LoteProduccion(
      params.id,
      params.productoAgroId ?? null,
      params.cultivoId,
      params.loteId,
      params.subLoteId ?? null,
      params.actividadCosechaId ?? null,
      params.calidad ?? null,
      params.cantidadKg,
      params.stockDisponibleKg ?? params.cantidadKg,
      params.costoUnitarioKg ?? null,
      params.costoTotal ?? null,
      params.precioSugeridoKg ?? null,
    );
  }
}
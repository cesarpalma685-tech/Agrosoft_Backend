export class Actividad {
  private constructor(
    public readonly id: number | undefined,
    public readonly nombre: string,
    public readonly tipo: string,
    public readonly subtipo: string | null,
    public readonly loteId: number,
    public readonly subLoteId: number | null,
    public readonly cultivoId: number,
    public readonly fecha: Date,
    public readonly horasActividad: number | null,
    public readonly precioHoraActividad: number | null,
    public readonly costoManoObra: number | null,
    public readonly descripcion: string | null,
    public readonly estado: string,
    public readonly creadoPorUsuarioId: number | null,
    public readonly cantidadPlantas: number | null,
    public readonly kgRecolectados: number | null,
    public readonly productoAgroId: number | null,
  ) {}

  static create(params: {
    id?: number;
    nombre: string;
    tipo: string;
    subtipo?: string | null;
    loteId: number;
    subLoteId?: number | null;
    cultivoId: number;
    fecha: Date | string;
    horasActividad?: number | null;
    precioHoraActividad?: number | null;
    costoManoObra?: number | null;
    descripcion?: string | null;
    estado?: string;
    creadoPorUsuarioId?: number | null;
    cantidadPlantas?: number | null;
    kgRecolectados?: number | null;
    productoAgroId?: number | null;
  }): Actividad {
    if (!params.nombre?.trim()) {
      throw new Error('La actividad requiere un nombre');
    }
    if (!params.tipo?.trim()) {
      throw new Error('La actividad requiere un tipo');
    }
    if (!params.cultivoId) {
      throw new Error('La actividad debe pertenecer a un cultivo');
    }
    if (!params.loteId) {
      throw new Error('La actividad debe pertenecer a un lote');
    }
    return new Actividad(
      params.id,
      params.nombre,
      params.tipo,
      params.subtipo ?? null,
      params.loteId,
      params.subLoteId ?? null,
      params.cultivoId,
      new Date(params.fecha),
      params.horasActividad ?? null,
      params.precioHoraActividad ?? null,
      params.costoManoObra ?? null,
      params.descripcion ?? null,
      params.estado ?? 'pendiente',
      params.creadoPorUsuarioId ?? null,
      params.cantidadPlantas ?? null,
      params.kgRecolectados ?? null,
      params.productoAgroId ?? null,
    );
  }
}
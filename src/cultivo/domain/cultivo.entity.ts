export class Cultivo {
  private constructor(
    public readonly id: number | undefined,
    public readonly nombreCultivo: string,
    public readonly tipoCultivo: string,
    public readonly descripcion: string | null,
    public readonly loteId: number,
    public readonly subloteId: number | null,
    public readonly imgCultivo: string | null,
    public readonly fechaSiembra: Date,
    public readonly fechaFinalizacion: Date | null,
    public readonly costoTotal: number,
    public readonly estado: string,
  ) {}

  static create(params: {
    id?: number;
    nombreCultivo: string;
    tipoCultivo: string;
    descripcion?: string | null;
    loteId: number;
    subloteId?: number | null;
    imgCultivo?: string | null;
    fechaSiembra: Date | string;
    fechaFinalizacion?: Date | string | null;
    costoTotal?: number;
    estado?: string;
  }): Cultivo {
    if (!params.nombreCultivo?.trim()) {
      throw new Error('El cultivo requiere un nombre');
    }
    if (!params.loteId) {
      throw new Error('El cultivo debe pertenecer a un lote');
    }
    return new Cultivo(
      params.id,
      params.nombreCultivo,
      params.tipoCultivo,
      params.descripcion ?? null,
      params.loteId,
      params.subloteId ?? null,
      params.imgCultivo ?? null,
      new Date(params.fechaSiembra),
      params.fechaFinalizacion ? new Date(params.fechaFinalizacion) : null,
      params.costoTotal ?? 0,
      params.estado ?? 'activo',
    );
  }

  finalizar(fecha: Date): Cultivo {
    if (this.estado === 'finalizado') {
      throw new Error('El cultivo ya está finalizado');
    }
    return Cultivo.create({
      id: this.id,
      nombreCultivo: this.nombreCultivo,
      tipoCultivo: this.tipoCultivo,
      descripcion: this.descripcion,
      loteId: this.loteId,
      subloteId: this.subloteId,
      imgCultivo: this.imgCultivo,
      fechaSiembra: this.fechaSiembra,
      fechaFinalizacion: fecha,
      costoTotal: this.costoTotal,
      estado: 'finalizado',
    });
  }
}
export class WikiTipoEpa {
  private constructor(
    public readonly id: number | undefined,
    public readonly nombre: string,
    public readonly descripcion: string | null,
    public readonly tipoEpaEnum: string,
  ) {}

  static create(params: {
    id?: number;
    nombre: string;
    descripcion?: string | null;
    tipoEpaEnum: string;
  }): WikiTipoEpa {
    if (!params.nombre?.trim()) {
      throw new Error('El tipo de EPA requiere un nombre');
    }
    if (!params.tipoEpaEnum?.trim()) {
      throw new Error('El tipo de EPA requiere tipoEpaEnum');
    }
    return new WikiTipoEpa(
      params.id,
      params.nombre,
      params.descripcion ?? null,
      params.tipoEpaEnum,
    );
  }
}
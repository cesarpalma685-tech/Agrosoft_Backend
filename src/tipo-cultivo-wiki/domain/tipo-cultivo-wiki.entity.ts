export class TipoCultivoWiki {
  private constructor(
    public readonly id: number | undefined,
    public readonly nombre: string,
    public readonly descripcion: string | null,
  ) {}

  static create(params: {
    id?: number;
    nombre: string;
    descripcion?: string | null;
  }): TipoCultivoWiki {
    if (!params.nombre?.trim()) {
      throw new Error('El tipo de cultivo requiere un nombre');
    }
    return new TipoCultivoWiki(params.id, params.nombre, params.descripcion ?? null);
  }
}
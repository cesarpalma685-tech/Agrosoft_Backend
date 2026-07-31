export class Epa {
  private constructor(
    public readonly id: number | undefined,
    public readonly nombre: string,
    public readonly tipoEpa: string,
    public readonly descripcion: string | null,
    public readonly sintomas: string | null,
    public readonly manejoYControl: string | null,
    public readonly mesesProbables: number[],
    public readonly temporadas: string[],
    public readonly notasEstacionalidad: string | null,
    public readonly fotosSintomas: string[],
    public readonly fotosGenerales: string[],
    public readonly tags: string[],
    public readonly creadoPorUsuarioId: number | null,
  ) {}

  static create(params: {
    id?: number;
    nombre: string;
    tipoEpa: string;
    descripcion?: string | null;
    sintomas?: string | null;
    manejoYControl?: string | null;
    mesesProbables?: number[];
    temporadas?: string[];
    notasEstacionalidad?: string | null;
    fotosSintomas?: string[];
    fotosGenerales?: string[];
    tags?: string[];
    creadoPorUsuarioId?: number | null;
  }): Epa {
    if (!params.nombre?.trim()) {
      throw new Error('La EPA requiere un nombre');
    }
    if (!params.tipoEpa?.trim()) {
      throw new Error('La EPA requiere tipoEpa');
    }
    return new Epa(
      params.id,
      params.nombre,
      params.tipoEpa,
      params.descripcion ?? null,
      params.sintomas ?? null,
      params.manejoYControl ?? null,
      params.mesesProbables ?? [],
      params.temporadas ?? [],
      params.notasEstacionalidad ?? null,
      params.fotosSintomas ?? [],
      params.fotosGenerales ?? [],
      params.tags ?? [],
      params.creadoPorUsuarioId ?? null,
    );
  }
}
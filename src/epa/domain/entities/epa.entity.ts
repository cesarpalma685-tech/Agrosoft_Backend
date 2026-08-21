export class Epa {
  id!: number;
  nombre!: string;
  tipoEpa!: string;
  descripcion?: string;
  sintomas?: string;
  manejoYControl?: string;
  mesesProbables?: number[];
  temporadas?: string[];
  notasEstacionalidad?: string;
  fotosSintomas?: string[];
  fotosGenerales?: string[];
  tags?: string[];
  creadoPorUsuarioId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
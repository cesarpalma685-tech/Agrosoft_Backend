export class Actividad {
  id!: number;
  nombre!: string;
  tipo!: string;
  subtipo?: string;
  loteId!: number;
  subLoteId?: number;
  cultivoId!: number;
  fecha!: Date;
  horasActividad?: number;
  precioHoraActividad?: number;
  costoManoObra?: number;
  descripcion?: string;
  estado?: string;
  creadoPorUsuarioId?: number;
  cantidadPlantas?: number;
  kgRecolectados?: number;
  productoAgroId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
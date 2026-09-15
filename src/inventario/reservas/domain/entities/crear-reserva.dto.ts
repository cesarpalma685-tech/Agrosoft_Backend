import { ReservaEstadoEnum } from "../enums/reserva-estado.enum";

export class Reserva {
  id!: number;
  insumoId!: number;
  cantidad!: number;
  fechaReserva!: Date;
  motivo!: string;
  estado!: ReservaEstadoEnum;
  usuarioId!: number;
  actividadId!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

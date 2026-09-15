import { TipoMovimientoInsumoEnum } from "../enum/tipo-movimiento-insumo.enum";

export class MovimientoInsumo {
  id!: number;
  insumoId!: number;
  tipo!: TipoMovimientoInsumoEnum;
  cantidadPresentacion!: number;
  cantidadUso!: number;
  costoUnitarioPresentacion!: number;
  costoUnitarioUso!: number;
  costoTotal!: number;
  valorInventarioResultante!: number;
  descripcion?: string;
  actividadId!: number;
  usuarioId!: number;
  almacenOrigenId!: number;
  almacenDestinoId!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

import { EstadoInsumoEnum } from "../enums/estado-insumo.enum";
import { TipoInsumoEnum } from "../enums/tipo-insumo.enum";


export class Insumo {
  id!: number;

  nombre!: string;
  descripcion!: string;
  fotoUrl?: string;

  presentacionTipo!: string;
  presentacionCantidad!: number;
  presentacionUnidad!: string;
  unidadUso!: string;

  tipoMateria!: string;
  factorConversionUso!: number;

  stockPresentacion!: number;
  stockUso!: number;
  stockReservado!: number;
  stockMinimo!: number;

  precioUnitarioPresentacion!: number;
  precioUnitarioUso!: number;
  costoUnitario!: number;
  costoAdquisicion!: number;

  valorInventario!: number;
  valorResidual!: number;

  vidaUtilHoras!: number;
  horasUsadas!: number;
  depreciacionAcumulada!: number;

  almacenId!: number;
  proveedorId!: number;
  categoriaId!: number;
  creadoPorUsuarioId!: number;

  tipoInsumo!: TipoInsumoEnum;
  estado!: EstadoInsumoEnum;

  fechaRegistro!: Date;
  fechaAdquisicion!: Date;
  fechaUltimoMantenimiento!: Date;
  fechaBaja!: Date;

  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}
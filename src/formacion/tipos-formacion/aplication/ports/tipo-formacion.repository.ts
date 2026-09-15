import { TipoFormacion } from "../../domain/entities/tipo-formacion.entity";

export const TIPO_FORMACION_REPOSITORY = "TIPO_FORMACION_REPOSITORY";

export interface TipoFormacionRepository {
  crear(tipo: TipoFormacion): Promise<TipoFormacion>;
  buscarPorId(id: number): Promise<TipoFormacion | null>;
  actualizar(tipo: TipoFormacion): Promise<TipoFormacion>;
  eliminar(id: number): Promise<void>;
}

import { TiposSensores } from "../../domain/entities/tipos_sensores.dto";

export abstract class TiposSensoresRepositoryPort {
  abstract crear(tipoSensor: TiposSensores): Promise<TiposSensores>;

  abstract buscarPorId(id: number): Promise<TiposSensores | null>;

  abstract listar(): Promise<TiposSensores[]>;

  abstract actualizar(
    id: number,
    tipoSensor: Partial<TiposSensores>,
  ): Promise<TiposSensores>;

  abstract eliminar(id: number): Promise<void>;
}

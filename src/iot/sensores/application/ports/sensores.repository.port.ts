import { Sensor } from '../../domain/entities/sensores.dto';

export abstract class SensorRepositoryPort {
  abstract crear(sensor: Sensor): Promise<Sensor>;

  abstract buscarPorId(id: number): Promise<Sensor | null>;

  abstract listar(): Promise<Sensor[]>;

  abstract actualizar(
    id: number,
    datos: Partial<Sensor>,
  ): Promise<Sensor>;

  abstract eliminar(id: number): Promise<void>;
}   
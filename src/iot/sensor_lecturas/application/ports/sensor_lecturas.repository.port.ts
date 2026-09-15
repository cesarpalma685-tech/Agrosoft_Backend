import { SensorLecturas } from "../../domain/entities/sensor_lecturas.dto";

export abstract class SensorLecturasRepositoryPort {
  abstract crear(sensorLectura: SensorLecturas): Promise<SensorLecturas>;

  abstract BuscarPorId(id: number): Promise<SensorLecturas | null>;

  abstract listar(): Promise<SensorLecturas[]>;

  abstract actualizar(
    id: number,
    datos: Partial<SensorLecturas>,
  ): Promise<SensorLecturas>;

  abstract eliminar(id: number): Promise<void>;
}

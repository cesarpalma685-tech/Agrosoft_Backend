import { SensorAlertas } from "../../domain/entities/sensor_alertas.dto";
export abstract class SensorAlertasRepositoryPort {
  abstract crear(sensorAlertas: SensorAlertas): Promise<SensorAlertas>;

  abstract listar(): Promise<SensorAlertas[]>;

  abstract buscarPorId(id: number): Promise<SensorAlertas | null>;

  abstract actualizar(
    id: number,
    datos: Partial<SensorAlertas>,
  ): Promise<SensorAlertas | null>;

  abstract eliminar(id: number): Promise<void>;
}

import{ Injectable }  from '@nestjs/common';
import { SensorLecturasRepositoryPort } from '../ports/sensor_lecturas.repository.port';
import { CrearSensorLecturasDto } from '../dto/crear-sensor_lecturas.dto';
import { SensorLecturas } from '../../domain/entities/sensor_lecturas.dto';

@Injectable()

export class CrearSensorLecturasUseCase {

 constructor(
    private readonly repository: SensorLecturasRepositoryPort,
){}
async execute(dto: CrearSensorLecturasDto) {
    const sensorLecturas: SensorLecturas = {
      id: 0,
      sensor_id: dto.sensor_id,
      valor: dto.valor,
      fecha_lectura: new Date(dto.fecha_lectura),
      unidad: dto.unidad,
      observaciones: dto.observaciones,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    return await this.repository.crear(sensorLecturas);
  }
}
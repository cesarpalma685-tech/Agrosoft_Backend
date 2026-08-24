import{ Injectable, NotFoundException }  from '@nestjs/common';
import { SensorLecturasRepositoryPort } from '../ports/sensor_lecturas.repository.port';


@Injectable()

export class ObtenerSensorLecturasPorIdUseCase {

constructor(
private readonly repository: SensorLecturasRepositoryPort,

){}

async execute(id: number) {
    const SensorLecturas = await this.repository.BuscarPorId(id);

    if(!SensorLecturas) {
        throw new NotFoundException(

            `la lectura con id ${id} no existe`,

        );
    }



    return SensorLecturas;

 
}

}
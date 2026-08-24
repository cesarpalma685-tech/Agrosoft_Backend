import{ Injectable, NotFoundException }  from '@nestjs/common';
import { SensorLecturasRepositoryPort } from '../ports/sensor_lecturas.repository.port';
import { SensorLecturas } from '../../domain/entities/sensor_lecturas.dto';



@Injectable()

export class ActualizarSensorLecturasUseCase {

constructor(
private readonly repository: SensorLecturasRepositoryPort,

){}

async execute(id: number, datos: Partial<SensorLecturas>,) {

    
    const SensorLecturas = await this.repository.BuscarPorId(id);


    if(!SensorLecturas) {
        throw new NotFoundException(

            `la lectura con id ${id} no existe`,

        );
    }



    return await this.repository.actualizar(id,datos);

 
}

}
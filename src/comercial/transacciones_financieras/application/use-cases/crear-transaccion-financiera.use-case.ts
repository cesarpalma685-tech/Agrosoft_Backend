import { Injectable } from '@nestjs/common';
import { CrearTransaccionFinancieraDto } from '../dto/crear-transaccion-financiera.dto';
import { TransaccionFinanciera } from '../../domain/entities/transaccion-financiera.entity';
import { TransaccionFinancieraRepositoryPort } from '../ports/crear-transaccion-financiera.repository.port';

@Injectable()
export class CrearTransaccionFinancieraUseCase {
  constructor(
    private readonly repository: TransaccionFinancieraRepositoryPort,
  ) {}

  async execute(dto: CrearTransaccionFinancieraDto): Promise<TransaccionFinanciera> {
    const nuevaTransaccion = new TransaccionFinanciera();
    Object.assign(nuevaTransaccion, dto);

    if (dto.fecha) {
      nuevaTransaccion.fecha = new Date(dto.fecha);
    }

    return await this.repository.save(nuevaTransaccion);
  }
}
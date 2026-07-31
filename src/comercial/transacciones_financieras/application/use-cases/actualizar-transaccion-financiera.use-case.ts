import { Injectable, NotFoundException } from '@nestjs/common';
import { TransaccionFinanciera } from '../../domain/entities/transaccion-financiera.entity';
import { CrearTransaccionFinancieraDto } from '../dto/crear-transaccion-financiera.dto';
import { TransaccionFinancieraRepositoryPort } from '../ports/crear-transaccion-financiera.repository.port';

@Injectable()
export class ActualizarTransaccionFinancieraUseCase {
  constructor(
    private readonly repository: TransaccionFinancieraRepositoryPort,
  ) {}

  async execute(id: number, dto: Partial<CrearTransaccionFinancieraDto>): Promise<TransaccionFinanciera> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(`La transacción financiera con ID ${id} no existe`);
    }

    const payload: Partial<TransaccionFinanciera> = { ...dto } as any;
    if (dto.fecha) {
      payload.fecha = new Date(dto.fecha);
    }

    return await this.repository.update(id, payload);
  }
}
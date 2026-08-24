import { Injectable, NotFoundException } from '@nestjs/common';
import { TransaccionFinanciera } from '../../domain/entities/transaccion-financiera.entity';
import { TransaccionFinancieraRepositoryPort } from '../ports/crear-transaccion-financiera.repository.port';

@Injectable()
export class ObtenerTransaccionFinancieraPorIdUseCase {
  constructor(
    private readonly repository: TransaccionFinancieraRepositoryPort,
  ) {}

  async execute(id: number): Promise<TransaccionFinanciera> {
    const transaccion = await this.repository.findById(id);
    if (!transaccion) {
      throw new NotFoundException(`La transacción financiera con ID ${id} no fue encontrada`);
    }
    return transaccion;
  }
}
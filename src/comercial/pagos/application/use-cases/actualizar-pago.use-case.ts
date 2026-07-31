import { Injectable, NotFoundException } from '@nestjs/common';
import { PagoRepositoryPort } from '../ports/pago.repository.port';
import { Pago } from '../../domain/entities/pago.entity';
import { CrearPagoDto } from '../dto/crear-pago.dto';

@Injectable()
export class ActualizarPagoUseCase {
  constructor(
    private readonly repository: PagoRepositoryPort,
  ) {}

  async execute(id: number, dto: Partial<CrearPagoDto>): Promise<Pago> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El pago con ID ${id} no existe`);
    }

    return await this.repository.update(id, dto as Partial<Pago>);
  }
}
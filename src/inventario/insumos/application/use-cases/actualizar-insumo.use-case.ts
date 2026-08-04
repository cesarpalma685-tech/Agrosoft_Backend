import { Injectable, NotFoundException } from '@nestjs/common';
import { InsumoRepositoryPort } from '../ports/insumo.repository.port';
import { CrearInsumoDto } from '../dto/crear-insumo.dto';
import { Insumo } from '../../domain/entities/crear-insumo.dto';

@Injectable()
export class ActualizarInsumoUseCase {
  constructor(
    private readonly insumoRepository: InsumoRepositoryPort,
  ) {}

  async execute(id: number, dto: Partial<CrearInsumoDto>): Promise<Insumo> {
    // 1. Verificamos que el registro exista antes de actualizar
    const existe = await this.insumoRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El insumo con ID ${id} no existe para actualizar`);
    }

    // 2. Ejecutamos la actualización parcial
    return await this.insumoRepository.update(id, dto);
  }
}
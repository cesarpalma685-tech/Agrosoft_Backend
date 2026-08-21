import { Injectable } from '@nestjs/common';
import { CultivoHistorialRepositoryPort } from '../ports/cultivo-historial.repository.port';
import { CrearCultivoHistorialDto } from '../dto/crear-cultivo-historial.dto';
import { CultivoHistorial } from '../../domain/entities/cultivo-historial.entity';

@Injectable()
export class CrearCultivoHistorialUseCase {
  constructor(private readonly cultivoHistorialRepository: CultivoHistorialRepositoryPort) {}

  async execute(dto: CrearCultivoHistorialDto): Promise<CultivoHistorial> {
    const nuevo = new CultivoHistorial();
    Object.assign(nuevo, dto);
    return await this.cultivoHistorialRepository.save(nuevo);
  }
}
import { Injectable } from '@nestjs/common';
import { ActividadInsumoUsoRepositoryPort } from '../ports/actividad-insumo-uso.repository.port';
import { ActividadInsumoUso } from '../../domain/entities/actividad-insumo-uso.entity';
import { RegistrarActividadInsumoUsoDto } from '../dto/actividad_insumo_uso.dto';

@Injectable()
export class RegistrarInsumoUsoUseCase {
  constructor(
    private readonly actividadInsumoUsoRepository: ActividadInsumoUsoRepositoryPort,
  ) {}

  async execute(dto: RegistrarActividadInsumoUsoDto): Promise<ActividadInsumoUso> {
    const nuevoUso = new ActividadInsumoUso();
    Object.assign(nuevoUso, dto);
    return await this.actividadInsumoUsoRepository.save(nuevoUso);
  }
}

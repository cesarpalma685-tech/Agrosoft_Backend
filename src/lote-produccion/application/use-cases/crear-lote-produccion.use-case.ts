import { Injectable } from '@nestjs/common';
import { LoteProduccionRepositoryPort } from '../ports/lote-produccion.repository.port';
import { CrearLoteProduccionDto } from '../dto/crear-lote-produccion.dto';
import { LoteProduccion } from '../../domain/entities/lote-produccion.entity';

@Injectable()
export class CrearLoteProduccionUseCase {
  constructor(private readonly loteProduccionRepository: LoteProduccionRepositoryPort) {}

  async execute(dto: CrearLoteProduccionDto): Promise<LoteProduccion> {
    const nuevo = new LoteProduccion();
    Object.assign(nuevo, dto);
    nuevo.stockDisponibleKg = dto.stockDisponibleKg ?? dto.cantidadKg;
    return await this.loteProduccionRepository.save(nuevo);
  }
}
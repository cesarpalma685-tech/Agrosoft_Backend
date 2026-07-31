import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoInsumoRepositoryPort } from '../../application/ports/crear-movimiento-insumo.repository.port';
import { MovimientoInsumo } from '../../domain/entities/movimiento-insumo.entity';
import { MovimientoInsumoOrmEntity } from '../persistence/movimiento-insumo.orm-entity';

@Injectable()
export class MovimientoInsumoTypeOrmRepository extends MovimientoInsumoRepositoryPort {
  constructor(
    @InjectRepository(MovimientoInsumoOrmEntity)
    private readonly repository: Repository<MovimientoInsumoOrmEntity>,
  ) {
    super();
  }

  async save(movimiento: MovimientoInsumo): Promise<MovimientoInsumo> {
    const entity = this.repository.create(movimiento as Partial<MovimientoInsumoOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved as unknown as MovimientoInsumo;
  }

  async findById(id: number): Promise<MovimientoInsumo | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? (entity as unknown as MovimientoInsumo) : null;
  }

  async findAll(): Promise<MovimientoInsumo[]> {
    const entities = await this.repository.find();
    return entities as unknown as MovimientoInsumo[];
  }

  async findByInsumoId(insumoId: number): Promise<MovimientoInsumo[]> {
    const entities = await this.repository.find({
      where: { insumoId },
    });
    return entities as unknown as MovimientoInsumo[];
  }

  async update(
    id: number,
    movimiento: Partial<MovimientoInsumo>,
  ): Promise<MovimientoInsumo> {
    await this.repository.update(id, movimiento as Partial<MovimientoInsumoOrmEntity>);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(`Movimiento de insumo con ID ${id} no encontrado`);
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
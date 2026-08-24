import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionFinanciera } from '../../domain/entities/transaccion-financiera.entity';
import { TransaccionFinancieraOrmEntity } from '../persistence/transaccion-financiera.orm-entity';
import { TransaccionFinancieraRepositoryPort } from '../../application/ports/crear-transaccion-financiera.repository.port';

@Injectable()
export class TransaccionFinancieraTypeOrmRepository extends TransaccionFinancieraRepositoryPort {
  constructor(
    @InjectRepository(TransaccionFinancieraOrmEntity)
    private readonly repository: Repository<TransaccionFinancieraOrmEntity>,
  ) {
    super();
  }

  async save(transaccion: TransaccionFinanciera): Promise<TransaccionFinanciera> {
    const entity = this.repository.create(transaccion as Partial<TransaccionFinancieraOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved as unknown as TransaccionFinanciera;
  }

  async findById(id: number): Promise<TransaccionFinanciera | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? (entity as unknown as TransaccionFinanciera) : null;
  }

  async findAll(): Promise<TransaccionFinanciera[]> {
    const entities = await this.repository.find();
    return entities as unknown as TransaccionFinanciera[];
  }

  async findByVentaId(ventaId: number): Promise<TransaccionFinanciera[]> {
    const entities = await this.repository.find({ where: { ventaId } });
    return entities as unknown as TransaccionFinanciera[];
  }

  async update(id: number, transaccion: Partial<TransaccionFinanciera>): Promise<TransaccionFinanciera> {
    await this.repository.update(id, transaccion as Partial<TransaccionFinancieraOrmEntity>);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(`Transacción financiera con ID ${id} no encontrada`);
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
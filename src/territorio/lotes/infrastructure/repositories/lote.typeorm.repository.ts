import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoteRepositoryPort } from '../../application/ports/lote.repository.port';
import { LoteDto } from '../../domain/entities/lote.dto';
import { LoteOrmEntity } from '../persistence/lote.orm-entity';

@Injectable()
export class LoteTypeormRepository implements LoteRepositoryPort {
  constructor(
    @InjectRepository(LoteOrmEntity)
    private readonly repository: Repository<LoteOrmEntity>,
  ) {}

  async save(lote: LoteDto): Promise<LoteDto> {
    const entity = this.repository.create(lote);
    const saved = await this.repository.save(entity);

    return saved;
  }

  async findById(id: number): Promise<LoteDto | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<LoteDto[]> {
    return await this.repository.find();
  }

  async update(
    id: number, 
    lote: Partial<LoteDto>)
    : Promise<LoteDto | null > {
    await this.repository.update(id, lote);

    return await this.findById(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
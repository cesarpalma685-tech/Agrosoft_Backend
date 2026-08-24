import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubloteRepositoryPort } from '../../application/ports/sublote.repository.port';
import { Sublote } from '../../domain/entities/sublote.dto';
import { SubloteOrmEntity } from '../persistence/sublote.orm-entity';

@Injectable()
export class SubloteTypeormRepository implements SubloteRepositoryPort {
  constructor(
    @InjectRepository(SubloteOrmEntity)
    private readonly repository: Repository<SubloteOrmEntity>,
  ) {}

  async save(sublote: Sublote): Promise<Sublote> {
    const entity = this.repository.create(sublote);
    return await this.repository.save(entity);
  }

  async findById(id: number): Promise<Sublote | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Sublote[]> {
    return await this.repository.find();
  }

  async update(
    id: number,
    sublote: Partial<Sublote >,
  ): Promise<Sublote | null> {
    await this.repository.update(id, sublote);

    return await this.findById(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
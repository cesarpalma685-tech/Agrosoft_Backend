import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UnidadProductivaRepositoryPort } from "../../application/ports/unidad-productiva.repository.port";
import { UnidadProductivaDto } from "../../domain/entities/unidad-productiva.dto";
import { UnidadProductivaOrmEntity } from "../persistence/unidad-productiva.orm-entity";

@Injectable()
export class UnidadProductivaTypeormRepository implements UnidadProductivaRepositoryPort {
  constructor(
    @InjectRepository(UnidadProductivaOrmEntity)
    private readonly repository: Repository<UnidadProductivaOrmEntity>,
  ) {}

  async save(unidad: Partial<UnidadProductivaDto>): Promise<UnidadProductivaDto> {
    return await this.repository.save(this.repository.create(unidad));
  }

  async findById(id: number): Promise<UnidadProductivaDto | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<UnidadProductivaDto[]> {
    return await this.repository.find({ order: { id: "ASC" } });
  }

  async update(id: number, unidad: Partial<UnidadProductivaDto>): Promise<UnidadProductivaDto | null> {
    await this.repository.update(id, unidad);
    return await this.findById(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}

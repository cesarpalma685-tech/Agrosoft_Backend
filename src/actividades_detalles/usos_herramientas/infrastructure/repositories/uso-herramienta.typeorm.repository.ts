import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { UsoHerramientaRepositoryPort } from "../../application/ports/uso-herramienta.repository.port";
import { UsoHerramienta } from "../../domain/entities/uso-herramienta.entity";
import { UsoHerramientaOrmEntity } from "../persistence/uso-herramienta.orm-entity";

@Injectable()
export class UsoHerramientaTypeOrmRepository extends UsoHerramientaRepositoryPort {
  constructor(
    @InjectRepository(UsoHerramientaOrmEntity)
    private readonly usoHerramientaRepository: Repository<UsoHerramientaOrmEntity>,
  ) {
    super();
  }

  async save(uso: UsoHerramienta): Promise<UsoHerramienta> {
    const entity = this.usoHerramientaRepository.create({ ...uso });
    return await this.usoHerramientaRepository.save(entity);
  }

  async findByActividadIds(ids: number[]): Promise<UsoHerramienta[]> {
    if (ids.length === 0) return [];
    return await this.usoHerramientaRepository.find({ where: { actividadId: In(ids) }, order: { id: "ASC" } });
  }

  async findAll(): Promise<UsoHerramienta[]> {
    return await this.usoHerramientaRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}

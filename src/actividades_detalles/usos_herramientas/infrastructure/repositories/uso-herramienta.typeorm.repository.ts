import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

  async findAll(): Promise<UsoHerramienta[]> {
    return await this.usoHerramientaRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}

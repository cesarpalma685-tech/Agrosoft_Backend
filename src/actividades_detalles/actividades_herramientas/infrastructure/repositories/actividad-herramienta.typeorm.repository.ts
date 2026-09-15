import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ActividadHerramientaRepositoryPort } from "../../application/ports/actividad-herramienta.repository.port";
import { ActividadHerramienta } from "../../domain/entities/actividad-herramienta.entity";
import { ActividadHerramientaOrmEntity } from "../persistence/actividad-herramienta.orm-entity";

@Injectable()
export class ActividadHerramientaTypeOrmRepository extends ActividadHerramientaRepositoryPort {
  constructor(
    @InjectRepository(ActividadHerramientaOrmEntity)
    private readonly actividadHerramientaRepository: Repository<ActividadHerramientaOrmEntity>,
  ) {
    super();
  }

  async save(herramienta: ActividadHerramienta): Promise<ActividadHerramienta> {
    const entity = this.actividadHerramientaRepository.create({
      ...herramienta,
    });

    const saved = await this.actividadHerramientaRepository.save(entity);

    return saved;
  }

  async findAll(): Promise<ActividadHerramienta[]> {
    const entities = await this.actividadHerramientaRepository.find({
      order: {
        createdAt: "DESC",
      },
    });

    return entities;
  }
}

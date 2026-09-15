import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ActividadInsumoUsoRepositoryPort } from "../../application/ports/actividad-insumo-uso.repository.port";
import { ActividadInsumoUso } from "../../domain/entities/actividad-insumo-uso.entity";
import { ActividadInsumoUsoOrmEntity } from "../persistence/actividad-insumo-uso.orm-entity";

@Injectable()
export class ActividadInsumoUsoTypeOrmRepository extends ActividadInsumoUsoRepositoryPort {
  constructor(
    @InjectRepository(ActividadInsumoUsoOrmEntity)
    private readonly actividadInsumoUsoRepository: Repository<ActividadInsumoUsoOrmEntity>,
  ) {
    super();
  }

  async save(uso: ActividadInsumoUso): Promise<ActividadInsumoUso> {
    const entity = this.actividadInsumoUsoRepository.create({ ...uso });
    return await this.actividadInsumoUsoRepository.save(entity);
  }

  async findAll(): Promise<ActividadInsumoUso[]> {
    return await this.actividadInsumoUsoRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}

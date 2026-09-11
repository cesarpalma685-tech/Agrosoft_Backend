import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ActividadInsumoRepositoryPort } from "../../application/ports/actividad-insumo.repository.port";
import { ActividadInsumo } from "../../domain/entities/actividad-insumo.entity";
import { ActividadInsumoOrmEntity } from "../persistence/actividad-insumo.orm-entity";

@Injectable()
export class ActividadInsumoTypeOrmRepository extends ActividadInsumoRepositoryPort {
  constructor(
    @InjectRepository(ActividadInsumoOrmEntity)
    private readonly actividadInsumoRepository: Repository<ActividadInsumoOrmEntity>,
  ) {
    super();
  }

  async save(insumo: ActividadInsumo): Promise<ActividadInsumo> {
    const entity = this.actividadInsumoRepository.create({ ...insumo });
    return await this.actividadInsumoRepository.save(entity);
  }

  async findAll(): Promise<ActividadInsumo[]> {
    return await this.actividadInsumoRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}

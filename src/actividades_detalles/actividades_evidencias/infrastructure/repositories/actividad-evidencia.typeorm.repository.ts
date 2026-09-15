import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ActividadEvidenciaRepositoryPort } from "../../application/ports/actividad-evidencia.repository.port";
import { ActividadEvidencia } from "../../domain/entities/actividad_evidencia.entity";
import { ActividadEvidenciaOrmEntity } from "../persistence/actividad-evidencia.orm-entity";

@Injectable()
export class ActividadEvidenciaTypeOrmRepository extends ActividadEvidenciaRepositoryPort {
  constructor(
    @InjectRepository(ActividadEvidenciaOrmEntity)
    private readonly actividadEvidenciaRepository: Repository<ActividadEvidenciaOrmEntity>,
  ) {
    super();
  }

  async save(evidencia: ActividadEvidencia): Promise<ActividadEvidencia> {
    const entity = this.actividadEvidenciaRepository.create({
      ...evidencia,
    });

    const saved = await this.actividadEvidenciaRepository.save(entity);

    return saved;
  }

  async findAll(): Promise<ActividadEvidencia[]> {
    const entities = await this.actividadEvidenciaRepository.find({
      order: {
        createdAt: "DESC",
      },
    });

    return entities;
  }
}

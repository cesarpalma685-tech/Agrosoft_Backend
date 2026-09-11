import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TiposSensoresRepositoryPort } from "../../application/ports/tipos_sensores.repository.port";
import { TiposSensores } from "../../domain/entities/tipos_sensores.dto";
import { TiposSensoresOrmEntity } from "../persistence/tipos_sensores.orm-entity";

@Injectable()
export class TiposSensoresTypeormRepository implements TiposSensoresRepositoryPort {
  constructor(
    @InjectRepository(TiposSensoresOrmEntity)
    private readonly repository: Repository<TiposSensoresOrmEntity>,
  ) {}

  async crear(tipoSensor: TiposSensores): Promise<TiposSensores> {
    const entity = this.repository.create(tipoSensor);

    return await this.repository.save(entity);
  }

  async buscarPorId(id: number): Promise<TiposSensores | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async listar(): Promise<TiposSensores[]> {
    return await this.repository.find();
  }

  async actualizar(
    id: number,
    datos: Partial<TiposSensores>,
  ): Promise<TiposSensores> {
    await this.repository.update(id, datos);

    const actualizado = await this.buscarPorId(id);
    if (!actualizado) {
      throw new Error(`El tipo de sensor con ID no existe`);
    }

    return actualizado;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}

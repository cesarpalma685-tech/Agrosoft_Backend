import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HistorialPrecioLoteRepositoryPort } from "../../application/ports/historial-precio-lote.repository.port";
import { HistorialPrecioLote } from "../../domain/entities/historial-precio-lote.entity";
import { HistorialPrecioLoteOrmEntity } from "../persistence/historial-precio-lote.orm-entity";

@Injectable()
export class HistorialPrecioLoteTypeOrmRepository extends HistorialPrecioLoteRepositoryPort {
  constructor(
    @InjectRepository(HistorialPrecioLoteOrmEntity)
    private readonly repository: Repository<HistorialPrecioLoteOrmEntity>,
  ) {
    super();
  }

  async save(historial: HistorialPrecioLote): Promise<HistorialPrecioLote> {
    const entity = this.repository.create(
      historial as Partial<HistorialPrecioLoteOrmEntity>,
    );
    const saved = await this.repository.save(entity);
    return saved;
  }

  async findById(id: number): Promise<HistorialPrecioLote | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findAll(): Promise<HistorialPrecioLote[]> {
    const entities = await this.repository.find();
    return entities;
  }

  async findByLoteProduccionId(
    loteProduccionId: number,
  ): Promise<HistorialPrecioLote[]> {
    const entities = await this.repository.find({
      where: { loteProduccionId },
    });
    return entities;
  }

  async update(
    id: number,
    historial: Partial<HistorialPrecioLote>,
  ): Promise<HistorialPrecioLote> {
    await this.repository.update(id, historial);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(
        `Historial de precio con ID ${id} no encontrado`,
      );
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}

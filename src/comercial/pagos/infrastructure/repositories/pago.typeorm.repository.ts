import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PagoRepositoryPort } from "../../application/ports/pago.repository.port";
import { Pago } from "../../domain/entities/pago.entity";
import { PagoOrmEntity } from "../persistence/pago.orm-entity";

@Injectable()
export class PagoTypeOrmRepository extends PagoRepositoryPort {
  constructor(
    @InjectRepository(PagoOrmEntity)
    private readonly repository: Repository<PagoOrmEntity>,
  ) {
    super();
  }

  async save(pago: Pago): Promise<Pago> {
    const entity = this.repository.create(pago as Partial<PagoOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved;
  }

  async findById(id: number): Promise<Pago | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findAll(): Promise<Pago[]> {
    const entities = await this.repository.find();
    return entities;
  }

  async findByVentaId(ventaId: number): Promise<Pago[]> {
    const entities = await this.repository.find({ where: { ventaId } });
    return entities;
  }

  async update(id: number, pago: Partial<Pago>): Promise<Pago> {
    await this.repository.update(id, pago);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}

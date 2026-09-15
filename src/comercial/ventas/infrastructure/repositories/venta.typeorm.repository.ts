import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VentaOrmEntity } from "../persistence/venta.orm-entity";
import { VentaRepositoryPort } from "../../application/ports/venta.repository.ports";
import { Venta } from "../../domain/entities/crear-venta.entity";

@Injectable()
export class VentaTypeOrmRepository extends VentaRepositoryPort {
  constructor(
    @InjectRepository(VentaOrmEntity)
    private readonly repository: Repository<VentaOrmEntity>,
  ) {
    super();
  }

  async save(venta: Venta): Promise<Venta> {
    const entity = this.repository.create(venta as Partial<VentaOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved;
  }

  async findById(id: number): Promise<Venta | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findAll(): Promise<Venta[]> {
    const entities = await this.repository.find();
    return entities;
  }

  async update(id: number, venta: Partial<Venta>): Promise<Venta> {
    await this.repository.update(id, venta);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}

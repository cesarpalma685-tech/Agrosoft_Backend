import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VentaDetalleRepositoryPort } from "../../application/ports/venta-detalle.repository.port";
import { VentaDetalle } from "../../domain/entities/venta-detalle.entity";
import { VentaDetalleOrmEntity } from "../persistence/venta-detalle.orm-entity";

@Injectable()
export class VentaDetalleTypeOrmRepository extends VentaDetalleRepositoryPort {
  constructor(
    @InjectRepository(VentaDetalleOrmEntity)
    private readonly repository: Repository<VentaDetalleOrmEntity>,
  ) {
    super();
  }

  async save(ventaDetalle: VentaDetalle): Promise<VentaDetalle> {
    const entity = this.repository.create(
      ventaDetalle as Partial<VentaDetalleOrmEntity>,
    );
    const saved = await this.repository.save(entity);
    return saved;
  }

  async findById(id: number): Promise<VentaDetalle | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity : null;
  }

  async findAll(): Promise<VentaDetalle[]> {
    const entities = await this.repository.find();
    return entities;
  }

  async findByVentaId(ventaId: number): Promise<VentaDetalle[]> {
    const entities = await this.repository.find({ where: { ventaId } });
    return entities;
  }

  async update(
    id: number,
    ventaDetalle: Partial<VentaDetalle>,
  ): Promise<VentaDetalle> {
    await this.repository.update(id, ventaDetalle);
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException(
        `Detalle de venta con ID ${id} no encontrado`,
      );
    }
    return updated;
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}

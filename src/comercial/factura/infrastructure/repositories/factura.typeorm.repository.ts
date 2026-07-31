import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaRepositoryPort } from '../../application/ports/factura.repository.port';
import { Factura } from '../../domain/entities/factura.entity';
import { FacturaOrmEntity } from '../persistence/factura.orm-entity';

@Injectable()
export class FacturaTypeOrmRepository extends FacturaRepositoryPort {
    constructor(
    @InjectRepository(FacturaOrmEntity)
    private readonly repository: Repository<FacturaOrmEntity>,
    ) {
    super();
    }

    async save(factura: Factura): Promise<Factura> {
    const entity = this.repository.create(factura as Partial<FacturaOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved as unknown as Factura;
    }

    async findById(id: number): Promise<Factura | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? (entity as unknown as Factura) : null;
    }

    async findAll(): Promise<Factura[]> {
    const entities = await this.repository.find();
    return entities as unknown as Factura[];
    }

    async findByVentaId(ventaId: number): Promise<Factura[]> {
    const entities = await this.repository.find({ where: { ventaId } });
    return entities as unknown as Factura[];
    }

    async update(id: number, factura: Partial<Factura>): Promise<Factura> {
    await this.repository.update(id, factura as Partial<FacturaOrmEntity>);
    const updated = await this.findById(id);
    if (!updated) {
        throw new NotFoundException(`Factura con ID ${id} no encontrada`);
    }
    return updated;
    }

    async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
    }
}